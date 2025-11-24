package com.inventory.Repository;
import com.inventory.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByCustomer_CustomerRefNumber(String customerRefNumber);

    List<Orders> findByCustomer_CustomerRefNumberAndStatus(String customerRefNumber, String status);

    // Find orders between startDate and endDate
    List<Orders> findByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    List<Orders> findAll();
}
