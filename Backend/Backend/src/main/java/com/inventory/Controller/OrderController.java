package com.inventory.Controller;


import com.inventory.DTO.OrderRequestDTO;
import com.inventory.Entity.Orders;
import com.inventory.Response.OrderFilterResponse;
import com.inventory.Response.OrderResponse;
import com.inventory.Service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Create Order
    @PostMapping("/{customerRefNumber}")
    public ResponseEntity<?> createOrder(@PathVariable String customerRefNumber, @RequestBody OrderRequestDTO orderRequest) {
        try {
            log.info("Creating order for customerRefNumber: {}", customerRefNumber);
            Orders order = orderService.createOrder(customerRefNumber, orderRequest);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            log.error("Error creating order for customer {}: {}", customerRefNumber, e.getMessage(), e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to create order");
            errorResponse.put("message", e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName());
            errorResponse.put("customerRefNumber", customerRefNumber);
            errorResponse.put("exceptionType", e.getClass().getName());
            if (e.getCause() != null) {
                errorResponse.put("cause", e.getCause().getMessage());
            }
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // Get All Orders by Customer
    @GetMapping("/{customerRefNumber}")
    public List<Orders> getOrdersByCustomerRefNumber(@PathVariable String customerRefNumber) {
        log.info("Fetching orders for customerRefNumber: {}", customerRefNumber);
        return orderService.getAllOrdersByCustomerRefNumber(customerRefNumber);
    }

    // Get Orders by Customer & Status
    @GetMapping("/{customerRefNumber}/status/{status}")
    public OrderResponse getOrdersByStatus(@PathVariable String customerRefNumber, @PathVariable String status) {
        log.info("Fetching orders for customerRefNumber: {} and status: {}", customerRefNumber, status);
        return orderService.getOrdersByCustomerRefNumberAndStatus(customerRefNumber, status);
    }

    // Filter between startDate and endDate (full days)
    @GetMapping("/filter/dateRange")
    public Map<String, Object> getOrdersBetweenDates(
            @RequestParam("startDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

        List<Orders> orders = orderService.getOrdersBetweenDates(startDateTime, endDateTime);

        Map<String, Object> response = new HashMap<>();
        response.put("orders", orders);
        response.put("message", "success");
        return response;
    }

    // Get All orders for Admin view
    @GetMapping("/admin/getAllOrders")
    public List<Orders> getAllOrders() {
        return orderService.getAllOrders();
    }

    // Get all order items for testing
    @GetMapping("/items")
    public ResponseEntity<List<com.inventory.Entity.OrderItem>> getAllOrderItems() {
        return ResponseEntity.ok(orderService.getAllOrderItems());
    }

    // Return Order Item
    @PostMapping("/items/{itemId}/return")
    @PutMapping("/items/{itemId}/return")
    public ResponseEntity<Map<String, Object>> returnOrderItem(@PathVariable Long itemId, @RequestParam(defaultValue = "1") int returnQuantity) {
        Map<String, Object> response = new HashMap<>();
        try {
            orderService.returnOrderItem(itemId, returnQuantity);
            response.put("message", "Item returned successfully");
            response.put("status", "success");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Failed to return item: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Deliver Order - reduces product quantity
    @PutMapping("/{orderId}/deliver")
    public ResponseEntity<Map<String, Object>> deliverOrder(@PathVariable Long orderId) {
        Map<String, Object> response = new HashMap<>();
        try {
            orderService.deliverOrder(orderId);
            response.put("message", "Order delivered successfully");
            response.put("status", "success");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Failed to deliver order: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Update Order Item Status
    @PutMapping("/items/{itemId}/status/{status}")
    public ResponseEntity<Map<String, Object>> updateOrderItemStatus(@PathVariable Long itemId, @PathVariable String status) {
        Map<String, Object> response = new HashMap<>();
        try {
            orderService.updateOrderItemStatus(itemId, status);
            response.put("message", "Order item status updated successfully");
            response.put("status", "success");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Failed to update status: " + e.getMessage());
            response.put("status", "error");
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Update Order
    @PutMapping("/{id}")
    public ResponseEntity<Orders> updateOrder(@PathVariable Long id, @RequestBody OrderRequestDTO orderRequest) {
        return ResponseEntity.ok(orderService.updateOrder(id, orderRequest));
    }

    // Delete Order
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok().build();
    }

}