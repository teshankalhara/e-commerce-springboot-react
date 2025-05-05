/*
    Order request dto
    
    @author teshan_kalhara
    @create 4/25/2025
    @update 5/5/2025
*/
package com.example.ecommerce.dto;

import java.math.BigDecimal;
import lombok.Data;

import com.example.ecommerce.entity.Payment;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderRequest {

    private BigDecimal totalPrice;
    private List<OrderItemRequest> items;
    private Payment paymentInfo;
}
