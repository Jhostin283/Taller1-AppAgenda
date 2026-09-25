## Purpose
Enables users to select a country and subsequently a specific city to view its current weather information, avoiding data overload.

## ADDED Requirements

### Requirement: Country Selection
The system SHALL provide a way for the user to select a country from a predefined list.

#### Scenario: User selects a country
- **WHEN** the user selects a country from the selector
- **THEN** the system fetches and populates a secondary selector with the reference cities for that specific country.

### Requirement: City Selection and Weather Display
The system SHALL allow the user to select a specific city from the populated list and display its weather data.

#### Scenario: Displaying specific city weather
- **WHEN** the user selects a specific city and requests the weather
- **THEN** the system fetches and displays the current weather conditions (temperature, description) exclusively for that city.

### Requirement: Spanish UI and Translations
The system SHALL present all weather information and UI elements in Spanish.

#### Scenario: Translating weather API responses
- **GIVEN** the external weather API returns descriptions in English (e.g., "Light rain shower")
- **WHEN** the weather data is presented to the user
- **THEN** the system translates these descriptions into Spanish (e.g., "Chubasco Ligero") and displays the appropriate weather icon.

### Requirement: Compact Horizontal Layout
The system SHALL display the selection controls and weather data in a compact, horizontal layout to preserve vertical screen space in the main agenda view.

### Requirement: Weather API Data Normalization
The backend SHALL normalize the payload from different providers into a single predictable format containing:
- `city` (String)
- `country` (String)
- `temperature` (Double, in Celsius)
- `description` (String, condition in English)

#### Provider-specific mappings & JSON Payloads:

**Rationale for Selected Fields:** These specific fields are the most important weather attributes provided by the API for our use case. We strictly extract only these core attributes (temperature and condition text) because they are essential to inform the user, while intentionally omitting secondary data (like wind or humidity) to minimize the backend memory footprint, reduce network payload size, and strictly adhere to the UI's requirement for a simple, compact horizontal weather card.

**1. WeatherAPI (Primary)**
- Temperature is extracted from: `current.temp_c`
- Description is extracted from: `current.condition.text`
- **Expected Payload Snippet:**
  ```json
  {
    "location": { "name": "London", "country": "UK" },
    "current": {
      "temp_c": 10.5,
      "condition": { "text": "Partly cloudy", "icon": "..." }
    }
  }
  ```

**2. OpenWeatherMap (Secondary)**
- Temperature is extracted from: `main.temp` (requested in metric units)
- Description is extracted from: `weather[0].description`
- **Expected Payload Snippet:**
  ```json
  {
    "weather": [
      { "id": 803, "main": "Clouds", "description": "broken clouds" }
    ],
    "main": {
      "temp": 10.5,
      "feels_like": 9.2,
      "humidity": 81
    },
    "name": "London",
    "sys": { "country": "GB" }
  }
  ```
