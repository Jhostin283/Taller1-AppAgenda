package com.example.contacts.service;

import com.example.contacts.dto.CityWeatherResponse;
import com.example.contacts.dto.PredictionResponse;
import com.example.contacts.model.VisitorRecord;
import com.example.contacts.repository.VisitorHistoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class VisitorPredictionServiceTest {

    private VisitorHistoryRepository repository;
    private VisitorPredictionService service;

    @BeforeEach
    void setUp() {
        repository = Mockito.mock(VisitorHistoryRepository.class);
        service = new VisitorPredictionService(repository);
    }

    @Test
    void testPredictVisitors_WithExactHistoricalMatch() {
        LocalDate futureDate = LocalDate.of(2026, 10, 10);
        CityWeatherResponse forecast = new CityWeatherResponse("Tingo", "Peru", 25.0, "Soleado");

        List<VisitorRecord> mockHistory = List.of(
                new VisitorRecord(LocalDate.of(2025, 10, 11), "Mirador", "Soleado", 26.0, true, 500),
                new VisitorRecord(LocalDate.of(2025, 11, 15), "Mirador", "Despejado", 24.0, true, 600)
        );
        when(repository.getHistoricalData("Mirador")).thenReturn(mockHistory);

        PredictionResponse response = service.predictVisitors("Mirador", futureDate, forecast);
        assertEquals(550, response.predictedVisitors());
    }

    @Test
    void testPredictVisitors_WithNoHistoricalMatch_UsesFallbackFuerte() {
        LocalDate futureDate = LocalDate.of(2026, 10, 12);
        CityWeatherResponse forecast = new CityWeatherResponse("Tingo", "Peru", 20.0, "Lluvia fuerte");
        when(repository.getHistoricalData("Mirador")).thenReturn(List.of());
        PredictionResponse response = service.predictVisitors("Mirador", futureDate, forecast);
        assertEquals(30, response.predictedVisitors()); // 150 * 0.2 = 30
    }

    @Test
    void testPredictVisitors_WithNoHistoricalMatch_UsesFallbackSol() {
        LocalDate futureDate = LocalDate.of(2026, 10, 12); // Weekday
        CityWeatherResponse forecast = new CityWeatherResponse("Tingo", "Peru", 20.0, "Sol radiante");
        when(repository.getHistoricalData("Mirador")).thenReturn(List.of());
        PredictionResponse response = service.predictVisitors("Mirador", futureDate, forecast);
        assertEquals(200, response.predictedVisitors()); // 150 * 1.3 = 195 -> 200
    }

    @Test
    void testPredictVisitors_WithNoHistoricalMatch_UsesFallbackLluvia() {
        LocalDate futureDate = LocalDate.of(2026, 10, 12); // Weekday
        CityWeatherResponse forecast = new CityWeatherResponse("Tingo", "Peru", 20.0, "Llovizna");
        when(repository.getHistoricalData("Mirador")).thenReturn(List.of());
        PredictionResponse response = service.predictVisitors("Mirador", futureDate, forecast);
        assertEquals(80, response.predictedVisitors()); // 150 * 0.5 = 75 -> 80
    }
    
    @Test
    void testPredictVisitors_WithNoHistoricalMatch_UsesFallbackNormal() {
        LocalDate futureDate = LocalDate.of(2026, 10, 10); // Weekend
        CityWeatherResponse forecast = new CityWeatherResponse("Tingo", "Peru", 20.0, "Nublado");
        when(repository.getHistoricalData("Mirador")).thenReturn(List.of());
        PredictionResponse response = service.predictVisitors("Mirador", futureDate, forecast);
        assertEquals(400, response.predictedVisitors()); // 400 * 1.0 = 400
    }
}
