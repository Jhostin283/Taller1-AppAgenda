package com.example.contacts.service;

import com.example.contacts.dto.CityWeatherResponse;
import com.example.contacts.dto.PredictionResponse;
import com.example.contacts.model.VisitorRecord;
import com.example.contacts.repository.VisitorHistoryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.OptionalDouble;

@Service
public class VisitorPredictionService {

    private final VisitorHistoryRepository historyRepository;

    public VisitorPredictionService(VisitorHistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    public PredictionResponse predictVisitors(String location, LocalDate futureDate, CityWeatherResponse forecast) {
        List<VisitorRecord> history = historyRepository.getHistoricalData(location);
        boolean isWeekend = futureDate.getDayOfWeek().getValue() >= 6;
        
        // 1. Filtrar el historial por dÃ­as similares (mismo tipo de dÃ­a: fin de semana o semana)
        // y con clima similar.
        List<VisitorRecord> similarDays = history.stream()
                .filter(r -> r.isWeekend() == isWeekend)
                .filter(r -> isWeatherSimilar(r.weatherCondition(), forecast.description()))
                .toList();
                
        int predictedVisitors;
        
        if (!similarDays.isEmpty()) {
            // Algoritmo: Promedio de visitantes en dÃ­as histÃ³ricos idÃ©nticos
            OptionalDouble average = similarDays.stream()
                    .mapToInt(VisitorRecord::visitorCount)
                    .average();
            predictedVisitors = (int) average.orElse(0);
        } else {
            // Fallback: Si no hay historial exacto, calculamos un baseline heurÃ­stico
            int base = isWeekend ? 400 : 150;
            double multiplier = 1.0;
            String desc = forecast.description().toLowerCase();
            
            if (desc.contains("sol") || desc.contains("despejado")) multiplier = 1.3;
            else if (desc.contains("fuerte") || desc.contains("tormenta")) multiplier = 0.2;
            else if (desc.contains("lluvia") || desc.contains("llovizna")) multiplier = 0.5;
            
            predictedVisitors = (int) (base * multiplier);
        }

        // Redondear a la decena mÃ¡s cercana (ej: 97 -> 100, 104 -> 100) para que parezca una estimaciÃ³n
        predictedVisitors = Math.round(predictedVisitors / 10.0f) * 10;

        return new PredictionResponse(location, futureDate, predictedVisitors, forecast);
    }

    private boolean isWeatherSimilar(String historicalWeather, String forecastWeather) {
        String hist = historicalWeather.toLowerCase();
        String fore = forecastWeather.toLowerCase();
        
        if (hist.contains("lluvia") && fore.contains("lluvia")) return true;
        if ((hist.contains("sol") || hist.contains("soleado") || hist.contains("despejado")) && 
            (fore.contains("sol") || fore.contains("soleado") || fore.contains("despejado"))) return true;
        if ((hist.contains("nub") || hist.contains("cubierto")) && (fore.contains("nub") || fore.contains("cubierto"))) return true;
        
        return hist.equals(fore);
    }
}

