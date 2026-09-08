## 1. Arquitectura QA y Trazabilidad

- [x] 1.1 Inyectar identificadores `BA-XX` y `FR-XX` en los archivos `spec.md`.
- [x] 1.2 Crear matriz de pruebas de Backend en `openspec/specs/qa/backend-tests.md` mapeando `TC-BA-01` al `08`.
- [x] 1.3 Crear matriz de pruebas de Frontend en `openspec/specs/qa/frontend-tests.md` mapeando `TC-FR-01` al `04`.
- [x] 1.4 Modificar tablas QA para incluir la columna "Archivo de Prueba" para facilitar trazabilidad.

## 2. Implementación de Pruebas en Spring Boot (ContactManagement)

- [x] 2.1 Añadir `spring-boot-starter-test` en `pom.xml`.
- [x] 2.2 Refactorizar `ContactControllerTest.java` usando `@Nested` para organizar por contexto operativo.
- [x] 2.3 Escribir `TC_BA_01`, `TC_BA_02`, `TC_BA_03`, `TC_BA_04` (Validaciones de Creación y Conflictos).
- [x] 2.4 Escribir `TC_BA_05`, `TC_BA_06` (Listado y Lectura Individual).
- [x] 2.5 Escribir `TC_BA_07`, `TC_BA_08` (Actualización y Eliminación Física).

## 3. Implementación de Pruebas en Angular (UI)

- [x] 3.1 Aplicar Co-localización (crear `contact-form.component.spec.ts` en la misma ruta que el componente).
- [x] 3.2 Escribir `TC_FR_01`, `TC_FR_02`, `TC_FR_03` para validar bloqueos visuales y navegación.
- [x] 3.3 Escribir `TC_FR_04` en `contact-list.component.spec.ts` probando la prohibición del modal nativo.
