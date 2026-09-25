# Casos de Prueba - Frontend (Angular UI)

Este documento define las validaciones visuales, la experiencia de usuario (UX) y el ruteo que deben probarse en el lado del cliente. Los identificadores usan el prefijo **FE** (Frontend).

| ID | Escenario (Referencia al Spec) | Precondición | Acción (WHEN) | Resultado Esperado (THEN) | Archivo de Prueba |
|---|---|---|---|---|---|
| **TC-FR-01** | [FR-01] Botón deshabilitado inicialmente | Usuario abre el formulario de creación | El usuario observa el botón "Guardar" | El botón nace bloqueado | contact-form.component.spec.ts |
| **TC-FR-02** | [FR-02] Botón deshabilitado por error visual | Formulario con datos | El usuario borra el contenido de un campo | El botón de Guardar se bloquea | contact-form.component.spec.ts |
| **TC-FR-03** | [FR-03] Cancelación segura | Usuario escribiendo datos | El usuario presiona el botón "Cancelar" | Redirección inmediata a /contacts sin grabar | contact-form.component.spec.ts |
| **TC-FR-04** | [FR-04] Modal de borrado defensivo | Pantalla de listado renderizada | El usuario presiona "Eliminar" en la tarjeta | Aparece un modal pidiendo confirmación | contact-list.component.spec.ts |
| **TC-FR-05** | [FR-05] Restricciones de Fecha | DatePicker renderizado | El usuario interactúa con el selector | El selector permite retroceder hasta -2 años y avanzar hasta +2 años | isitor-prediction.component.spec.ts |
| **TC-FR-06** | [FR-06] Carga Automática de Cuadrícula | El componente se inicializa | Se dispara el ciclo de vida inicial | Realiza automáticamente 7 llamadas API concurrentes y las resuelve en la grilla | isitor-prediction.component.spec.ts |
| **TC-FR-07** | [FR-07] Cálculo de Lógica de Capacidad | Componente cargado | Se evalúa la capacidad de visitantes | Mapea correctamente los visitantes a 'Baja', 'Media' y 'Alta' | isitor-prediction.component.spec.ts |
| **TC-FR-08** | [FR-08] Cabecera con Imagen Hero | Componente renderizado | Se renderiza la cabecera | Muestra la cabecera prominente con la imagen y el selector de fechas | isitor-prediction.component.spec.ts |
| **TC-FR-09** | [FR-09] Cuadrícula de Presentación de 7 Días | Predicciones cargadas | Se renderizan las predicciones | El componente muestra los siguientes 7 días en contenedor horizontal con scroll | isitor-prediction.component.spec.ts |
| **TC-FR-10** | [FR-10] Estilo de Tarjeta de Día | Tarjetas renderizadas | Se dibuja cada tarjeta | Muestra nombre, icono, temp, visitantes y badge; 'Hoy' tiene borde azul y etiqueta | isitor-prediction.component.spec.ts |
| **TC-FR-11** | [FR-11] Estado de Error o Vacío | La API falla | La predicción falla | Un banner de error rojo se muestra en pantalla | isitor-prediction.component.spec.ts |
| **TC-FR-12** | [FR-12] Usuario selecciona un país | Selector primario con países | El usuario selecciona un país del selector | Llena el selector secundario con las ciudades de referencia | weather.component.spec.ts |
| **TC-FR-13** | [FR-13] Visualización del clima de ciudad específica | Selectores llenos | Selecciona ciudad específica y solicita el clima | Obtiene y muestra las condiciones climáticas exclusivamente para esa ciudad | weather.component.spec.ts |
| **TC-FR-14** | [FR-14] Traducción de respuestas API clima | Payload en inglés o procesado | Los datos son presentados al usuario | Muestra las descripciones en español (ej. "Soleado") y el icono apropiado | weather.component.spec.ts |
| **TC-FR-15** | [FR-15] Rendereo de la tarjeta horizontal | App inicializada | El componente de clima es renderizado en la agenda | Los controles y datos se acoplan horizontalmente | weather.component.spec.ts |
