# Request Manager App

Aplicación web para la gestión de solicitudes internas de una organización. Desarrollada como prueba técnica para el proceso de selección de **Scotiabank**.

---

## 🚀 Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Next.js | 14.2.35 | Framework fullstack con App Router |
| React | 18.x | UI Library |
| TypeScript | 5.x | Tipado estricto |
| Redux Toolkit + RTK Query | 2.12.0 | Estado global y fetching |
| React Hook Form | 7.79.0 | Manejo de formularios |
| Zod | 4.4.3 | Validación de schemas |
| Tailwind CSS | 3.4.1 | Estilos utilitarios |
| Tailwind Variants | 3.2.2 | Sistema de variantes de componentes |
| Lucide React | 1.18.0 | Iconografía |
| Recharts | 3.8.1 | Gráficos del dashboard |
| Sonner | 2.0.7 | Notificaciones toast |
| date-fns | 4.4.0 | Formateo de fechas |
| Vitest | 4.1.8 | Tests unitarios |
| Testing Library | 16.3.2 | Testing de componentes React |
| Docker | - | Containerización |

---

## 🏗️ Arquitectura

El proyecto implementa **Arquitectura Hexagonal** en el frontend, separando claramente el dominio de la infraestructura.

```text
src/
├── app/                    # Next.js App Router — rutas y páginas
│   ├── api/v1/requests/    # Route Handlers — backend API REST
│   ├── requests/           # Páginas de solicitudes
│   └── page.tsx            # Dashboard (Server Component)
├── domain/                 # Núcleo — sin dependencias externas
│   ├── models/             # Tipos e interfaces del negocio
│   ├── ports/              # Contratos (interfaces de repositorio)
│   ├── rules/              # Reglas de negocio y schemas Zod
│   └── usecases/           # Casos de uso
├── infrastructure/         # Implementaciones concretas
│   ├── adapters/           # RequestStoreAdapter
│   ├── data/               # Store en memoria y seed data
│   └── serverContainer.ts  # DI para Server Components
├── presentation/           # Capa de UI
│   ├── components/         # Componentes de negocio (Sidebar, Dashboard,etc)
│   ├── hooks/              # Hooks tipados de Redux
│   └── store/              # Redux store y RTK Query
├── shared/                 # Componentes y utilidades agnósticas
│   ├── components/         # Button, Input, Badge, Table, Modal
│   ├── hooks/              # useDebounce
│   ├── lib/                # Variantes, labels, colores, formatters
│   └── types/              # Tipos compartidos y manejo de errores
└── config/                 # Configuración global
    ├── constants.ts        # Labels, listas y paginación
    ├── env.ts              # Variables de entorno validadas con Zod
    └── logger.ts           # Logger centralizado
```

### Estrategia Server/Client

| Capa | Tecnología | Propósito |
|---|---|---|
| Server Components | serverContainer → RequestStoreAdapter → db | SSR sin overhead HTTP |
| Client Components | RTK Query → HTTP → Route Handlers → db | Caché, invalidación automática |

---

## ⚡ Funcionalidades

- **Dashboard** — métricas por estado, gráficos de distribución y solicitudes recientes
- **Listado** — búsqueda con debounce, filtros por estado/prioridad, ordenamiento y paginación
- **Detalle** — vista completa de solicitud con reglas de edición por estado
- **Creación** — formulario validado con Zod y React Hook Form
- **Edición** — solo campos permitidos, solo en estados `pending` e `in_review`
- **Eliminación** — con modal de confirmación
- **Diseño responsive** — mobile, tablet, laptop y desktop

---

## 🐳 Instalación y ejecución con Docker

### Prerrequisitos
- Docker Desktop instalado y corriendo

### Pasos

```bash
# 1. Clonar el repositorio
git clone git@github.com:erickfabiandev/request-manager-app.git
cd request-manager-app

# 2. Construir y levantar
docker-compose up --build

# 3. Abrir en el browser
http://localhost:3000
```

### Detener

```bash
docker-compose down
```

---

## 💻 Instalación local (sin Docker)

### Prerrequisitos
- Node.js 18+
- npm

### Pasos

```bash
# 1. Clonar el repositorio
git clone git@github.com:erickfabiandev/request-manager-app.git
cd request-manager-app

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Levantar en desarrollo
npm run dev

# 5. Abrir en el browser
http://localhost:3000
```

---

## 🧪 Ejecutar Tests

```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:coverage
```

### Cobertura de tests

