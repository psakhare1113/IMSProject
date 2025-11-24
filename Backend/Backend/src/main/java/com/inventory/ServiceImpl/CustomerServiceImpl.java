package com.inventory.ServiceImpl;

import com.inventory.DTO.CustomerRequestDTO;
import com.inventory.Entity.Customer;
import com.inventory.Entity.PaymentDetails;
import com.inventory.Entity.ShippingDetails;
import com.inventory.Repository.CustomerRepository;
import com.inventory.Service.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Customer createCustomer(CustomerRequestDTO customerRequestDTO) {
        // Check if customerRefNumber already exists
        Optional<Customer> existingCustomer = customerRepository.findByCustomerRefNumber(customerRequestDTO.getCustomerRefNumber());
        if (existingCustomer.isPresent()) {
            throw new RuntimeException("Customer with this reference number already exists");
        }

        Customer customer = new Customer();
        customer.setCustomerRefNumber(customerRequestDTO.getCustomerRefNumber());
        customer.setName(customerRequestDTO.getName());
        customer.setPhoneNumber(customerRequestDTO.getPhoneNumber());

        // ---- ShippingDetails ----
        ShippingDetails shippingDetails = new ShippingDetails();
        shippingDetails.setAddress1(customerRequestDTO.getShippingDetails().getAddress1());
        shippingDetails.setAddress2(customerRequestDTO.getShippingDetails().getAddress2());
        shippingDetails.setArea(customerRequestDTO.getShippingDetails().getArea());
        shippingDetails.setCustomer(customer);

        customer.setShippingDetails(shippingDetails);

// ---- PaymentDetails ----
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setPaymentType(customerRequestDTO.getPaymentDetails().getPaymentType());
        paymentDetails.setMaskedCardNumber(customerRequestDTO.getPaymentDetails().getMaskedCardNumber());
        paymentDetails.setTransactionReference(customerRequestDTO.getPaymentDetails().getTransactionReference());
        paymentDetails.setCustomer(customer);

        customer.setPaymentDetails(paymentDetails);

        return customerRepository.save(customer);
    }

    @Override
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + id));
    }

    @Override
    public Customer getCustomerByRefNumber(String customerRefNumber) {
        return customerRepository.findByCustomerRefNumber(customerRefNumber)
                .orElseThrow(() -> new RuntimeException("Customer not found with Reference Number: " + customerRefNumber));
    }


    public List<Customer> getCustomersByArea(String area) {
        return customerRepository.findCustomersByArea(area);
    }
    public long getCustomerCountByArea(String area) {
        return customerRepository.countCustomersByArea(area);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer updateCustomer(Long id, CustomerRequestDTO customerRequestDTO) {
        Customer customer = getCustomerById(id);
        customer.setName(customerRequestDTO.getName());
        customer.setPhoneNumber(customerRequestDTO.getPhoneNumber());
        
        if (customerRequestDTO.getShippingDetails() != null) {
            ShippingDetails shippingDetails = customer.getShippingDetails();
            if (shippingDetails == null) {
                shippingDetails = new ShippingDetails();
                shippingDetails.setCustomer(customer);
            }
            shippingDetails.setAddress1(customerRequestDTO.getShippingDetails().getAddress1());
            shippingDetails.setAddress2(customerRequestDTO.getShippingDetails().getAddress2());
            shippingDetails.setArea(customerRequestDTO.getShippingDetails().getArea());
            customer.setShippingDetails(shippingDetails);
        }
        
        return customerRepository.save(customer);
    }

    @Override
    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new RuntimeException("Customer not found with ID: " + id);
        }
        customerRepository.deleteById(id);
    }

}