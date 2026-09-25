# visitor-prediction Specification

## Purpose
Proporcionar un motor analítico predictivo que estime la cantidad de visitantes para ubicaciones específicas (ej. Mirador San Francisco) basado en datos históricos de visitas y pronósticos climáticos.

## Requirements

### Requirement: Generación de Datos Históricos
The backend SHALL inicializar un conjunto de datos históricos simulado que represente exactamente 730 días (2 años) de registros de visitas pasadas.

#### Scenario: [BA-09] Generación de Datos Históricos
- **WHEN** los datos son generados
- **THEN** deben correlacionar lógicamente una mayor cantidad de visitantes en fines de semana y clima despejado, y menor cantidad en días laborables y clima lluvioso.

### Requirement: Integración del Pronóstico del Clima
The backend SHALL obtener pronósticos climáticos para las fechas futuras solicitadas utilizando el proveedor principal, y utilizando el proveedor secundario en caso de falla.

#### Scenario: [BA-10] Variación térmica seudoaleatoria
- **WHEN** se solicita el pronóstico a largo plazo
- **THEN** el backend inyectará una desviación seudoaleatoria a la temperatura permitiendo proyectar el clima hacia cualquier fecha futura de manera determinista.

### Requirement: Algoritmo Predictivo
The backend SHALL calcular los visitantes estimados promediando los registros históricos que coincidan estrictamente. Si no hay coincidencia, usará heurística.

#### Scenario: [BA-11] Coincidencia Exacta Encontrada
- **WHEN** existe una coincidencia histórica exacta (clima y tipo de día)
- **THEN** el sistema MUST calcular la predicción como el promedio exacto de dichos registros históricos.

#### Scenario: [BA-12] Cálculo con Respaldo
- **WHEN** no existe una coincidencia histórica exacta
- **THEN** el sistema MUST usar una línea base heurística modificada por multiplicadores climáticos (ej. soleado = 1.3x).

### Requirement: Endpoint de Predicción
The backend SHALL exponer un controlador REST para proveer las predicciones a los clientes.

#### Scenario: [BA-13] Petición Válida de Predicción
- **WHEN** se hace una petición válida GET a /api/prediction/visitors
- **THEN** el sistema MUST devolver un HTTP 200 con la carga JSON de PredictionResponse.

### Requirement: Lógica de UI para Predicciones
La interfaz de usuario SHALL proveer componentes y funciones auxiliares para renderizar las predicciones correctamente.

#### Scenario: [FR-05] Restricciones de Fecha
- **WHEN** el usuario interactúa con el selector
- **THEN** el selector MUST permitir retroceder hasta 2 años en el pasado y hasta 2 años hacia el futuro.

#### Scenario: [FR-06] Carga Automática de Cuadrícula
- **WHEN** el componente se inicializa
- **THEN** MUST realizar automáticamente 7 llamadas a la API concurrentes (una por cada día) y resolverlas en la grilla.

#### Scenario: [FR-07] Cálculo de Lógica de Capacidad
- **WHEN** se evalúa la capacidad
- **THEN** MUST mapear correctamente los visitantes a 'Baja' (<200), 'Media' (200-500) y 'Alta' (>500).
