/*
    Order item request dto
    
    @author teshan_kalhara
    @create 4/25/2025
    @update 5/5/2025
*/
package com.example.ecommerce.dto;

import lombok.Data;

@Data
public class OrderItemRequest {

    private Long productId;
    private int quantity;
}
