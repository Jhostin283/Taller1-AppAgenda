package com.example.contacts.model;

import java.time.LocalDate;

public record VisitorRecord(
        LocalDate date,
        String location,
        String weatherCondition,
        double temperature,
        boolean isWeekend,
        int visitorCount
) {}
