package com.inventory.Controller;

import com.inventory.DTO.CustomerRequestDTO;
import com.inventory.Entity.Customer;
import com.inventory.Service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:3000")
    public class CustomerController {

        private final CustomerService customerService;

        public CustomerController(CustomerService customerService) {
            this.customerService = customerService;
        }

        // Create a new customer
        @PostMapping
        public Customer createNewCustomer(@RequestBody CustomerRequestDTO customerRequestDTO) {
            return customerService.createCustomer(customerRequestDTO);
        }

        // Get customer by ID
        @GetMapping("/{id}")
        public Customer getCustomerById(@PathVariable Long id) {
            return customerService.getCustomerById(id);
        }

        // Get customer by Reference Number
        @GetMapping("/ref/{customerRefNumber}")
        public Customer getCustomerByRefNumber(@PathVariable String customerRefNumber) {
            return customerService.getCustomerByRefNumber(customerRefNumber);
        }

    // GET customers by area
    @GetMapping("/area/{area}")
    public ResponseEntity<List<Customer>> getCustomersByArea(@PathVariable String area) {
        List<Customer> customers = customerService.getCustomersByArea(area);
        return ResponseEntity.ok(customers);
    }

    // GET count of customers in an area
    @GetMapping("/area/{area}/count")
    public ResponseEntity<Map<String, Object>> getCustomerCountByArea(@PathVariable String area) {
        long count = customerService.getCustomerCountByArea(area);

        Map<String, Object> response = new HashMap<>();
        response.put("area", area);
        response.put("customerCount", count);

        return ResponseEntity.ok(response);
    }

    // Get all customers
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // Update customer
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody CustomerRequestDTO customerRequestDTO) {
        return ResponseEntity.ok(customerService.updateCustomer(id, customerRequestDTO));
    }

    // Delete customer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.ok().build();
    }

}
