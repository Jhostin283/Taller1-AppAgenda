package com.example.contacts.service;

import com.example.contacts.dto.CityWeatherResponse;

public interface WeatherProviderService {
    CityWeatherResponse getWeatherForCity(String city, String country);
    CityWeatherResponse getForecastForCity(String city, String country, java.time.LocalDate date);
    String getProviderName();
}
