package com.example.contacts.controller;

import com.example.contacts.dto.CityWeatherResponse;
import com.example.contacts.service.ResilientWeatherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/weather")
public class WeatherController {

    private final ResilientWeatherService resilientWeatherService;

    public WeatherController(ResilientWeatherService resilientWeatherService) {
        this.resilientWeatherService = resilientWeatherService;
    }

    @GetMapping("/countries")
    public ResponseEntity<List<String>> getAvailableCountries() {
        return ResponseEntity.ok(resilientWeatherService.getAvailableCountries());
    }

    @GetMapping("/cities/{country}")
    public ResponseEntity<List<String>> getCitiesForCountry(@PathVariable String country) {
        return ResponseEntity.ok(resilientWeatherService.getCitiesForCountry(country));
    }

    @GetMapping("/{country}/{city}")
    public ResponseEntity<?> getWeatherForCity(@PathVariable String country, @PathVariable String city) {
        try {
            CityWeatherResponse response = resilientWeatherService.getWeatherForCity(country, city);
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(ex.getMessage());
        }
    }
}
