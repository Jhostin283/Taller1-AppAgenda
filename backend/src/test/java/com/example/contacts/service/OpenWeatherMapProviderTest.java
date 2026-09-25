package com.example.contacts.service;

import com.example.contacts.dto.CityWeatherResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OpenWeatherMapProviderTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private OpenWeatherMapProvider openWeatherMapProvider;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(openWeatherMapProvider, "apiKey", "test-key");
        ReflectionTestUtils.setField(openWeatherMapProvider, "apiUrl", "http://test-url.com/{city}/{key}");
    }

    @Test
    void getWeatherForCity_Success() {
        Map<String, Object> mockResponse = Map.of(
            "main", Map.of("temp", 22.0),
            "weather", List.of(Map.of("description", "Clouds"))
        );

        when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(mockResponse);

        CityWeatherResponse response = openWeatherMapProvider.getWeatherForCity("Bogota", "Colombia");

        assertEquals("Bogota", response.city());
        assertEquals(22.0, response.temperature());
        assertEquals("Clouds", response.description());
        assertEquals("OpenWeatherMap", openWeatherMapProvider.getProviderName());
    }

    @Test
    void getWeatherForCity_InvalidResponse() {
        when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(Map.of());

        assertThrows(RuntimeException.class, () -> openWeatherMapProvider.getWeatherForCity("Bogota", "Colombia"));
    }
}
