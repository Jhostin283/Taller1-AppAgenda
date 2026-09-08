## Context

Lanzamiento de la Versión 1.0. Se requiere elegir el "Tech Stack" y la arquitectura que dictará cómo se comunicarán los componentes a lo largo del tiempo. 

## Goals / Non-Goals

**Goals:**
- Separación estricta de responsabilidades (Backend totalmente independiente del Frontend).
- Rendimiento y validación estricta en tiempo real en la UI.
- Base de datos relacional para escalabilidad.

**Non-Goals:**
- No se implementarán arquitecturas complejas de microservicios. Se usará un monolito REST para el backend.
- No se usará Contract-First (Generadores OpenAPI) para evitar acoplamiento rígido con herramientas de terceros.

## Decisions

- **Backend**: Spring Boot 3 con Java 17. Se elige por ser el estándar de la industria y brindar el ecosistema más maduro para APIs REST.
- **Arquitectura Backend**: "Code-First". Se escriben manualmente los DTOs y Controladores usando anotaciones `@Valid` de Jakarta para tener control milimétrico sobre los códigos HTTP devueltos.
- **Base de Datos**: PostgreSQL 15, elegida por su soporte de restricciones relacionales (UNIQUE, NOT NULL). Se conecta vía Spring Data JPA.
- **Frontend**: Angular 19. Se descartan componentes clásicos en favor de **Standalone Components** y **Signals** para un rendimiento ultra rápido en la detección de cambios sin usar RxJS complicado.
- **Estilos**: Tailwind CSS.

## Risks / Trade-offs

- **Riesgo:** Code-First requiere escribir más código boilerplate manual que los generadores automáticos.
  *Mitigación:* Mayor control y personalización total de las respuestas de error.
- **Riesgo:** Signals de Angular 19 es tecnología nueva.
  *Mitigación:* Se implementa un modelo de datos reactivo simple que es fácil de entender.
