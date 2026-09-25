# AppAgenda (Agenda de Contactos) - Taller 1

**Asignatura:** Desarrollo de Aplicaciones en la Nube

## Descripción

Este repositorio contiene el código fuente de AppAgenda (una Agenda de Contactos), desarrollado como parte del Taller 1 de la asignatura. El proyecto ha sido construido estructurando todo el ciclo de vida del software bajo la metodología SDD (Specification-Driven Development).

## Características y Funcionalidades

El sistema ha evolucionado agregando capacidades analíticas y de integración externas:

- **Gestión de Contactos (CRUD):** Registro, lectura, actualización y eliminación de contactos con validaciones estrictas (la agenda base).
- **Integración de Clima por País (`country-weather`):** Permite seleccionar un país y una ciudad de referencia para consultar en tiempo real las condiciones meteorológicas (temperatura e íconos descriptivos en español). Normaliza respuestas de múltiples proveedores (WeatherAPI, OpenWeatherMap) y lo presenta en una tarjeta horizontal compacta.
- **Predicción de Visitantes (`visitor-prediction`):** Un motor analítico que estima la afluencia de personas en una ubicación turística a 7 días en el futuro (ej. Mirador San Francisco). Combina datos históricos (fines de semana vs días laborables) con el pronóstico del clima. Si no hay coincidencia exacta, emplea heurística para calcular la proyección matemática, mostrándolo en una interfaz visual avanzada con métricas de capacidad (Baja, Media, Alta).

## Metodología: Specification-Driven Development (SDD)

El desarrollo de este aplicativo se abordó estableciendo las especificaciones del sistema como la fuente principal de verdad antes de iniciar la escritura de código.

La implementación de esta metodología aseguró los siguientes objetivos técnicos:
- Diseño centralizado de la arquitectura, los esquemas de datos y las interfaces de comunicación.
- Desacoplamiento total entre los entornos de backend y frontend, trabajando bajo contratos preestablecidos.
- Minimización de inconsistencias y refactorizaciones durante el desarrollo, al tener las reglas de negocio y los endpoints claramente documentados de antemano (ubicados en `openspec/specs/`).

## Arquitectura del Proyecto

El sistema opera bajo un modelo cliente-servidor distribuido en dos módulos independientes:

- **/frontend**: Aplicación web cliente (SPA) construida sobre el framework Angular. Administra la capa de presentación, el Dashboard de Predicción y el consumo de la API.
- **/backend**: API RESTful desarrollada en Java (Spring Boot) y empaquetada con Maven. Expone los servicios de negocio y los motores de predicción/clima de acuerdo a las especificaciones trazadas en la fase de diseño.

## Instrucciones de Instalación y Ejecución

El proyecto requiere la configuración y despliegue independiente del entorno de diseño, cliente y servidor.

### 1. Entorno de Diseño (OpenSpec)
En la raíz del proyecto se encuentra la herramienta OpenSpec utilizada para generar e interactuar con la especificación y los casos de prueba de QA.

```bash
# Instalar las dependencias de OpenSpec en la raíz del proyecto
npm install

# Ejecutar validaciones de la especificación
npx openspec validate --specs
```

### 2. Entorno Frontend (Angular)
El cliente web requiere la instalación de los paquetes configurados en su propio entorno Node.js.

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias de Angular
npm install

# Iniciar el servidor de desarrollo local (usualmente puerto 4200)
npm start
```

### 3. Entorno Backend (Java / Maven)
La API RESTful se compila y ejecuta gestionando sus ciclos de vida a través de Maven.

```bash
# Navegar al directorio del backend
cd backend

# Compilar el proyecto y descargar dependencias
mvn clean install

# Ejecutar el aplicativo (Spring Boot)
mvn spring-boot:run
```
