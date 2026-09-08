## ADDED Test Cases

| ID | Escenario (Spec) | Precondición | Acción (WHEN) | Resultado Esperado (THEN) | Archivo de Prueba |
|---|---|---|---|---|---|
| TC-FR-05 | FR-05: Límite inferior | El componente carga la página 0 | Observar botón "Anterior" | El botón tiene atributo `disabled` y clase `opacity-50` | `contact-list.component.spec.ts` |
| TC-FR-06 | FR-06: Límite superior | El componente carga la última página | Observar botón "Siguiente" | El botón tiene atributo `disabled` y clase `opacity-50` | `contact-list.component.spec.ts` |
