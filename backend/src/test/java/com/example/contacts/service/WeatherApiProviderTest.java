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

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class WeatherApiProviderTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private WeatherApiProvider weatherApiProvider;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(weatherApiProvider, "apiKey", "test-key");
        ReflectionTestUtils.setField(weatherApiProvider, "apiUrl", "http://test-url.com/{key}/{city}");
    }

    @Test
    void getWeatherForCity_Success() {
        Map<String, Object> mockResponse = Map.of(
            "current", Map.of(
                "temp_c", 25.5,
                "condition", Map.of("text", "Sunny")
            )
        );

        when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(mockResponse);

        CityWeatherResponse response = weatherApiProvider.getWeatherForCity("Lima", "Peru");

        assertEquals("Lima", response.city());
        assertEquals(25.5, response.temperature());
        assertEquals("Sunny", response.description());
        assertEquals("WeatherAPI", weatherApiProvider.getProviderName());
    }

    @Test
    void getWeatherForCity_InvalidResponse() {
        when(restTemplate.getForObject(anyString(), eq(Map.class))).thenReturn(Map.of());

        assertThrows(RuntimeException.class, () -> weatherApiProvider.getWeatherForCity("Lima", "Peru"));
    }
}
