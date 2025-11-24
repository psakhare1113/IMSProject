package com.inventory.DTO;


import java.util.List;
public class OrderRequestDTO {
    private List<OrderItemDTO> orderItems;
    private String status;

    public List<OrderItemDTO> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemDTO> orderItems) {
        this.orderItems = orderItems;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}