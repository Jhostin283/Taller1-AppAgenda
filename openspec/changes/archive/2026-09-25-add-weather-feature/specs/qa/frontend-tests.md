## MODIFIED Test Cases

(None)

## ADDED Test Cases

| ID | Escenario (Spec) | Precondición | Acción (WHEN) | Resultado Esperado (THEN) | Archivo de Prueba |
|---|---|---|---|---|---|
| TC-FR-07 | FR-07: Indicador de carga | Lista de países cargada | Seleccionar país en `CountrySelectorComponent` | Muestra estado de carga temporalmente | `country-selector.component.spec.ts` |
| TC-FR-08 | FR-09: Modal con backdrop-blur | Carga completada o error | Visualizar datos o ver alerta de error | Se muestra componente tipo Modal con fondo borroso | `city-weather-list.component.spec.ts` |
| TC-FR-09 | FR-08: Error de clima indisponible | Ambos APIs caen | Intento de carga | Se muestra mensaje de indisponibilidad | `city-weather-list.component.spec.ts` |
