# Arquitectura (mobile-first)

## Principios

- **Mobile-first**: todos los casos de uso pensados para latencia móvil, payloads pequeños y navegación táctil.
- **Multideporte nativo**: `Sport` modela reglas de jugadores/equipos/posiciones sin hardcode.
- **Escalable por módulos**: cada bounded context en módulo independiente.

## Capas backend

1. **Controllers / Gateways**: entrada HTTP/WS.
2. **Application services**: casos de uso y reglas.
3. **Domain**: entidades, value objects y políticas.
4. **Infrastructure**: Prisma repositories, adapters (FCM, Storage).

## Módulos backend

- `auth`: registro/login/refresh.
- `sports`: catálogo de deportes y validaciones de configuración.
- `events`: creación, búsqueda geográfica y postulaciones.
- `chat`: mensajería por evento vía WebSockets.
- `reviews`: reputación y promedio.
- `users`: perfil, deportes preferidos y disponibilidad.

## App mobile (Expo)

- `features/auth`
- `features/events`
- `features/sports`
- `shared` (API client, theme, reusable components)

## Estrategias de performance

- Paginación por cursor en listados.
- Cache de eventos cercanos (TanStack Query).
- Compresión de imágenes antes de upload.
- Debounce en búsqueda geográfica.

## Seguridad

- JWT access token corto + refresh token rotativo.
- Hash bcrypt para passwords.
- Validación DTO server-side.
- Rate limiting y sanitización.
- Roles (USER/ADMIN) y permisos por recurso.
