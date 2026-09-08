# Casos de Prueba - Frontend (Angular UI)

Este documento define las validaciones visuales, la experiencia de usuario (UX) y el ruteo que deben probarse en el lado del cliente. Los identificadores usan el prefijo **FE** (Frontend).

| ID | Escenario | Precondición | Acción (WHEN) | Resultado Esperado (THEN) | Archivo de Prueba |
|---|---|---|---|---|---|
| **TC-FR-01** | Botón deshabilitado inicialmente | Usuario abre el formulario de creación | El usuario observa el botón "Guardar" | El botón nace bloqueado | `contact-form.component.spec.ts` |
| **TC-FR-02** | Botón deshabilitado por error visual | Formulario con datos | El usuario borra el contenido de un campo | El botón de Guardar se bloquea | `contact-form.component.spec.ts` |
| **TC-FR-03** | Cancelación segura | Usuario escribiendo datos | El usuario presiona el botón "Cancelar" | Redirección inmediata a `/contacts` | `contact-form.component.spec.ts` |
| **TC-FR-04** | Modal de borrado defensivo | Pantalla de listado renderizada | El usuario presiona "Eliminar" en la tarjeta | Aparece un modal pidiendo confirmación | `contact-list.component.spec.ts` |
