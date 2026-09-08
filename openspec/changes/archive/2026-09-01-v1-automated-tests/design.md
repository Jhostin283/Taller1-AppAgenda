## Context

Ver proposal.md. Aplicaremos el enfoque SDD (Spec-Driven Development) pero elevado al estándar ISTQB, creando una Matriz de Trazabilidad entre Requerimientos (BA/FR) y Casos de Prueba de Calidad (TC-BA/TC-FR).

## Goals / Non-Goals

**Goals:**
- Crear una arquitectura documental QA independiente pero al mismo nivel que los specs.
- Mapeo 1:1 entre QA, Specs y Código fuente.
- Probar el 100% de la lógica de Controladores usando `@WebMvcTest` y `@Nested`.
- Probar validaciones visuales en Angular respetando la Co-localización.

**Non-Goals:**
- No configuraremos pruebas E2E (End-to-End) con Cypress en esta iteración.
- No se crearán carpetas `test/` separadas en Frontend para evitar anti-patrones de Angular.

## Decisions

### 1. Arquitectura General de Calidad y Trazabilidad
- **Arquitectura QA**: Se crea `openspec/specs/qa/` con dos archivos independientes para no mezclar equipos de calidad. Se incluye la columna "Archivo de Prueba" para guiar a los desarrolladores.
- **Identificadores QA**: Se usarán `BA-XX` (Backend) y `FR-XX` (Frontend) para los Specs de requerimientos. Los casos de prueba asociados serán `TC-BA-XX` y `TC-FR-XX`.
- **Regla de Trazabilidad 1:1 (La Regla de Oro)**: Es estrictamente obligatorio que exista un mapeo perfecto de 1:1:1 entre Documentación y Código. Si hay 8 escenarios en `spec.md` (Ej. `BA-04`), DEBE haber 8 casos en QA (`TC-BA-04`) y DEBE haber 8 métodos en el código fuente con ese mismo prefijo (Ej. `TC_BA_04_correoDuplicado()`).
- **Mapeo en Código**: El nombre de los métodos en Java o los bloques `it()` en Angular deben contener explícitamente el identificador QA asignado en la documentación.

### 2. Estándares para Backend (API & Base de Datos)
- **Estructura QA Backend**: Todo caso documentado en `backend-tests.md` debe contener las siguientes 7 columnas: *ID, Escenario, Precondición, Acción (WHEN), Resultado Esperado (THEN), Código HTTP, y Archivo de Prueba*.
- **Estructura en Código (Java)**: Se usará la convención de 1 archivo de test por 1 controlador. Para evitar desorden y re-carga del ApplicationContext de Spring, agruparemos los tests con `@Nested` por contexto (Ej. `CrearContacto`).

### 3. Estándares para Frontend (UI & Angular)
- **Estructura QA Frontend**: Todo caso documentado en `frontend-tests.md` debe contener las siguientes 6 columnas: *ID, Escenario, Precondición, Acción (WHEN), Resultado Esperado (THEN), y Archivo de Prueba*.
- **Estructura en Código (Angular)**: Co-localización estricta exigida por la arquitectura de Google. Los archivos `.spec.ts` vivirán al lado de sus componentes `.ts` (Ej. `contact-list.component.spec.ts`). Prohibido usar carpetas `test/` separadas.

## Risks / Trade-offs

- **Risk**: En Angular 19 (Standalone Components) la configuración del TestBed es ligeramente distinta.
  *Mitigation*: Se importarán directamente los componentes en el array de `imports` en lugar de `declarations`.
