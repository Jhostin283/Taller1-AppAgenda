## Purpose
Reglas de diseño de interfaz (UI/UX) y comportamiento visual del frontend.

## Requirements

### Requirement: Validación Visual Estricta
El sistema SHALL deshabilitar visualmente y funcionalmente cualquier botón de envío si el formulario tiene un error de validación.

#### Scenario: [FR-01] Botón deshabilitado inicialmente
- **WHEN** el formulario está vacío
- **THEN** el botón Guardar Contacto está bloqueado.

#### Scenario: [FR-02] Botón deshabilitado por error
- **WHEN** el usuario borra un campo obligatorio
- **THEN** el botón Guardar Contacto se bloquea inmediatamente.

### Requirement: Navegación Segura
El sistema SHALL proveer mecanismos para escapar de las vistas de edición o creación sin guardar.

#### Scenario: [FR-03] Cancelación
- **WHEN** el usuario hace clic en Cancelar
- **THEN** es redirigido a la lista de contactos sin modificar los datos.

### Requirement: Eliminación Segura
El sistema SHALL advertir explícitamente antes de realizar acciones destructivas usando un Modal de interfaz, prohibiendo las alertas nativas.

#### Scenario: [FR-04] Modal de borrado
- **WHEN** el usuario intenta borrar un contacto
- **THEN** aparece un Modal superpuesto con desenfoque de fondo y no se borra hasta que se confirme.

### Requirement: Restricciones de la Interfaz del Dashboard de Predicción
La interfaz del Dashboard de Predicción SHALL adherirse a restricciones visuales específicas para mantener la consistencia con el sistema de diseño de la aplicación.

#### Scenario: [FR-08] Cabecera con Imagen Hero
- **WHEN** se renderiza la cabecera
- **THEN** el componente MUST mostrar una cabecera prominente usando la imagen assets/mirador.png con un degradado oscuro superpuesto y texto blanco indicando la ubicación.
- **AND** MUST incluir un selector de fechas en la cabecera que permita seleccionar fechas entre -2 años y +2 años a partir de hoy.

#### Scenario: [FR-09] Cuadrícula de Presentación de 7 Días
- **WHEN** se renderizan las predicciones
- **THEN** el componente MUST mostrar los siguientes 7 días en un contenedor flexible horizontal y con desplazamiento (scroll).

#### Scenario: [FR-10] Estilo de Tarjeta de Día
- **WHEN** se dibuja cada tarjeta
- **THEN** la tarjeta de cada día MUST mostrar el nombre del día, icono del clima, temperatura, cantidad de visitantes predicha y un indicador de capacidad colorido (Verde/Amarillo/Rojo según el volumen).
- **AND** la tarjeta de "Hoy" MUST estar resaltada con un borde azul y una etiqueta absoluta que diga "Hoy".

#### Scenario: [FR-11] Estado de Error o Vacío
- **WHEN** la predicción falla
- **THEN** un banner de error rojo MUST mostrarse en pantalla.
