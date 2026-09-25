## Requisitos AÑADIDOS

### Requisito: Pruebas del Servicio de Predicción de Visitantes
La suite de pruebas del backend DEBERÁ verificar la heurística y la lógica de promedios del motor de predicciones.
- **Escenario: Coincidencia Exacta Encontrada**: `VisitorPredictionServiceTest` DEBERÁ simular un conjunto de datos históricos con condiciones climáticas similares y asegurar que el valor predecido sea exactamente el promedio de dichos registros históricos.
- **Escenario: Sin Coincidencia (Respaldo)**: `VisitorPredictionServiceTest` DEBERÁ simular un escenario sin historial coincidente y asegurar que la fórmula heurística de respaldo calcule los multiplicadores correctos basado en el día (fin de semana/laborable) y las cadenas de texto del clima.

### Requisito: Pruebas del Controlador de Predicción de Visitantes
- **Escenario: Petición Válida**: `VisitorPredictionControllerTest` DEBERÁ verificar que el endpoint `/api/prediction/visitors` acepta correctamente `date`, `location`, `city` y `country`, invoca al servicio y devuelve un HTTP 200 con la carga JSON `PredictionResponse`.
