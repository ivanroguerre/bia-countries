# BIA Countries

## Guía de Instalación y Ejecución

### Requisitos Previos

- Node.js (versión 18 o superior)
- pnpm 

### Pasos para Ejecutar el Proyecto

1. **Clonar el Repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd bia-countries
   ```

2. **Instalar Dependencias**
   ```bash
   pnpm install
   ```

3. **Ejecutar el Proyecto en Desarrollo**
   ```bash
   pnpm dev
   ```

4. **Abrir el Navegador**
   La aplicación estará disponible en `http://localhost:3000`

### Scripts Disponibles

- `pnpm dev`: Inicia el servidor de desarrollo
- `pnpm build`: Construye la aplicación para producción
- `pnpm start`: Inicia la aplicación en modo producción
- `pnpm lint`: Ejecuta el linter para verificar el código
- `pnpm test`: Ejecuta los tests del proyecto

## Arquitectura y Solución

### Tecnologías Principales

- **Next.js (App Router)**: Framework principal que proporciona enrutamiento, componentes del servidor y una excelente experiencia de desarrollo.
- **TypeScript**: Para garantizar la seguridad de tipos y mejorar la calidad del código.
- **Tailwind CSS & Shadcn/ui**: Para el desarrollo rápido de UI con componentes pre-construidos, personalizables y accesibles.
- **TanStack Query**: Para la gestión eficiente del estado del servidor, caché y manejo de estados de carga/error.

### Estructura del Proyecto

```
src/
├── app/
│   ├── (routes)/
│   │   ├── page.tsx           # Vista principal con grid de países
│   │   └── country/[code]/    # Página de detalle de país
│   └── layout.tsx             # Layout principal con providers
├── components/
│   ├── CountryCard.tsx        # Tarjeta de país reutilizable
│   ├── SearchBar.tsx          # Componente de búsqueda
│   └── RegionFilter.tsx       # Filtro por región
├── lib/
│   ├── api.ts                 # Servicios de API
│   └── tanstack-query-provider.tsx
└── types/
    └── country.ts            # Definiciones de tipos TypeScript
```

### Características Implementadas

1. **Vista Principal**
   - Grid responsivo de países
   - Búsqueda por nombre
   - Filtrado por región
   - Soporte para modo oscuro

2. **Página de Detalle**
   - Información detallada del país
   - Navegación entre países (los países frontera redireccionan al detalle del país)
   - Diseño responsivo
   - Soporte para modo oscuro

3. **Gestión de Estado**
   - Estado del servidor: TanStack Query
   - Estado de UI: React useState

### API y Datos

La aplicación consume la API de [REST Countries](https://restcountries.com) con los siguientes endpoints:
- `/all`: Lista completa de países
- `/name/{name}`: Búsqueda por nombre
- `/region/{region}`: Filtrado por región
- `/alpha/{code}`: Detalles de un país específico

### Consideraciones Técnicas

- **Rendimiento**: Implementación de carga lazy y optimización de imágenes
- **Accesibilidad**: Componentes Shadcn/ui con soporte ARIA
- **Escalabilidad**: Arquitectura modular y componentes reutilizables

### Mejoras Futuras

- Simplificación de la página de países y de detalle del país: abstracción de componentes, creación de hooks personalizados
para la obtención de la información desde los endpoints, etc.
- Hacer uso de las distintas herramientas que proporciona el framework: decidir qué componentes debiesen ser componentes cliente y cuales deben ser componentes de lado del servidor, SSR, etc.
- Implementación de pruebas e2e para ambas páginas.
- Internacionalización
- Implementación de más filtros y ordenamiento
