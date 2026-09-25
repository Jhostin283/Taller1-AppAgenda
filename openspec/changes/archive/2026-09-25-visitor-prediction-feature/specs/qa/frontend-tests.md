## Requisitos AÑADIDOS

### Requisito: Pruebas de la Cuadrícula de Predicción de 7 Días
La suite de pruebas del frontend DEBERÁ verificar la nueva lógica de pronóstico automático de 7 días.
- **Escenario: Carga Automática de Cuadrícula**: La prueba DEBERÁ asegurar que, tras la inicialización, el `VisitorPredictionComponent` realiza automáticamente exactamente 7 llamadas a la API (una por cada día a partir del día seleccionado) y las resuelve dentro del arreglo `predictions()`.
- **Escenario: Cálculo de Lógica de Capacidad**: La prueba DEBERÁ asegurar que el método de ayuda `getCapacityStatus` mapea correctamente los visitantes a 'Baja' (<200), 'Media' (200-500) y 'Alta' (>500).
