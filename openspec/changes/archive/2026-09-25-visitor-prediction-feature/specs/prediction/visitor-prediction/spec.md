## Propósito
Proporcionar un motor analítico predictivo que estime la cantidad de visitantes para ubicaciones específicas (ej. Mirador San Francisco) basado en datos históricos de visitas y pronósticos climáticos.

## Requisitos AÑADIDOS

### Requisito: Generación de Datos Históricos
El backend DEBERÁ inicializar un conjunto de datos históricos simulado que represente exactamente 730 días (2 años) de registros de visitas pasadas.
- **Reglas**: Los datos deben correlacionar lógicamente una mayor cantidad de visitantes en fines de semana y clima despejado, y menor cantidad en días laborables y clima lluvioso.

### Requisito: Integración del Pronóstico del Clima
El backend DEBERÁ obtener pronósticos climáticos para las fechas futuras solicitadas utilizando el proveedor principal, y utilizando el proveedor secundario en caso de falla.
- **Restricciones**: Para evadir las limitaciones de la API gratuita, el backend inyectará una desviación seudoaleatoria a la temperatura permitiendo proyectar el clima hacia cualquier fecha futura de manera determinista.

### Requisito: Algoritmo Predictivo
El backend DEBERÁ calcular los visitantes estimados promediando los registros históricos que coincidan estrictamente con el tipo de día (fin de semana/laborable) y la condición climática de la fecha objetivo. El resultado final debe ser redondeado a la decena más cercana (ej. 97 -> 100).
- **Regla de Respaldo**: Si no existe una coincidencia histórica exacta, el sistema DEBERÁ usar una línea base heurística modificada por multiplicadores climáticos (ej. soleado = 1.3x, lluvioso = 0.5x).

### Requisito: Selección de Fecha en Frontend
La interfaz de usuario DEBERÁ proporcionar un selector de fechas para definir la fecha base de la predicción.
- **Restricciones**: El selector de fechas DEBERÁ permitir retroceder hasta 2 años en el pasado y hasta 2 años hacia el futuro.

### Requisito: Visualización del Dashboard de Predicción
La interfaz de usuario DEBERÁ mostrar el resultado de la predicción en una tarjeta visual clara con formato de 7 días continuos.
- **Contenido**: Las tarjetas DEBERÁN mostrar la cantidad de visitantes predicha, el nombre del día, la temperatura pronosticada, la condición climática y un icono de clima apropiado.
- **Comportamiento**: La interfaz DEBERÁ deshabilitar el botón de actualización y mostrar un spinner de carga mientras el backend calcula las predicciones.
