package com.inventory.Repository;

import com.inventory.Entity.Customer;
import com.inventory.Entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByCustomerRefNumber(String customerRefNumber);

    @Query("SELECT c FROM Customer c JOIN c.shippingDetails s WHERE s.area = :area")
    List<Customer> findCustomersByArea(@Param("area") String area);


    @Query("SELECT COUNT(c) FROM Customer c JOIN c.shippingDetails s WHERE s.area = :area")
    long countCustomersByArea(@Param("area") String area);
}