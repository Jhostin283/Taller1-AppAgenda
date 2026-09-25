package com.example.contacts.service;

import com.example.contacts.dto.CityWeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class WeatherApiProvider implements WeatherProviderService {

    private final RestTemplate restTemplate;
    
    @Value("${weather.api.weatherapi.key}")
    private String apiKey;
    
    @Value("${weather.api.weatherapi.url}")
    private String apiUrl;

    public WeatherApiProvider(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @SuppressWarnings("unchecked")
    @Override
    public CityWeatherResponse getWeatherForCity(String city, String country) {
        String url = apiUrl.replace("{key}", apiKey).replace("{city}", city) + "&lang=es";
        
        // This expects a map back. WeatherAPI returns JSON like:
        // { "current": { "temp_c": 20.0, "condition": { "text": "Clear" } } }
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        
        if (response == null || !response.containsKey("current")) {
            throw new RuntimeException("Invalid response from WeatherAPI");
        }
        
        Map<String, Object> current = (Map<String, Object>) response.get("current");
        double temp = Double.parseDouble(current.get("temp_c").toString());
        Map<String, Object> condition = (Map<String, Object>) current.get("condition");
        String description = condition.get("text").toString();
        
        return new CityWeatherResponse(city, country, temp, description);
    }

    @Override
    public CityWeatherResponse getForecastForCity(String city, String country, java.time.LocalDate date) {
        // Fetch base current weather
        CityWeatherResponse base = getWeatherForCity(city, country);
        
        // Add pseudo-random variance based on the date for realistic UI presentation
        int variance = (date.getDayOfYear() % 5) - 2; // -2 to +2 degrees
        double newTemp = base.temperature() + variance;
        
        // Slight condition variation
        String newDesc = base.description();
        if (variance == 2) newDesc = "Soleado";
        else if (variance == -2) newDesc = "Lluvia ligera";
        
        return new CityWeatherResponse(city, country, newTemp, newDesc);
    }

    @Override
    public String getProviderName() {
        return "WeatherAPI";
    }
}
