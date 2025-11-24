package com.inventory.Service;

import com.inventory.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class IdReorderService {

    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public void reorderIds(String tableName, Long deletedId) {
        // Update all IDs greater than deleted ID to decrease by 1
        String updateSql = "UPDATE " + tableName + " SET id = id - 1 WHERE id > ?";
        jdbcTemplate.update(updateSql, deletedId);
        
        // Reset auto increment to the next available ID
        String maxIdSql = "SELECT COALESCE(MAX(id), 0) + 1 FROM " + tableName;
        Long nextId = jdbcTemplate.queryForObject(maxIdSql, Long.class);
        
        String alterSql = "ALTER TABLE " + tableName + " AUTO_INCREMENT = ?";
        jdbcTemplate.update(alterSql, nextId);
    }
}