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
import static org.junit.jupiter.api.Assertions.assertTrue;
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
        // Arrange
        LocalDate futureDate = LocalDate.of(2026, 10, 10); // A Saturday (Weekend)
        CityWeatherResponse forecast = new CityWeatherResponse("Tingo Maria", "Peru", 25.0, "Soleado");

        // Mock history with similar days
        List<VisitorRecord> mockHistory = List.of(
                new VisitorRecord(LocalDate.of(2025, 10, 11), "Mirador", "Soleado", 26.0, true, 500),
                new VisitorRecord(LocalDate.of(2025, 11, 15), "Mirador", "Despejado", 24.0, true, 600)
        );
        when(repository.getHistoricalData("Mirador")).thenReturn(mockHistory);

        // Act
        PredictionResponse response = service.predictVisitors("Mirador", futureDate, forecast);

        // Assert
        assertEquals(550, response.predictedVisitors(), "Should average exactly the historical weekend sunny days");
        assertEquals("Mirador", response.location());
    }

    @Test
    void testPredictVisitors_WithNoHistoricalMatch_UsesFallback() {
        // Arrange
        LocalDate futureDate = LocalDate.of(2026, 10, 12); // A Monday (Weekday)
        CityWeatherResponse forecast = new CityWeatherResponse("Tingo Maria", "Peru", 20.0, "Lluvia fuerte");

        when(repository.getHistoricalData("Mirador")).thenReturn(List.of()); // No history

        // Act
        PredictionResponse response = service.predictVisitors("Mirador", futureDate, forecast);

        // Assert
        // Base for weekday is 150. Heavy rain multiplier is 0.2. 150 * 0.2 = 30
        assertEquals(30, response.predictedVisitors(), "Should use fallback heuristic logic for heavy rain weekday");
    }
}
