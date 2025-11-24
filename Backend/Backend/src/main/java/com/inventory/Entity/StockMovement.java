package com.inventory.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "stock_movements")
public class StockMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantityChange; // + for addition, - for reduction
    private String reason;      // e.g. "PURCHASE", "ORDER_SOLD", "ORDER_CANCELLED", "RETURNED", "DAMAGED"
    private LocalDateTime movementDate;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String movementType;

    private int quantity;
    }

