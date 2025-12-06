package com.inventory.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "outgoing_products")
@Data
public class OutgoingProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String productName;
    private String customer;
    private Integer quantity;
    private String date;

    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
