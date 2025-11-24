package com.inventory.DTO;
import lombok.Data;

import java.util.List;

@Data
public class OrderItemDTO {
    private String productName;
    private int quantity;
    private double price;
}