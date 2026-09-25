# Casos de Prueba - Backend (Spring Boot)

Este documento define las validaciones estrictas y operaciones HTTP que deben ser probadas a nivel de API. Los identificadores usan el prefijo **BE** (Backend).

| ID | Escenario (Referencia al Spec) | Precondición | Acción (WHEN) | Resultado Esperado (THEN) | Código HTTP | Archivo de Prueba |
|---|---|---|---|---|---|---|
| **TC-BA-01** | [BA-01] Creación exitosa | Base de datos activa | Se envía JSON válido | El contacto se guarda en DB | 201 Created | ContactControllerTest.java |
| **TC-BA-02** | [BA-02] Validación de correo | Formulario con datos | Se envía un correo inválido (ej. sin @) | El sistema rechaza la petición | 400 Bad Request | ContactControllerTest.java |
| **TC-BA-03** | [BA-03] Validación de teléfono | Formulario con datos | Se envía un teléfono con letras | El sistema rechaza la petición | 400 Bad Request | ContactControllerTest.java |
| **TC-BA-04** | [BA-04] Correo duplicado | Existe un correo "a@a.com" | Se envía un POST con "a@a.com" | El sistema detecta colisión | 409 Conflict | ContactControllerTest.java |
| **TC-BA-05** | [BA-05] Listado sin filtros | Hay 2 contactos en DB | Se llama a GET /api/contacts | Retorna JSON con arreglo | 200 OK | ContactControllerTest.java |
| **TC-BA-06** | [BA-06] Contacto existente | Existe contacto ID=1 | Se llama a GET /api/contacts/1 | Retorna el detalle del contacto | 200 OK | ContactControllerTest.java |
| **TC-BA-07** | [BA-07] Actualización de datos | Existe contacto ID=1 | Se llama a PUT /api/contacts/1 | Sobrescribe el registro | 200 OK | ContactControllerTest.java |
| **TC-BA-08** | [BA-08] Eliminación exitosa | Existe contacto ID=1 | Se llama a DELETE /api/contacts/1 | Se borra permanentemente | 204 No Content | ContactControllerTest.java |
| **TC-BA-09** | [BA-09] Generación de Datos Históricos | Spring Boot arranca | @PostConstruct se ejecuta | Genera exactamente 730 días correlacionando clima/visitas | Falta poner para próximo (Ideal: 201 Created) | VisitorHistoryRepositoryTest.java |
| **TC-BA-10** | [BA-10] Variación térmica seudoaleatoria | Mock API limitado a 7 días | GET forecast con days > 7 | Devuelve variación pseudo-aleatoria determinista | Falta poner para próximo (Ideal: 200 OK) | WeatherProviderServiceTest.java |
| **TC-BA-11** | [BA-11] Coincidencia Exacta Encontrada | Existe una coincidencia histórica exacta (clima y tipo de día) | Se solicita el cálculo del algoritmo | Calcula la predicción como el promedio exacto de dichos registros | Falta poner para próximo (Ideal: 200 OK) | VisitorPredictionServiceTest.java |
| **TC-BA-12** | [BA-12] Cálculo con Respaldo | No existe una coincidencia histórica exacta | Se solicita el cálculo del algoritmo | Usa una línea base heurística modificada por multiplicadores (ej. 1.3x) | Falta poner para próximo (Ideal: 200 OK) | VisitorPredictionServiceTest.java |
| **TC-BA-13** | [BA-13] Petición Válida de Predicción | Servicio de predicción activo | Se hace una petición válida GET a /api/prediction/visitors | Devuelve un HTTP 200 con la carga JSON de PredictionResponse | 200 OK | VisitorPredictionControllerTest.java |
| **TC-BA-14** | [BA-14] Mapeo de proveedores | Respuesta externa recibida | El backend consume un proveedor externo | Normaliza payload a city, country, temperature, description | Falta poner para próximo (Ideal: 200 OK) | WeatherProviderServiceTest.java |
