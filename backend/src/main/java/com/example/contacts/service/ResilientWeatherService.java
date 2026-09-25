package com.example.contacts.service;

import com.example.contacts.dto.CityWeatherResponse;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ResilientWeatherService {

    private static final Logger logger = LoggerFactory.getLogger(ResilientWeatherService.class);
    private final WeatherApiProvider primaryProvider;
    private final OpenWeatherMapProvider secondaryProvider;

    // Lista de referencia inicial (expandida). Las APIs reales soportan miles de ciudades.
    private static final Map<String, List<String>> COUNTRY_CITIES = new HashMap<>();
    static {
        COUNTRY_CITIES.put("Peru", List.of("Lima", "Arequipa", "Cusco", "Trujillo", "Piura", "Iquitos", "Huanuco", "Tingo Maria"));
        COUNTRY_CITIES.put("Colombia", List.of("Bogota", "Medellin", "Cali", "Cartagena", "Barranquilla"));
        COUNTRY_CITIES.put("Mexico", List.of("Mexico City", "Guadalajara", "Monterrey", "Cancun", "Tijuana"));
        COUNTRY_CITIES.put("Argentina", List.of("Buenos Aires", "Cordoba", "Rosario", "Mendoza", "Mar del Plata"));
        COUNTRY_CITIES.put("Chile", List.of("Santiago", "Valparaiso", "Concepcion", "Antofagasta"));
        COUNTRY_CITIES.put("Ecuador", List.of("Quito", "Guayaquil", "Cuenca"));
        COUNTRY_CITIES.put("Bolivia", List.of("La Paz", "Santa Cruz", "Cochabamba"));
        COUNTRY_CITIES.put("Espana", List.of("Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza"));
        COUNTRY_CITIES.put("Estados Unidos", List.of("New York", "Los Angeles", "Chicago", "Miami", "Houston"));
    }

    public ResilientWeatherService(WeatherApiProvider primaryProvider, OpenWeatherMapProvider secondaryProvider) {
        this.primaryProvider = primaryProvider;
        this.secondaryProvider = secondaryProvider;
    }

    public List<String> getAvailableCountries() {
        return new ArrayList<>(COUNTRY_CITIES.keySet());
    }

    public List<String> getCitiesForCountry(String country) {
        return COUNTRY_CITIES.getOrDefault(country, List.of());
    }

    public CityWeatherResponse getWeatherForCity(String country, String city) {
        try {
            logger.info("Attempting to fetch weather for {} using primary provider", city);
            return primaryProvider.getWeatherForCity(city, country);
        } catch (Exception e) {
            logger.warn("Primary provider failed for city: {}. Reason: {}. Falling back to secondary...", city, e.getMessage());
            try {
                return secondaryProvider.getWeatherForCity(city, country);
            } catch (Exception ex) {
                logger.error("Secondary provider also failed for city: {}. Both providers down.", city);
                throw new RuntimeException("Service unavailable: Both weather providers failed", ex);
            }
        }
    }

    public CityWeatherResponse getForecastForCity(String country, String city, java.time.LocalDate date) {
        try {
            logger.info("Attempting to fetch forecast for {} on {} using primary provider", city, date);
            return primaryProvider.getForecastForCity(city, country, date);
        } catch (Exception e) {
            logger.warn("Primary forecast provider failed for city: {}. Reason: {}. Falling back to secondary...", city, e.getMessage());
            try {
                return secondaryProvider.getForecastForCity(city, country, date);
            } catch (Exception ex) {
                logger.error("Secondary forecast provider also failed for city: {}.", city);
                throw new RuntimeException("Service unavailable: Both forecast providers failed", ex);
            }
        }
    }
}
