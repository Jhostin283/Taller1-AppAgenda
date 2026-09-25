package com.example.contacts.service;

import com.example.contacts.dto.CityWeatherResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ResilientWeatherServiceTest {

    @Mock
    private WeatherApiProvider primaryProvider;

    @Mock
    private OpenWeatherMapProvider secondaryProvider;

    @InjectMocks
    private ResilientWeatherService resilientWeatherService;

    @Test
    void getCitiesForCountry() {
        List<String> cities = resilientWeatherService.getCitiesForCountry("Peru");
        assertFalse(cities.isEmpty());
        assertTrue(cities.contains("Lima"));
    }

    @Test
    void getWeatherForCity_PrimarySuccess() {
        when(primaryProvider.getWeatherForCity("Lima", "Peru"))
            .thenReturn(new CityWeatherResponse("Lima", "Peru", 20.0, "Clear"));

        CityWeatherResponse response = resilientWeatherService.getWeatherForCity("Peru", "Lima");

        assertNotNull(response);
        assertEquals("Lima", response.city());
        verify(primaryProvider, times(1)).getWeatherForCity("Lima", "Peru");
        verifyNoInteractions(secondaryProvider);
    }

    @Test
    void getWeatherForCity_FallbackToSecondary() {
        when(primaryProvider.getWeatherForCity("Bogota", "Colombia"))
            .thenThrow(new RuntimeException("API down"));
        
        when(secondaryProvider.getWeatherForCity("Bogota", "Colombia"))
            .thenReturn(new CityWeatherResponse("Bogota", "Colombia", 15.0, "Rainy"));

        CityWeatherResponse response = resilientWeatherService.getWeatherForCity("Colombia", "Bogota");

        assertNotNull(response);
        assertEquals("Rainy", response.description());
        verify(primaryProvider, times(1)).getWeatherForCity("Bogota", "Colombia");
        verify(secondaryProvider, times(1)).getWeatherForCity("Bogota", "Colombia");
    }

    @Test
    void getWeatherForCity_BothFail() {
        when(primaryProvider.getWeatherForCity("Mexico City", "Mexico"))
            .thenThrow(new RuntimeException("API down"));
        
        when(secondaryProvider.getWeatherForCity("Mexico City", "Mexico"))
            .thenThrow(new RuntimeException("Secondary API down"));

        assertThrows(RuntimeException.class, () -> resilientWeatherService.getWeatherForCity("Mexico", "Mexico City"));
    }

}
