package com.example.contacts.service;

import com.example.contacts.dto.CityWeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class OpenWeatherMapProvider implements WeatherProviderService {

    private final RestTemplate restTemplate;
    
    @Value("${weather.api.openweathermap.key}")
    private String apiKey;
    
    @Value("${weather.api.openweathermap.url}")
    private String apiUrl;

    public OpenWeatherMapProvider(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @SuppressWarnings("unchecked")
    @Override
    public CityWeatherResponse getWeatherForCity(String city, String country) {
        String url = apiUrl.replace("{key}", apiKey).replace("{city}", city);
        
        // OpenWeatherMap JSON like:
        // { "main": { "temp": 20.0 }, "weather": [ { "description": "clear sky" } ] }
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        
        if (response == null || !response.containsKey("main") || !response.containsKey("weather")) {
            throw new RuntimeException("Invalid response from OpenWeatherMap");
        }
        
        Map<String, Object> main = (Map<String, Object>) response.get("main");
        double temp = Double.parseDouble(main.get("temp").toString());
        
        List<Map<String, Object>> weatherList = (List<Map<String, Object>>) response.get("weather");
        String description = weatherList.get(0).get("description").toString();
        
        return new CityWeatherResponse(city, country, temp, description);
    }

    @Override
    public CityWeatherResponse getForecastForCity(String city, String country, java.time.LocalDate date) {
        // Prototype: Reusing current weather to simulate forecast for the MVP
        return getWeatherForCity(city, country);
    }

    @Override
    public String getProviderName() {
        return "OpenWeatherMap";
    }
}