| Área | Tests |
|---|---|
| Domain Rules | isRequestEditable, EDITABLE_STATUSES |
| Domain Schemas | createRequestSchema, editRequestSchema |
| Hooks | useDebounce |
| Components | StatusBadge, MetricCard |
| Infrastructure | db store — CRUD completo |

---

## 🔌 API REST

Base URL: `http://localhost:3000/api/v1`

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/requests` | Listado con filtros, búsqueda, ordenamiento y paginación |
| GET | `/requests/:id` | Detalle de una solicitud |
| POST | `/requests` | Crear nueva solicitud |
| PUT | `/requests/:id` | Actualizar solicitud completa |
| PATCH | `/requests/:id` | Actualizar solo prioridad |
| DELETE | `/requests/:id` | Eliminar solicitud |

### Query params disponibles (GET /requests)

| Param | Tipo | Descripción |
|---|---|---|
| `status` | string | Filtrar por estado |
| `priority` | string | Filtrar por prioridad |
| `search` | string | Búsqueda por título o ID |
| `page` | number | Página actual (default: 1) |
| `limit` | number | Registros por página (default: 5) |
| `sortField` | string | Campo de ordenamiento |
| `sortOrder` | asc/desc | Dirección del ordenamiento |

---

## 🎨 Diseño

El diseño fue desarrollado en **Figma** con una paleta inspirada en la identidad corporativa

[Link de Figma - mockups](https://www.figma.com/design/QjFZxTuhltXgWLurFQ87Vd/Request-Manager-App?node-id=0-1&t=GzjkizNgk9qqIQsh-1)

### Paleta de colores

| Token | Default | Uso |
|---|---|---|
| `primary` | #2563EB | Botones principales, links, acciones |
| `secondary` | #1A1A2E | Sidebar, headers, texto principal |
| `accent` | #F5A623 | Highlights, CTAs secundarios |
| `success` | #2F855A | Estado aprobada, confirmaciones |
| `warning` | #D97706 | Estado pendiente, advertencias |
| `danger` | #DC2626 | Estado rechazada, errores, eliminar |
| `closed` | #5C5E62 | Estado cerrada, elementos inactivos |
| `critical` | #7C3AED | Prioridad crítica |

Cada color tiene variantes semánticas: `DEFAULT`, `subtle`, `emphasis`, `solid`.

### Breakpoints responsivos

| Nombre | px | Dispositivo |
|---|---|---|
| `mobile` | 375px | Móvil |
| `tablet` | 768px | Tablet |
| `laptop` | 1280px | Laptop |
| `desktop` | 1440px | Desktop |

### Variantes de componentes

Sistema de variantes construido con **Tailwind Variants**:

- `badge.variants.ts` — StatusBadge, PriorityBadge, CategoryBadge
- `button.variants.ts` — primary, secondary, danger, ghost
- `input.variants.ts` — default, error, disabled
- `select.variants.ts` — default, error, disabled

*Nota.* El componente `CategoryBadge` fue diseñado y desarrollado; sin embargo, se omitió su implementación final debido a inconsistencias estéticas y conflictos visuales en la interfaz de usuario.

---

## 🏛️ Decisiones Técnicas

### Arquitectura Hexagonal en Frontend
El dominio no conoce React, Next.js ni RTK Query. Los casos de uso son clases puras testeables de forma aislada.

### RTK Query como capa de infraestructura cliente
RTK Query reemplaza la necesidad de un adaptador HTTP manual en el cliente, aportando caché automático, invalidación y estados de carga/error.

### Store en memoria
El backend usa un store en memoria con seed data. En producción se reemplazaría por una base de datos sin tocar el dominio ni los casos de uso.

### Eliminación física vs soft delete
Se implementó eliminación física. En banca real se recomendaría soft delete cambiando el status a `closed` para mantener trazabilidad.

### Breakpoints semánticos
Se definieron breakpoints con nombres semánticos (`mobile`, `tablet`, `laptop`, `desktop`) en lugar de los genéricos de Tailwind para mayor legibilidad y alineación con el diseño en Figma.

---

## 🔮 Mejoras Futuras

- [ ] Pruebas E2E con Playwright
- [ ] Error Boundary por módulo
- [ ] Autenticación y autorización
- [ ] Base de datos persistente (PostgreSQL)
- [ ] Dark mode completo
- [ ] Historial de cambios de solicitudes
- [ ] Adjuntos en solicitudes
- [ ] Reporteria mas detallada
- [ ] Bottom navigation bar en mobile
- [ ] Despliegue en Vercel

---

## 👤 Autor

Desarrollado por **Erick Carrasco** como parte del proceso de selección.
