package com.inventory.Response;

import com.inventory.Entity.Orders;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderFilterResponse {
    private String status;
    private String customerRefNumber;
    private String area;
    private String startDate;

    private String endDate;
    private String place;
    private String stDate;
    private String edDate;
    private String message;
    private List<Orders> orders;

    // Constructor for success with data
    public OrderFilterResponse( List<Orders> orders, String startDate, String endDate, String message) {
        this.orders = orders;
        this.startDate = startDate;
        this.endDate = endDate;
        this.message = message;
    }

    // Constructor for error messages only
    public OrderFilterResponse(String message) {
        this.message = message;
    }

}
