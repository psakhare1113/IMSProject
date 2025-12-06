package com.inventory.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "packages")
@Data
public class Package {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String customerName;
    private String date;
    private String status;
    private String description;
    private Double weight;
    private Double price;
    private String category;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
