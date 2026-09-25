## Contexto
Tras la exitosa integración de los datos del clima en tiempo real (`add-weather-feature`), el siguiente paso lógico es implementar analítica predictiva. El sistema predecirá la cantidad de visitantes para ubicaciones específicas (inicialmente el "Mirador San Francisco") basándose en datos históricos y pronósticos futuros del clima.

## Objetivos / No Objetivos

**Objetivos:**
- Implementar un algoritmo de predicción robusto en Spring Boot para estimar el número de visitantes basándose en factores de clima y fecha.
- Generar un conjunto sustancial de datos históricos simulados (730 registros correspondientes a 2 años) para alimentar al algoritmo.
- Integrar peticiones a la API de pronósticos dentro del `ResilientWeatherService` existente.
- Crear una interfaz clara y predictiva de 7 días (carrusel) para que los usuarios visualicen fácilmente las estimaciones y puedan retroceder o avanzar 2 años en el tiempo.

**No Objetivos:**
- Desplegar modelos de Machine Learning complejos (ej. redes neuronales vía Python/TensorFlow). Nos apegaremos a una heurística ponderada alcanzable directamente con Java.
- Predecir datos para todas las ciudades globales inmediatamente. El conjunto de datos inicial y el ajuste de predicciones se centrarán específicamente en el "Mirador San Francisco" en Tingo María.

## Decisiones

**1. Generación del Conjunto de Datos Histórico**
- **Justificación**: Para hacer predicciones realistas, el algoritmo necesita datos. Crearemos datos simulados en la capa de persistencia (`VisitorHistoryRepository`) que almacenen un historial de 2 años en memoria. Este conjunto establecerá patrones: los fines de semana tienen líneas base altas, la lluvia las reduce en un factor específico, y el clima soleado las incrementa.
- **Alternativas**: Se rechazó el uso de una base de datos externa real para mantener el proyecto ligero e independiente.

**2. Algoritmo de Predicción (Java)**
- **Justificación**: Implementaremos un algoritmo heurístico que promedie los días históricos con condiciones similares (mismo clima, mismo tipo de día - fin de semana vs laborable). El resultado final se redondeará a la decena más cercana para dar aspecto de estimación.
- **Alternativas**: Se rechazó integrar un microservicio en Python para ML porque introducía una complejidad arquitectónica innecesaria para este alcance.

**3. Visualización y Fechas en el Frontend**
- **Justificación**: La interfaz introducirá un componente predictivo que utilizará `forkJoin` de RxJS para lanzar 7 peticiones concurrentes y mostrar un carrusel de 7 días. El selector de fechas permitirá saltar 2 años hacia el pasado o hacia el futuro, y el backend inyectará pseudo-aleatoriedad térmica para fechas lejanas simulando pronósticos para evadir bloqueos de API.

## Riesgos / Compensaciones

- **Riesgo: Limitaciones de la API de Pronósticos** → **Mitigación**: Para evadir el límite de 3-7 días de las versiones gratuitas de WeatherAPI/OpenWeatherMap, el backend inyectará una variación térmica determinista basada en el día del año para simular pronósticos y condiciones climáticas a 2 años futuro/pasado.
- **Riesgo: Inexactitud del Algoritmo** → **Mitigación**: El conjunto de datos simulados será generado matemáticamente para correlacionarse de forma perfecta con la lógica del algoritmo, asegurando resultados predecibles y testeables (redondeados a decenas) durante esta fase de prototipo.
