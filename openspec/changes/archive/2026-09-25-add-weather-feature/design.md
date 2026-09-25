## Context
The application is currently a Spring Boot backend with an Angular 19 frontend. The system needs to support fetching weather data using two external providers (WeatherAPI and OpenWeatherMap) to provide a new feature for viewing weather by selected country and its reference cities. See `proposal.md` for the functional motivation. The architecture follows explicit Code-First design without OpenAPI generators.

**Documentation Methodology (OpenSpec):**
These documents are structured following the **OpenSpec** methodology. The documentation is deliberately split into specific files to maintain clear, version-controlled traceability of the feature lifecycle:
- `proposal.md`: Captures the "Why" and "What" (business case, user impact, and capabilities).
- `design.md`: Captures the "How" (technical architecture, decision records, and risks).
- `specs/.../spec.md`: Captures the strict, testable "Requirements" (Gherkin-style scenarios and data contracts).
This separation ensures that business logic, architectural decisions, and QA requirements do not become a single monolithic unreadable document, but rather modular files that map directly to the feature's evolution.

## Goals / Non-Goals

**Goals:**
- Design a backend service in Spring Boot that gracefully falls back from WeatherAPI to OpenWeatherMap if the primary provider fails.
- Provide clear REST API endpoints to retrieve reference cities for a specific country (`GET /api/weather/cities/{country}`) and their current weather (`GET /api/weather/{country}/{city}`).
- Use Angular Signals for state management in the frontend and strict forms for country/city cascading selection.
- Achieve at least 80% test coverage using Jacoco in the backend.

**Non-Goals:**
- Caching weather data in PostgreSQL (will rely on in-memory caching or direct requests for this iteration).
- Managing API keys via a complex external secrets manager (using standard Spring Boot `application.properties`/environment variables for now).

## Decisions

**1. Code-First Backend Integration**
- **Rationale**: The project explicitly forbids OpenAPI/Contract-First generation. Therefore, we will manually create DTO records in Java (e.g., `CityWeatherResponse`) to serve as the contract for the REST controller, keeping it completely decoupled from the frontend.
- **Alternatives**: OpenAPI generation was considered but rejected due to project constraints.

**2. Redundancy Pattern (Circuit Breaker / Fallback)**
- **Rationale**: A `WeatherProviderService` interface will have two implementations: `WeatherApiProvider` and `OpenWeatherMapProvider`. A composite service, `ResilientWeatherService`, will attempt to call the primary provider. If an exception (e.g., HTTP 5xx or timeout) occurs, it catches the exception and delegates the call to the secondary provider.
- **Alternatives**: Using Spring Retry or Resilience4j. While Resilience4j is robust, a simple try-catch fallback pattern is lighter and meets the immediate requirement without adding extra dependencies unless explicitly needed.

**3. Frontend Integration & State Management**
- **Rationale**: The Angular UI uses Standalone Components with `Signals` to manage the state. The frontend fetches available countries dynamically (`GET /api/weather/countries`), cascading to the city list (`GET /api/weather/cities/{country}`). 
- **Decisions**: A strict Angular Form handles the cascading `<select>` dropdowns. The communication uses `HttpClient`. The UI design is a compact horizontal card to preserve space. All weather descriptions from the English APIs are translated locally into Spanish via a `translateDescription` mapping function before rendering.
- **Alternatives**: Using RxJS `BehaviorSubject` for state management was rejected in favor of `Signals`. Hardcoding cities in HTML was rejected in favor of the dynamic endpoints.

**4. Testing & Orchestration Strategy**
- **Rationale**: Strict minimum thresholds are enforced. The backend uses Jacoco (achieved >92% Line Coverage) and the frontend uses Karma/Istanbul (achieved >97% Line Coverage). A `healthcheck` in the Docker Compose ensures the PostgreSQL DB is fully ready before the backend starts, preventing initialization race conditions.

## Risks / Trade-offs

- **Risk: Different Data Formats from APIs** → **Mitigation**: The backend will normalize the response from both providers into a unified `CityWeatherResponse` DTO:
  - **WeatherAPI**: Maps `current.temp_c` -> `temperature` and `current.condition.text` -> `description`.
  - **OpenWeatherMap**: Maps `main.temp` -> `temperature` (metric units) and `weather[0].description` -> `description`.
- **Risk: API Rate Limits** → **Mitigation**: Handle 429 Too Many Requests status codes explicitly and trigger the fallback mechanism immediately.
