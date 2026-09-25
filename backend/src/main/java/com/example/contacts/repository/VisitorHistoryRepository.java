package com.example.contacts.repository;

import com.example.contacts.model.VisitorRecord;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Repository
public class VisitorHistoryRepository {

    private final List<VisitorRecord> historicalData = new ArrayList<>();
    private final Random random = new Random(12345); // Fixed seed for reproducible data

    @PostConstruct
    public void initMockData() {
        LocalDate startDate = LocalDate.now().minusYears(2); // 2 years of data
        String location = "Mirador San Francisco";

        for (int i = 0; i < 730; i++) {
            LocalDate currentDate = startDate.plusDays(i);
            boolean isWeekend = currentDate.getDayOfWeek().getValue() >= 6;
            
            // Random weather conditions
            String[] conditions = {"Soleado", "Parcialmente nublado", "Nublado", "Cubierto", "Lluvia ligera", "Lluvia fuerte"};
            String weather = conditions[random.nextInt(conditions.length)];
            
            // Base temperature for Tingo Maria (warm, tropical)
            double temp = 22.0 + (random.nextDouble() * 10);
            if (weather.contains("Lluvia") || weather.contains("lluvia")) {
                temp -= 3.0;
            }

            // Calculate visitors
            int baseVisitors = isWeekend ? 400 : 150;
            
            // Weather multipliers
            double multiplier = 1.0;
            if (weather.equals("Soleado")) multiplier = 1.3;
            if (weather.equals("Parcialmente nublado")) multiplier = 1.1;
            if (weather.equals("Lluvia ligera")) multiplier = 0.6;
            if (weather.equals("Lluvia fuerte")) multiplier = 0.2;
            
            int visitors = (int) (baseVisitors * multiplier);
            // Add some randomness (+- 10%)
            visitors = visitors + (int)(visitors * (random.nextDouble() * 0.2 - 0.1));

            historicalData.add(new VisitorRecord(
                    currentDate,
                    location,
                    weather,
                    Math.round(temp * 10.0) / 10.0,
                    isWeekend,
                    Math.max(0, visitors)
            ));
        }
    }

    public List<VisitorRecord> getHistoricalData(String location) {
        return historicalData.stream()
                .filter(record -> record.location().equalsIgnoreCase(location))
                .collect(Collectors.toList());
    }
}
