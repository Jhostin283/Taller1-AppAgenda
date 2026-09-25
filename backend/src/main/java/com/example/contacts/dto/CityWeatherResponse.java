package com.example.contacts.dto;

public record CityWeatherResponse(
        String city,
        String country,
        double temperature,
        String description
) {}
