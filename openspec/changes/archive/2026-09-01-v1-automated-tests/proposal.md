## Why

Para implementar verdaderamente el **Spec-Driven Development (SDD)** con una calidad de nivel empresarial, los escenarios de los `spec.md` deben ser validados mediante pruebas automatizadas y poseer una trazabilidad perfecta con un departamento de QA. Actualmente carecemos de una suite de pruebas unificada y de una matriz de trazabilidad que vincule los requerimientos técnicos con el código.

## What Changes

- Creación de una arquitectura de calidad bajo la carpeta `openspec/specs/qa/`.
- Inyección de identificadores explícitos en los Specs: `BA-XX` (Backend) y `FR-XX` (Frontend).
- Separación de matrices QA en `backend-tests.md` (identificadores `TC-BA-XX`) y `frontend-tests.md` (identificadores `TC-FR-XX`).
- Configurar el entorno de pruebas en Spring Boot (añadir `spring-boot-starter-test` en `pom.xml`).
- Implementar 100% de cobertura en los Controladores Backend organizados con `@Nested`.
- Implementar 100% de cobertura UI en Angular aplicando la convención de Co-localización (archivos `.spec.ts` al lado de sus componentes).

## Capabilities

### New Capabilities
*(Ninguna. Solo se añade cobertura de pruebas y documentación de Calidad).*

### Modified Capabilities
- `contact-management`: Identificadores BA inyectados.
- `ui`: Identificadores FR inyectados.

## Impact

- **QA:** Se establecen matrices de trazabilidad con la columna `Archivo de Prueba`.
- **Backend:** Se crea `ContactControllerTest.java` validando 8 escenarios (201, 400, 409, 200, 204).
- **Frontend:** Se crean pruebas para `contact-form.component.spec.ts` y `contact-list.component.spec.ts` probando bloqueos de botones y modales.
