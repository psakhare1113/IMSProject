package com.inventory.DTO;

import lombok.Data;

@Data
public class PaymentDetailsDTO {
    private String paymentType;
    private String maskedCardNumber;
    private String transactionReference;

}
