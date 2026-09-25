## MODIFIED Test Cases

(None)

## ADDED Test Cases

| ID | Escenario (Spec) | Precondición | Acción (WHEN) | Resultado Esperado (THEN) | Código HTTP | Archivo de Prueba |
|---|---|---|---|---|---|---|
| TC-BA-11 | Primary provider succeeds | API WeatherAPI activa | GET `/api/weather/{country}` | JSON con datos de clima de las ciudades de referencia | 200 | `WeatherControllerTest.java` |
| TC-BA-12 | Primary provider fails | API WeatherAPI caída u ocupada | GET `/api/weather/{country}` | JSON con datos de clima provistos por OpenWeatherMap (Fallback) | 200 | `WeatherControllerTest.java` |
| TC-BA-13 | Both providers fail | Ambas APIs caídas | GET `/api/weather/{country}` | Mensaje de error indicando clima no disponible | 503 | `WeatherControllerTest.java` |
