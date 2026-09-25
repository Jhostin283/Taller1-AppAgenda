package com.example.contacts.controller;

import com.example.contacts.dto.CityWeatherResponse;
import com.example.contacts.service.ResilientWeatherService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(WeatherController.class)
class WeatherControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ResilientWeatherService resilientWeatherService;

    @Test
    void getCitiesForCountry_Success() throws Exception {
        when(resilientWeatherService.getCitiesForCountry(eq("Peru")))
            .thenReturn(List.of("Lima", "Cusco", "Arequipa"));

        mockMvc.perform(get("/api/weather/cities/Peru"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0]").value("Lima"));
    }

    @Test
    void getWeatherForCity_Success() throws Exception {
        when(resilientWeatherService.getWeatherForCity(eq("Peru"), eq("Lima")))
            .thenReturn(new CityWeatherResponse("Lima", "Peru", 20.0, "Sunny"));

        mockMvc.perform(get("/api/weather/Peru/Lima"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.city").value("Lima"))
            .andExpect(jsonPath("$.temperature").value(20.0));
    }

    @Test
    void getWeatherForCity_ServiceUnavailable() throws Exception {
        when(resilientWeatherService.getWeatherForCity(eq("Peru"), eq("Lima")))
            .thenThrow(new RuntimeException("Service unavailable"));

        mockMvc.perform(get("/api/weather/Peru/Lima"))
            .andExpect(status().isServiceUnavailable())
            .andExpect(content().string("Service unavailable"));
    }
}
