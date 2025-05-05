/*
    Order item specification
    
    @author teshan_kalhara
    @create 5/5/2025
    @update 5/5/2025
*/
package com.example.ecommerce.specification;

import org.springframework.data.jpa.domain.Specification;

import com.example.ecommerce.entity.OrderItem;
import com.example.ecommerce.enums.OrderStatus;

import java.time.LocalDateTime;

public class OrderItemSpecification {
    // Specification to filter order items by status
    public static Specification<OrderItem> hasStatus(OrderStatus status) {
        return ((root, query, criteriaBuilder) -> status != null ? criteriaBuilder.equal(root.get("status"), status)
                : null);
    }

    // Specification to filter order items by data range
    public static Specification<OrderItem> createdBetween(LocalDateTime startDate, LocalDateTime endDate) {
        return ((root, query, criteriaBuilder) -> {
            if (startDate != null && endDate != null) {
                return criteriaBuilder.between(root.get("createdAt"), startDate, endDate);
            } else if (startDate != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), startDate);
            } else if (endDate != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("createdAt"), endDate);
            } else {
                return null;
            }
        });
    }

    // Generate specification to filter orderitems by item id
    public static Specification<OrderItem> hasItemId(Long itemId) {
        return ((root, query, criteriaBuilder) -> itemId != null ? criteriaBuilder.equal(root.get("id"), itemId)
                : null);
    }
}