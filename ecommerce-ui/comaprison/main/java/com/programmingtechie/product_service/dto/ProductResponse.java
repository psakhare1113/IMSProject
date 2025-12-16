package com.programmingtechie.product_service.dto;
import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;

}
