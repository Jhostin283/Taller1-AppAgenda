package com.example.contacts.controller;

import com.example.contacts.dto.CityWeatherResponse;
import com.example.contacts.dto.PredictionResponse;
import com.example.contacts.service.ResilientWeatherService;
import com.example.contacts.service.VisitorPredictionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class VisitorPredictionControllerTest {

    private VisitorPredictionService predictionService;
    private ResilientWeatherService weatherService;
    private VisitorPredictionController controller;

    @BeforeEach
    void setUp() {
        predictionService = Mockito.mock(VisitorPredictionService.class);
        weatherService = Mockito.mock(ResilientWeatherService.class);
        controller = new VisitorPredictionController(predictionService, weatherService);
    }

    @Test
    void testPredictVisitorsEndpoint() {
        // Arrange
        String country = "Peru";
        String city = "Tingo Maria";
        String location = "Mirador";
        LocalDate date = LocalDate.of(2026, 10, 15);
        
        CityWeatherResponse mockForecast = new CityWeatherResponse(city, country, 25.0, "Sunny");
        PredictionResponse mockPrediction = new PredictionResponse(location, date, 450, mockForecast);
        
        when(weatherService.getForecastForCity(country, city, date)).thenReturn(mockForecast);
        when(predictionService.predictVisitors(location, date, mockForecast)).thenReturn(mockPrediction);

        // Act
        ResponseEntity<PredictionResponse> response = controller.predictVisitors(country, city, location, date);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        assertEquals(450, response.getBody().predictedVisitors());
    }
}
