package com.inventory.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import jakarta.persistence.Id;


@Data
@Entity
@Table(name = "payment_details")
public class PaymentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // <-- Primary Key (Required)

    private String paymentType; // e.g., Credit Card, UPI, NetBanking
    private String maskedCardNumber; // e.g., **** 1234
    private String transactionReference; // useful for refund

    @OneToOne
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnore
    private Customer customer;
}