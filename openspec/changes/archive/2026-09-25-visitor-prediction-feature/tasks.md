# Tareas de Implementación

## Backend

1. [x] Crear el modelo `VisitorRecord` para almacenar los datos históricos de visitantes.
2. [x] Crear el `VisitorHistoryRepository` para generar y almacenar 730 días de datos históricos simulados (correlacionados con el clima y fines de semana).
3. [x] Crear el DTO `PredictionResponse` para la respuesta de la API.
4. [x] Implementar el `VisitorPredictionService` con el algoritmo heurístico de promedios y respaldos (redondeado a decenas).
5. [x] Actualizar `WeatherProviderService` y sus implementaciones (`WeatherApiProvider`, `OpenWeatherMapProvider`) para soportar el método `getForecastForCity` con inyección de pseudo-aleatoriedad para fechas lejanas.
6. [x] Actualizar `ResilientWeatherService` para orquestar la lógica de respaldo de pronósticos.
7. [x] Crear `VisitorPredictionController` para exponer el endpoint `GET /api/prediction/visitors`.
8. [x] Crear pruebas unitarias para `VisitorPredictionService` y `VisitorPredictionController` usando JUnit y Mockito.

## Frontend

9. [x] Actualizar `WeatherService` con la interfaz `PredictionResponse` y la llamada a la API `predictVisitors`.
10. [x] Generar el componente standalone `VisitorPredictionComponent`.
11. [x] Implementar la lógica del selector de fechas en `visitor-prediction.component.ts` (restringiendo a +/- 2 años) y la carga concurrente de 7 días con `forkJoin`.
12. [x] Diseñar la tarjeta UI en `visitor-prediction.component.html` usando Tailwind CSS, la imagen Hero del mirador y una cuadrícula desplazable de 7 días.
13. [x] Importar y colocar `<app-visitor-prediction>` en la interfaz de `ContactListComponent`.
14. [x] Crear pruebas unitarias en `visitor-prediction.component.spec.ts` para validar las restricciones del formulario, la carga concurrente y la integración con la API.

## Documentación

15. [x] Escribir `proposal.md` con el caso de negocio y las capacidades.
16. [x] Escribir `design.md` con las decisiones arquitectónicas y riesgos.
17. [x] Escribir `spec.md` con los requisitos estrictos de comportamiento y las restricciones de la lógica de predicción.
18. [x] Escribir `qa/backend-tests.md` para documentar los escenarios de prueba requeridos para el backend.
19. [x] Escribir `qa/frontend-tests.md` para documentar los escenarios de prueba requeridos para la UI del frontend.
20. [x] Escribir `ui/spec.md` para documentar las reglas de interacción visual y estados de estilo.
