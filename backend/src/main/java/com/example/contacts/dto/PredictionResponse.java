package com.example.contacts.dto;

import java.time.LocalDate;

public record PredictionResponse(
        String location,
        LocalDate date,
        int predictedVisitors,
        CityWeatherResponse forecast
) {}
