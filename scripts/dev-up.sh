#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/apps/backend"
MOBILE_DIR="$ROOT_DIR/apps/mobile"

log() {
  printf "\n[%s] %s\n" "dev-up" "$1"
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: required command '$1' is not installed." >&2
    exit 1
  fi
}

require_cmd docker
require_cmd npm

if ! docker info >/dev/null 2>&1; then
  echo "Error: Docker is not running. Start Docker Desktop and try again." >&2
  exit 1
fi

log "Levantando PostgreSQL con Docker..."
docker compose -f "$ROOT_DIR/infra/docker-compose.yml" up -d db

if [[ ! -f "$BACKEND_DIR/.env" ]]; then
  log "Creando apps/backend/.env desde .env.example"
  cp "$BACKEND_DIR/.env.example" "$BACKEND_DIR/.env"
fi

if [[ ! -f "$MOBILE_DIR/.env" ]]; then
  log "Creando apps/mobile/.env desde .env.example"
  cp "$MOBILE_DIR/.env.example" "$MOBILE_DIR/.env"
fi

log "Instalando dependencias de backend..."
(cd "$BACKEND_DIR" && npm install)

log "Preparando Prisma (generate, push, seed)..."
(cd "$BACKEND_DIR" && npm run prisma:generate && npm run prisma:push && npm run prisma:seed)

log "Instalando dependencias mobile..."
(cd "$MOBILE_DIR" && npm install)

log "Iniciando backend y mobile (Ctrl+C para detener)..."
(
  cd "$BACKEND_DIR"
  npm run start:dev
) &
BACKEND_PID=$!

(
  cd "$MOBILE_DIR"
  npm run start
) &
MOBILE_PID=$!

cleanup() {
  log "Deteniendo procesos..."
  kill "$BACKEND_PID" "$MOBILE_PID" 2>/dev/null || true
}

trap cleanup INT TERM EXIT

wait "$BACKEND_PID" "$MOBILE_PID"
