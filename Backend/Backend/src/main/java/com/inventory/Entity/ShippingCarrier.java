package com.inventory.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "shipping_carriers")
@Data
public class ShippingCarrier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String logo;
    
    private String status = "Not Connected";
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
