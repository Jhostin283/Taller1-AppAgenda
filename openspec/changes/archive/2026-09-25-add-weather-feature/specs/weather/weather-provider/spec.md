## Purpose
Provides a robust backend service to fetch weather data with built-in redundancy using multiple third-party providers.

## ADDED Requirements

### Requirement: Primary Weather Data Retrieval
The system SHALL attempt to fetch weather data from the primary provider (WeatherAPI) for a given city.

#### Scenario: Primary provider succeeds
- **WHEN** a request for city weather is made and the primary provider is available
- **THEN** the system returns the weather data from the primary provider

### Requirement: Secondary Weather Data Fallback
The system SHALL fallback to a secondary provider (OpenWeatherMap) if the primary provider fails or returns an error.

#### Scenario: Primary provider fails
- **WHEN** a request for city weather is made and the primary provider returns an error or times out
- **THEN** the system requests the data from the secondary provider and returns it

#### Scenario: Both providers fail
- **WHEN** both the primary and secondary providers fail to return valid weather data
- **THEN** the system returns an appropriate error message indicating that weather data is currently unavailable
