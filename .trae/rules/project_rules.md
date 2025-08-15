---
description: 
globs: 
alwaysApply: true
---
# Reglas del Proyecto - AI Chat Sales Assistant

## Tecnologías y Versiones
- **React**: 19.1.0
- **TypeScript**: 5.8.3
- **Vite**: 7.0.4
- **React Router DOM**: 7.7.1
- **CSS Modules**: Con metodología BEM en camelCase

## Estructura del Proyecto

### Organización de Carpetas
```
src/
├── core/           # Lógica central, tipos, servicios, estado global
│   ├── services/   # Servicios y APIs
│   ├── types/      # Tipos TypeScript globales
│   └── state/      # Estado global (Context + Reducers)
├── shared/         # Componentes y hooks reutilizables
│   ├── components/ # Componentes compartidos
│   └── hooks/      # Hooks personalizados
├── public/         # Rutas y funcionalidades públicas
│   ├── auth/       # Autenticación
│   ├── conversations/ # Conversaciones
│   ├── reports/    # Reportes
│   └── context/    # Contexto específico
└── private/        # Rutas y funcionalidades privadas
    └── companies/  # Gestión de empresas
```

## Convenciones de Código



### TypeScript
- Usar tipos estrictos en lugar de `any`
- Definir interfaces para props de componentes
- Usar tipos union para estados y acciones
- Exportar tipos desde `src/core/types/`

### React 19
- Usar hooks modernos (useReducer, useContext, useState)
- Implementar Context API para estado global
- Usar React Router DOM v7 para navegación
- Seguir el patrón de reducer para manejo de estado

### CSS Modules con BEM en camelCase

#### Metodología BEM Adaptada
- **Block**: Componente principal (camelCase)
- **Element**: Elemento hijo (camelCase con doble guión bajo)
- **Modifier**: Variante o estado (camelCase con doble guión medio)

#### Ejemplos de Nomenclatura
```css
/* Block */
.chatContainer { }

/* Element */
.chatContainerMessageList { }
.chatContainerInputField { }
.chatContainerSendButton { }

/* Modifier */
.chatContainerIsLoading { }
.chatContainerMessageIsOwn { }
.chatContainerButtonIsDisabled { }
```

#### Archivos CSS Modules
- Nombre: `ComponentName.module.css`
- Ubicación: Mismo directorio que el componente
- Estructura: Organizada por blocks, elements y modifiers

### Manejo de Estado
- Usar Context API con useReducer para estado global
- Seguir el patrón establecido en `AppContext.tsx`
- Organizar reducers por dominio (auth, user, etc.)
- Definir tipos de acciones en `src/core/types/State.ts`

### Rutas
- Separar rutas públicas y privadas
- Usar React Router DOM v7
- Organizar rutas por funcionalidad
- Implementar lazy loading cuando sea apropiado

### Imports y Exports
- Usar imports nombrados para componentes
- Agrupar imports: React, librerías externas, componentes internos
- Exportar desde archivos index cuando sea apropiado

## Reglas Específicas

### Nombres de Archivos
- Componentes: `PascalCase.tsx`
- Hooks: `useHookName.ts`
- Tipos: `Types.ts` o `Interface.ts`
- CSS Modules: `ComponentName.module.css`
- Reducers: `reducer.ts`

### Estructura de Carpetas por Funcionalidad
```
feature/
├── components/     # Componentes específicos
├── hooks/         # Hooks específicos
├── pages/         # Páginas/componentes de ruta
└── types/         # Tipos específicos (si aplica)
```

## Comandos del Proyecto
- `npm run dev`: Desarrollo con Vite
- `npm run build`: Build de producción
- `npm run lint`: Linting con ESLint
- `npm run preview`: Preview del build

## Consideraciones Especiales
- El proyecto usa Vite como bundler
- Configuración de TypeScript estricta
- ESLint configurado para React y TypeScript
- Estructura modular y escalable
- Separación clara entre funcionalidades públicas y privadas
- CSS Modules con metodología BEM adaptada para camelCase
- En los componentes no debe haber lógica, la lógica se debe almacenar en los custom hooks. Los componentes solo invocan funciones y muestran información.
- No comentar el código realizado.
- No exportar los componentes o hooks en archivos index.ts.