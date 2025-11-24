package com.inventory.DTO;

import lombok.Data;

@Data
public class CustomerRequestDTO {
    private String customerRefNumber;  // Unique identifier like CUST-8f3b1c9a
    private String name;
    private String phoneNumber;
    private ShippingDetailsDTO shippingDetails;
    private PaymentDetailsDTO paymentDetails;

}
