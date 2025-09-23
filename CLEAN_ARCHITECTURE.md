# Clean Architecture Implementation

## Estructura del Proyecto

El proyecto ha sido refactorizado siguiendo los principios de Clean Architecture, organizando el código en capas bien definidas:

```
src/
├── domain/                    # Capa de Dominio
│   ├── entities/             # Entidades de negocio
│   │   ├── user.entity.ts
│   │   └── auth.entity.ts
│   ├── repositories/         # Interfaces de repositorio
│   │   └── user.repository.interface.ts
│   └── value-objects/        # Objetos de valor (futuro)
├── application/              # Capa de Aplicación
│   ├── use-cases/           # Casos de uso
│   │   ├── user/
│   │   │   ├── create-user.use-case.ts
│   │   │   ├── get-user.use-case.ts
│   │   │   └── update-user.use-case.ts
│   │   └── auth/
│   │       ├── login.use-case.ts
│   │       └── refresh-token.use-case.ts
│   ├── interfaces/          # Interfaces de servicios
│   │   ├── auth.service.interface.ts
│   │   └── user.service.interface.ts
│   ├── dtos/               # DTOs de aplicación
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   │   └── login.dto.ts
│   └── application.module.ts
├── infrastructure/          # Capa de Infraestructura
│   ├── database/
│   │   ├── entities/        # Entidades de TypeORM
│   │   │   └── user.entity.ts
│   │   └── mappers/         # Mappers entre capas
│   │       └── user.mapper.ts
│   ├── repositories/        # Implementaciones de repositorio
│   │   └── user.repository.ts
│   └── infrastructure.module.ts
└── presentation/           # Capa de Presentación
    ├── controllers/         # Controladores REST
    │   ├── user.controller.ts
    │   └── auth.controller.ts
    ├── dtos/               # DTOs de presentación
    │   ├── create-user-request.dto.ts
    │   ├── update-user-request.dto.ts
    │   └── login-request.dto.ts
    └── presentation.module.ts
```

## Principios Aplicados

### 1. **Separación de Responsabilidades**
- **Domain**: Contiene la lógica de negocio pura
- **Application**: Orquesta los casos de uso
- **Infrastructure**: Implementa detalles técnicos
- **Presentation**: Maneja la interfaz con el exterior

### 2. **Inversión de Dependencias**
- Las capas internas no dependen de las externas
- Se usan interfaces para desacoplar implementaciones
- La infraestructura implementa las interfaces del dominio

### 3. **Casos de Uso**
- Cada operación de negocio es un caso de uso independiente
- Fácil de testear y mantener
- Lógica de aplicación clara y específica

### 4. **Mappers**
- Conversión explícita entre entidades de dominio y de infraestructura
- Evita acoplamiento entre capas
- Facilita cambios en la base de datos

## Beneficios

1. **Testabilidad**: Cada capa se puede testear independientemente
2. **Mantenibilidad**: Cambios en una capa no afectan las otras
3. **Escalabilidad**: Fácil agregar nuevas funcionalidades
4. **Flexibilidad**: Cambiar implementaciones sin afectar la lógica de negocio
5. **Claridad**: Código más organizado y fácil de entender

## Flujo de Datos

1. **Request** → Presentation Layer (Controllers + DTOs)
2. **Controllers** → Application Layer (Use Cases)
3. **Use Cases** → Domain Layer (Entities + Repository Interfaces)
4. **Repository Interfaces** → Infrastructure Layer (Concrete Implementations)
5. **Response** ← Presentation Layer (Controllers)

## Próximos Pasos

1. Agregar validaciones de dominio
2. Implementar Value Objects
3. Agregar tests unitarios para cada capa
4. Implementar manejo de errores centralizado
5. Agregar logging y monitoreo
