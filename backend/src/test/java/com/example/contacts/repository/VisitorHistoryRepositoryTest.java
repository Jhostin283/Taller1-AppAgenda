package com.example.contacts.repository;

import com.example.contacts.model.VisitorRecord;
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class VisitorHistoryRepositoryTest {

    @Test
    void testInitAndGetData() {
        VisitorHistoryRepository repository = new VisitorHistoryRepository();
        repository.initMockData();
        List<VisitorRecord> data = repository.getHistoricalData("Mirador San Francisco");
        assertNotNull(data);
        assertFalse(data.isEmpty());
    }
}
