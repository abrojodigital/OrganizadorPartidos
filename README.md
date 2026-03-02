# OrganizadorPartidos — Mobile-first multi-deporte

Aplicación **mobile-first** para iOS/Android orientada a crear eventos deportivos, encontrar jugadores y completar equipos, inspirada en “Nos Falta Uno”, pero diseñada desde el inicio para múltiples deportes (no solo fútbol).

## Ejecutar API + Base de datos en Docker (recomendado)

Este proyecto ahora soporta levantar **API y PostgreSQL juntos con Docker Compose**.

### 1) Requisitos

- Docker Desktop instalado y en ejecución.
- Git instalado.

### 2) Clonar proyecto

```bash
git clone <URL_DE_TU_REPO>
cd OrganizadorPartidos
```

### 3) Levantar API + DB

```bash
docker compose -f infra/docker-compose.yml up --build -d
```

Servicios levantados:

- API: `http://localhost:3000`
- Healthcheck API: `http://localhost:3000/health`
- PostgreSQL: `localhost:5432`

### 4) Probar que funciona

```bash
curl http://localhost:3000/health
curl http://localhost:3000/sports
```

Si todo está bien, `/health` responde `{"status":"ok","database":"up"}` y `/sports` devuelve el catálogo seed de deportes.

### 5) Ver logs

```bash
docker compose -f infra/docker-compose.yml logs -f api
docker compose -f infra/docker-compose.yml logs -f db
```

### 6) Apagar servicios

```bash
docker compose -f infra/docker-compose.yml down
```

Si también quieres borrar datos de DB:

```bash
docker compose -f infra/docker-compose.yml down -v
```

---

## Ejecutar solo mobile en local (Expo)

Con la API dockerizada corriendo, inicia mobile en tu máquina:

```bash
cd apps/mobile
cp .env.example .env
npm install
npm run start
```

> En celular físico, usa la IP local de tu PC en `EXPO_PUBLIC_API_BASE_URL` en lugar de `localhost`.

---

## Variables de entorno

### Backend (`apps/backend/.env.example`)

Incluye secretos JWT, URL de base de datos y placeholders para Maps/FCM/Storage.

### Mobile (`apps/mobile/.env.example`)

Incluye:

- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`

---

## Scripts útiles

- `./scripts/dev-up.sh`: flujo local completo (DB + deps + prisma + backend + mobile).
- `./scripts/dev-down.sh`: apaga la DB local.

---

## Qué incluye hoy el scaffold

- Base mobile-first con estructura `apps/mobile` + `apps/backend`.
- Modelo multideporte (`Sport`, `UserSport`, `Event`, `EventPlayer`, `Review`).
- Seed con deportes iniciales (fútbol 5/7, básquet, vóley, hockey, handball, rugby reducido, pádel, tenis dobles).
- Reglas de negocio base de eventos/reviews/chat.
- Swagger inicial en `docs/api/swagger.yaml`.

---

## Estructura del proyecto

```txt
apps/
  mobile/            # Expo app (iOS/Android)
  backend/           # API Node + Prisma
packages/
  shared-types/      # Tipos y contratos compartidos
infra/
  docker-compose.yml # API + PostgreSQL local
docs/
  architecture.md
  er-diagram.md
  api/swagger.yaml
scripts/
  dev-up.sh
  dev-down.sh
```
