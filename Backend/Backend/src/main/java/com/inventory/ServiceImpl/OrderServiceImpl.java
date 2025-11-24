package com.inventory.ServiceImpl;
import com.inventory.DTO.OrderRequestDTO;
import com.inventory.Entity.*;
import com.inventory.Repository.*;
import com.inventory.Response.OrderFilterResponse;
import com.inventory.Response.OrderResponse;
import com.inventory.Service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;
    private final StockMovementRepository stockMovementRepository;

    public OrderServiceImpl(OrderRepository orderRepository, CustomerRepository customerRepository,
                           ProductRepository productRepository, OrderItemRepository orderItemRepository,
                           StockMovementRepository stockMovementRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.orderItemRepository = orderItemRepository;
        this.stockMovementRepository = stockMovementRepository;
    }

    @Override
    public Orders createOrder(String customerRefNumber, OrderRequestDTO orderRequest) {
        try {
            System.out.println("Step 1: Finding customer with ref: " + customerRefNumber);
            Customer customer = customerRepository.findByCustomerRefNumber(customerRefNumber)
                    .orElseThrow(() -> new RuntimeException("Customer not found with ref: " + customerRefNumber));
            System.out.println("Step 2: Customer found: " + customer.getName());

            Orders order = new Orders();
            order.setStatus("NEW");
            order.setOrderDate(LocalDateTime.now());
            order.setCustomer(customer);
            System.out.println("Step 3: Order object created");
        
            // Calculate total amount
            System.out.println("Step 4: Calculating total amount for " + orderRequest.getOrderItems().size() + " items");
            double totalAmount = orderRequest.getOrderItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
            order.setTotalAmount(totalAmount);
            System.out.println("Step 5: Total amount calculated: " + totalAmount);

            System.out.println("Step 6: Processing order items");
            List<OrderItem> items = orderRequest.getOrderItems().stream().map(itemDTO -> {
                System.out.println("Processing item: " + itemDTO.getProductName());
                OrderItem item = new OrderItem();
                item.setProductName(itemDTO.getProductName());
                item.setQuantity(itemDTO.getQuantity());
                item.setPrice(itemDTO.getPrice());
                item.setStatus("NEW");
                item.setOrders(order);
                
                // Find and set the actual product (required)
                List<Product> products = productRepository.findByNameIgnoreCase(itemDTO.getProductName());
                if (products.isEmpty()) {
                    throw new RuntimeException("Product not found: " + itemDTO.getProductName());
                }
                Product product = products.get(0);
                item.setProduct(product);
                System.out.println("Product found and set: " + product.getName());
                
                return item;
            }).collect(Collectors.toList());
            System.out.println("Step 7: All items processed");

            order.setOrderItems(items);
            System.out.println("Step 8: Saving order to database");
            Orders savedOrder = orderRepository.save(order);
            System.out.println("Step 9: Order saved with ID: " + savedOrder.getId());
            
            // Update total amount after saving (in case it changed)
            savedOrder.setTotalAmount(totalAmount);
            Orders finalOrder = orderRepository.save(savedOrder);
            System.out.println("Step 10: Order creation completed successfully");
            return finalOrder;
        } catch (Exception e) {
            System.err.println("Error in createOrder: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public List<Orders> getAllOrdersByCustomerRefNumber(String customerRefNumber) {
        try {
            System.out.println("Fetching orders for: " + customerRefNumber);
            List<Orders> orders = orderRepository.findByCustomer_CustomerRefNumber(customerRefNumber);
            System.out.println("Found " + orders.size() + " orders");
            return orders;
        } catch (Exception e) {
            System.out.println("Error fetching orders: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public OrderResponse getOrdersByCustomerRefNumberAndStatus(String customerRefNumber, String status) {
        List<Orders> orderStatusResults = new ArrayList<>();
        if (status != null) {

            orderStatusResults = orderRepository.findByCustomer_CustomerRefNumberAndStatus(customerRefNumber, status);
            if (orderStatusResults.isEmpty()) {
                return new OrderResponse(null, "No results found for given status=" + status);
            }
        }
        return new OrderResponse(orderStatusResults, "success");
    }

    @Override
    public List<Orders> getOrdersBetweenDates(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.findByOrderDateBetween(startDate, endDate);
    }

    @Override
    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void updateOrderItemStatus(Long orderItemId, String status) {
        OrderItem orderItem = orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new RuntimeException("OrderItem not found"));
        
        String oldStatus = orderItem.getStatus();
        orderItem.setStatus(status);
        orderItemRepository.save(orderItem);
        
        if ("DELIVERED".equals(status) && !"DELIVERED".equals(oldStatus) && orderItem.getProduct() != null) {
            updateProductQuantity(orderItem.getProduct().getId(), -orderItem.getQuantity(), "ORDER_DELIVERED");
        }
    }

    @Override
    public void deliverOrder(Long orderId) {
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        order.setStatus("DELIVERED");
        order.getOrderItems().forEach(item -> {
            item.setStatus("DELIVERED");
            if (item.getProduct() != null) {
                updateProductQuantity(item.getProduct().getId(), -item.getQuantity(), "ORDER_DELIVERED");
            }
        });
        
        orderRepository.save(order);
    }

    @Override
    public Product returnOrderItem(Long orderItemId, int returnQuantity) {
        OrderItem orderItem = orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new RuntimeException("OrderItem not found"));
        
        if (returnQuantity > orderItem.getQuantity()) {
            throw new RuntimeException("Return quantity cannot exceed ordered quantity");
        }
        
        Product product = orderItem.getProduct();
        if (product == null) {
            throw new RuntimeException("Product not found for order item: " + orderItem.getProductName());
        }
        
        product.setAvailableQuantity(product.getAvailableQuantity() + returnQuantity);
        Product updatedProduct = productRepository.save(product);
        
        orderItem.setQuantity(orderItem.getQuantity() - returnQuantity);
        orderItemRepository.save(orderItem);
        
        StockMovement movement = new StockMovement();
        movement.setProduct(product);
        movement.setMovementDate(LocalDateTime.now());
        movement.setMovementType("RETURN");
        movement.setQuantity(returnQuantity);
        stockMovementRepository.save(movement);
        
        return updatedProduct;
    }

    @Override
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    @Override
    public Orders updateOrder(Long id, OrderRequestDTO orderRequest) {
        Orders order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        order.setStatus(orderRequest.getStatus() != null ? orderRequest.getStatus() : order.getStatus());
        return orderRepository.save(order);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    private void updateProductQuantity(Long productId, int quantityChange, String movementType) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        product.setAvailableQuantity(product.getAvailableQuantity() + quantityChange);
        productRepository.save(product);
        
        StockMovement movement = new StockMovement();
        movement.setProduct(product);
        movement.setMovementDate(LocalDateTime.now());
        movement.setMovementType(movementType);
        movement.setQuantity(Math.abs(quantityChange));
        stockMovementRepository.save(movement);
    }

}