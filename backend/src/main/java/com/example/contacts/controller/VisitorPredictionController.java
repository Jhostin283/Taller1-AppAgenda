package com.example.contacts.controller;

import com.example.contacts.dto.CityWeatherResponse;
import com.example.contacts.dto.PredictionResponse;
import com.example.contacts.service.ResilientWeatherService;
import com.example.contacts.service.VisitorPredictionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/prediction")
@CrossOrigin(origins = "http://localhost:4200")
public class VisitorPredictionController {

    private final VisitorPredictionService predictionService;
    private final ResilientWeatherService weatherService;

    public VisitorPredictionController(VisitorPredictionService predictionService, ResilientWeatherService weatherService) {
        this.predictionService = predictionService;
        this.weatherService = weatherService;
    }

    @GetMapping("/visitors")
    public ResponseEntity<PredictionResponse> predictVisitors(
            @RequestParam String country,
            @RequestParam String city,
            @RequestParam String location,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
            
        // 1. Fetch Forecast for the date
        CityWeatherResponse forecast = weatherService.getForecastForCity(country, city, date);
        
        // 2. Predict visitors based on location history and forecast
        PredictionResponse prediction = predictionService.predictVisitors(location, date, forecast);
        
        return ResponseEntity.ok(prediction);
    }
}
