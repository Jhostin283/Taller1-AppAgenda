# AppAgenda (Agenda de Contactos) - Taller 1

**Asignatura:** Desarrollo de Aplicaciones en la Nube

## Descripcion

Este repositorio contiene el codigo fuente de AppAgenda (una Agenda de Contactos), desarrollado como parte del Taller 1 de la asignatura. El proyecto ha sido construido estructurando todo el ciclo de vida del software bajo la metodologia SDD (Specification-Driven Development).

## Metodologia: Specification-Driven Development (SDD)

El desarrollo de este aplicativo se abordo estableciendo las especificaciones del sistema como la fuente principal de verdad antes de iniciar la escritura de codigo.

La implementacion de esta metodologia aseguro los siguientes objetivos tecnicos:
- Diseno centralizado de la arquitectura, los esquemas de datos y las interfaces de comunicacion.
- Desacoplamiento total entre los entornos de backend y frontend, trabajando bajo contratos preestablecidos.
- Minimizacion de inconsistencias y refactorizaciones durante el desarrollo, al tener las reglas de negocio y los endpoints claramente documentados de antemano.

## Arquitectura del Proyecto

El sistema opera bajo un modelo cliente-servidor distribuido en dos modulos independientes:

- **/frontend**: Aplicacion web cliente (SPA) construida sobre el framework Angular. Administra la capa de presentacion y el consumo de la API.
- **/backend**: API RESTful desarrollada en Java y empaquetada con Maven. Expone los servicios de negocio de acuerdo a las especificaciones trazadas en la fase de diseno.

## Instrucciones de Instalacion y Ejecucion

El proyecto requiere la configuracion y despliegue independiente del entorno de diseno, cliente y servidor.

### 1. Entorno de Diseno (OpenSpec)
En la raiz del proyecto se encuentra la herramienta OpenSpec utilizada para generar e interactuar con la especificacion (SDD).

```bash
# Instalar las dependencias de OpenSpec en la raiz del proyecto
npm install

# Ejecutar la herramienta OpenSpec
npx openspec
```

### 2. Entorno Frontend (Angular)
El cliente web requiere la instalacion de los paquetes configurados en su propio entorno Node.js.

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias de Angular
npm install

# Iniciar el servidor de desarrollo local (usualmente puerto 4200)
npm start
```

### 3. Entorno Backend (Java / Maven)
La API RESTful se compila y ejecuta gestionando sus ciclos de vida a traves de Maven.

```bash
# Navegar al directorio del backend
cd backend

# Compilar el proyecto y descargar dependencias
mvn clean install

# Ejecutar el aplicativo (Spring Boot)
mvn spring-boot:run
```
