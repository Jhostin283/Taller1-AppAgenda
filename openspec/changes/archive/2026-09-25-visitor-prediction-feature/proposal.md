## Por qué

La aplicación actualmente proporciona información meteorológica en tiempo real para ciudades seleccionadas. Sin embargo, los usuarios que gestionan visitas o eventos (específicamente en el "Mirador San Francisco" en Tingo María) carecen de perspectivas predictivas. Al aprovechar datos históricos de visitantes y combinarlos con pronósticos climáticos futuros, el sistema puede predecir la cantidad de visitantes. Esto transforma la aplicación de una simple herramienta informativa a una potente plataforma de análisis predictivo, ayudando a los usuarios a planificar recursos o eventos basados en el flujo de personas esperado.

## Qué Cambia

- Crear un conjunto de datos históricos simulado (simulando 2 años de datos diarios) que contenga fechas, condiciones climáticas, temperaturas, día de la semana y recuentos de visitantes para el "Mirador San Francisco".
- Integrar un algoritmo de predicción (ej. heurística ponderada) en el backend de Spring Boot para estimar el número de visitantes.
- Modificar el servicio de clima existente para soportar la obtención de pronósticos climáticos para fechas futuras además de las condiciones actuales.
- Construir un nuevo endpoint `GET /api/prediction/visitors` que acepte una fecha y una ubicación, devolviendo la cantidad de visitantes predicha y el pronóstico.
- Actualizar el frontend de Angular para incluir un Selector de Fechas y un carrusel de 7 días.
- Añadir un dashboard/tarjeta predictiva en el frontend para mostrar la cantidad estimada de visitantes junto al pronóstico.

## Capacidades

### Nuevas Capacidades
- `prediction/visitor-prediction`: Predice la cantidad de visitantes para una ubicación dada y fecha futura basándose en datos históricos y pronósticos del clima.

### Capacidades Modificadas
- `weather/country-weather`: Extendido para soportar pronósticos de fechas futuras (Integración con API de Forecast).
- `qa/backend-tests.md`: Añadidos escenarios de prueba para el algoritmo de predicción y el controlador REST.
- `qa/frontend-tests.md`: Añadidos escenarios de prueba para la cuadrícula de 7 días y su lógica.
- `ui`: Añadidas reglas de interacción UI para el dashboard de predicción (estados de carga, degradados, iconografía).

## Impacto

- **UI**: Nuevo componente tipo carrusel de 7 días con un Hero Card para mostrar las estimaciones de visitantes.
- **Servicios Backend**: Nuevo motor/servicio de predicción, nuevos endpoints de pronóstico, integración de un conjunto de datos históricos en memoria.
- **Datos**: Un nuevo conjunto de datos mock representando patrones históricos de visitantes.
