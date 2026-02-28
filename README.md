# OrganizadorPartidos — Mobile-first multi-deporte

Aplicación **mobile-first** para iOS/Android orientada a crear eventos deportivos, encontrar jugadores y completar equipos, inspirada en “Nos Falta Uno”, pero diseñada desde el inicio para múltiples deportes (no solo fútbol).

## 1) Qué necesitas para implementarlo en tu computadora

Instala estas herramientas antes de arrancar:

- **Node.js 20+** y npm 10+
- **Docker Desktop** (para PostgreSQL local)
- **Git**
- **Expo Go** en tu teléfono (opcional, recomendado para pruebas rápidas)
- Android Studio (emulador Android) o Xcode (simulador iOS, solo macOS)

Verifica versiones:

```bash
node -v
npm -v
docker -v
```

---

## 2) Clonar y preparar el repositorio

```bash
git clone <URL_DE_TU_REPO>
cd OrganizadorPartidos
```

> Si ya lo tienes clonado, solo ejecuta `git pull`.

---

## 3) Levantar PostgreSQL local

```bash
docker compose -f infra/docker-compose.yml up -d
```

Esto levanta una base local con:

- host: `localhost`
- puerto: `5432`
- db: `organizador`
- user: `organizador`
- password: `organizador`

Para verificar que está arriba:

```bash
docker ps
```

---

## 4) Configurar variables de entorno

### Backend

```bash
cd apps/backend
cp .env.example .env
cd ../..
```

Archivo base: `apps/backend/.env.example`.

### Mobile

```bash
cd apps/mobile
cp .env.example .env
cd ../..
```

Archivo base: `apps/mobile/.env.example`.

---

## 5) Inicializar backend

```bash
cd apps/backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

Si todo va bien, la API quedará corriendo en `http://localhost:3000`.

---

## 6) Inicializar app mobile (Expo)

En **otra terminal**:

```bash
cd apps/mobile
npm install
npm run start
```

Se abrirá Expo Dev Tools. Puedes ejecutar en:

- Android emulator
- iOS simulator (macOS)
- Expo Go (escaneando QR)

---

## 7) Flujo recomendado para desarrollo diario

1. Levantar DB (`docker compose ... up -d`).
2. Levantar backend (`npm run start:dev` en `apps/backend`).
3. Levantar mobile (`npm run start` en `apps/mobile`).
4. Cuando cambies modelo Prisma, ejecutar:

```bash
npm run prisma:migrate
npm run prisma:generate
```

---

## 8) Qué incluye hoy el scaffold

- Base mobile-first con estructura `apps/mobile` + `apps/backend`.
- Modelo multideporte (`Sport`, `UserSport`, `Event`, `EventPlayer`, `Review`).
- Seed con deportes iniciales (fútbol 5/7, básquet, vóley, hockey, handball, rugby reducido, pádel, tenis dobles).
- Reglas de negocio base de eventos/reviews/chat.
- Swagger inicial en `docs/api/swagger.yaml`.

---

## 9) Problemas comunes

### Puerto 5432 ocupado

Cambia el puerto en `infra/docker-compose.yml` y actualiza `DATABASE_URL`.

### Prisma no conecta a DB

- Revisa que Docker esté activo.
- Ejecuta `docker ps` y confirma contenedor `organizador-postgres`.
- Verifica `DATABASE_URL` en `apps/backend/.env`.

### Expo no conecta con backend

- Verifica `EXPO_PUBLIC_API_BASE_URL` en `apps/mobile/.env`.
- Si pruebas desde celular físico, usa la IP local de tu PC en vez de `localhost`.

---

## 10) Decisiones técnicas asumidas

- **Frontend mobile**: React Native + Expo + TypeScript.
- **State management**: Zustand para estado local y TanStack Query para estado remoto.
- **Backend**: NestJS + PostgreSQL + Prisma ORM.
- **Autenticación**: JWT access + refresh tokens rotativos.
- **Tiempo real**: WebSockets (Socket.IO con gateway Nest).
- **Geolocalización**: Google Maps (SDK mobile + API backend para geodistancia).
- **Push notifications**: Firebase Cloud Messaging.
- **Storage**: Cloudinary/S3 (adaptador desacoplado por interfaz).
- **Arquitectura**: Clean Architecture pragmática (domain/application/infrastructure).

## 11) Estructura del proyecto

```txt
apps/
  mobile/            # Expo app (iOS/Android)
  backend/           # NestJS API REST + WS
packages/
  shared-types/      # Tipos y contratos compartidos
infra/
  docker-compose.yml # PostgreSQL local
docs/
  architecture.md
  er-diagram.md
  api/swagger.yaml
```

## 12) Deploy (resumen)

- Backend: Railway / Render / AWS ECS.
- DB: PostgreSQL administrado.
- Mobile: EAS Build + stores.
- Variables sensibles: secrets manager.

## 13) Próximos pasos

- Offline-first avanzado con cola de mutaciones.
- Pagos (MercadoPago/Stripe).
- Rankings por deporte/ciudad.
- Ligas y torneos.
