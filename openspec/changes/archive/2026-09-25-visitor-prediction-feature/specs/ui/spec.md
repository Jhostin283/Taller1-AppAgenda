## Requisitos AÑADIDOS

### Requisito: Restricciones de la Interfaz del Dashboard de Predicción
La interfaz del Dashboard de Predicción DEBERÁ adherirse a restricciones visuales específicas para mantener la consistencia con el sistema de diseño de la aplicación.
- **Escenario: Cabecera con Imagen Hero**: El componente DEBERÁ mostrar una cabecera prominente usando la imagen `assets/mirador.png` con un degradado oscuro superpuesto y texto blanco indicando la ubicación. DEBERÁ incluir un selector de fechas en la cabecera que permita seleccionar fechas entre -2 años y +2 años a partir de hoy.
- **Escenario: Cuadrícula de Presentación de 7 Días**: El componente DEBERÁ mostrar los siguientes 7 días en un contenedor flexible horizontal y con desplazamiento (scroll).
- **Escenario: Estilo de Tarjeta de Día**: La tarjeta de cada día DEBERÁ mostrar el nombre del día, icono del clima, temperatura, cantidad de visitantes predicha y un indicador de capacidad colorido (Verde/Amarillo/Rojo según el volumen). La tarjeta de "Hoy" DEBERÁ estar resaltada con un borde azul y una etiqueta absoluta que diga "Hoy".
- **Escenario: Estado de Error / Vacío**: SI la predicción falla, ENTONCES un banner de error rojo (`bg-red-50 text-red-700`) DEBERÁ mostrarse en pantalla.
