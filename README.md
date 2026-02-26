# OrganizadorPartidos — Mobile-first multi-deporte

Aplicación **mobile-first** para iOS/Android orientada a crear eventos deportivos, encontrar jugadores y completar equipos, inspirada en “Nos Falta Uno”, pero diseñada desde el inicio para múltiples deportes (no solo fútbol).

## Decisiones técnicas asumidas

- **Frontend mobile**: React Native + Expo + TypeScript.
- **State management**: Zustand para estado local y TanStack Query para estado remoto.
- **Backend**: NestJS + PostgreSQL + Prisma ORM.
- **Autenticación**: JWT access + refresh tokens rotativos.
- **Tiempo real**: WebSockets (Socket.IO con gateway Nest).
- **Geolocalización**: Google Maps (SDK mobile + API backend para geodistancia).
- **Push notifications**: Firebase Cloud Messaging.
- **Storage**: Cloudinary/S3 (adaptador desacoplado por interfaz).
- **Arquitectura**: Clean Architecture pragmática (domain/application/infrastructure).

## Estructura del proyecto

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

## MVP incluido

- Autenticación (registro/login/refresh/perfil).
- Gestión multi-deporte (`Sport`, `UserSport`) con seeds iniciales.
- Creación de eventos deportivos (`Event`) validando límites de jugadores por deporte.
- Postulación (`EventPlayer`) con reglas de negocio base.
- Chat por evento (gateway + contrato de autorización por participación).
- Reputación (`Review`) y cálculo de promedio.

## Reglas de negocio implementadas (base)

1. Un usuario no puede postularse dos veces al mismo evento.
2. Solo el creador puede aceptar/rechazar postulaciones.
3. El evento pasa a `COMPLETE` al llenarse.
4. Solo participantes confirmados pueden dejar calificación.
5. Un evento cancelado dispara notificación push a participantes.
6. `totalSlots` debe respetar `minPlayers`/`maxPlayers` del deporte.

## Configuración rápida

1. Levantar PostgreSQL local:

```bash
docker compose -f infra/docker-compose.yml up -d
```

2. Backend:

```bash
cd apps/backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

3. Mobile:

```bash
cd apps/mobile
npm install
npm run start
```

## Deploy

- Backend: Railway/Render/AWS ECS.
- DB: PostgreSQL administrado.
- Mobile: EAS Build + stores.
- Variables sensibles: secrets manager.

## Tests

- Backend: unit tests de servicios de reglas de negocio.
- Mobile: test básico de render de Home.

## Próximos pasos

- Offline-first avanzado con cola de mutaciones.
- Pagos (MercadoPago/Stripe).
- Rankings por deporte/ciudad.
- Ligas y torneos.
