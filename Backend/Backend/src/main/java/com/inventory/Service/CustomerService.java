package com.inventory.Service;


import com.inventory.DTO.CustomerRequestDTO;
import com.inventory.Entity.Customer;

import java.util.List;

public interface CustomerService {
    Customer createCustomer(CustomerRequestDTO customerRequestDTO);
    Customer getCustomerById(Long id);
    Customer getCustomerByRefNumber(String customerRefNumber);
    List<Customer> getAllCustomers();
    Customer updateCustomer(Long id, CustomerRequestDTO customerRequestDTO);
    void deleteCustomer(Long id);
    List<Customer> getCustomersByArea(String area);
    long getCustomerCountByArea(String area);
}