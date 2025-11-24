package com.inventory.Service;

import com.inventory.DTO.OrderRequestDTO;
import com.inventory.Entity.Orders;
import com.inventory.Entity.Product;
import com.inventory.Response.OrderFilterResponse;
import com.inventory.Response.OrderResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {

    Orders createOrder(String customerRefNumber, OrderRequestDTO orderRequest);
    Orders updateOrder(Long id, OrderRequestDTO orderRequest);
    void deleteOrder(Long id);
    List<Orders> getAllOrdersByCustomerRefNumber(String customerRefNumber);
    OrderResponse getOrdersByCustomerRefNumberAndStatus(String customerRefNumber, String status);
    List<Orders> getOrdersBetweenDates(LocalDateTime startDateTime, LocalDateTime endDateTime);
    List<Orders> getAllOrders();
    void updateOrderItemStatus(Long orderItemId, String status);
    void deliverOrder(Long orderId);
    Product returnOrderItem(Long orderItemId, int returnQuantity);
    List<com.inventory.Entity.OrderItem> getAllOrderItems();
}

