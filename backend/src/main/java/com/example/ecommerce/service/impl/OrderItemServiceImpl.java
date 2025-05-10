/*
    Order item service implementation for the e-commerce application.
    
    @author teshan_kalhara
    @create 5/7/2025
    @update 5/10/2025
*/
package com.example.ecommerce.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.ecommerce.dto.OrderItemDto;
import com.example.ecommerce.dto.OrderRequest;
import com.example.ecommerce.dto.Response;
import com.example.ecommerce.entity.Order;
import com.example.ecommerce.entity.OrderItem;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.enums.OrderStatus;
import com.example.ecommerce.exception.NotFoundException;
import com.example.ecommerce.mapper.EntityDtoMapper;
import com.example.ecommerce.repository.OrderItemRepository;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.service.interf.OrderItemService;
import com.example.ecommerce.service.interf.UserService;
import com.example.ecommerce.specification.OrderItemSpecification;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderItemServiceImpl implements OrderItemService {

        private final OrderRepository orderRepo;
        private final OrderItemRepository orderItemRepo;
        private final ProductRepository productRepo;
        private final UserService userService;
        private final EntityDtoMapper entityDtoMapper;

        @Override
        public Response placeOrder(OrderRequest orderRequest) {

                User user = userService.getLoginUser();
                // map order request items to order entities

                List<OrderItem> orderItems = orderRequest.getItems().stream().map(orderItemRequest -> {
                        Product product = productRepo.findById(orderItemRequest.getProductId())
                                        .orElseThrow(() -> new NotFoundException("Product Not Found"));

                        OrderItem orderItem = new OrderItem();
                        orderItem.setProduct(product);
                        orderItem.setQuantity(orderItemRequest.getQuantity());
                        orderItem.setPrice(product.getPrice()
                                        .multiply(BigDecimal.valueOf(orderItemRequest.getQuantity()))); // set price
                                                                                                        // according to
                                                                                                        // the quantity
                        orderItem.setStatus(OrderStatus.PENDING);
                        orderItem.setUser(user);
                        return orderItem;

                }).collect(Collectors.toList());

                // calculate the total price
                BigDecimal totalPrice = orderRequest.getTotalPrice() != null
                                && orderRequest.getTotalPrice().compareTo(BigDecimal.ZERO) > 0
                                                ? orderRequest.getTotalPrice()
                                                : orderItems.stream().map(OrderItem::getPrice).reduce(BigDecimal.ZERO,
                                                                BigDecimal::add);

                // create order entity
                Order order = new Order();
                order.setOrderItemList(orderItems);
                order.setTotalPrice(totalPrice);

                // set the order reference in each orderitem
                orderItems.forEach(orderItem -> orderItem.setOrder(order));

                orderRepo.save(order);

                return Response.builder()
                                .status(200)
                                .message("Order was successfully placed")
                                .build();

        }

        @Override
        public Response updateOrderItemStatus(Long orderItemId, String status) {
                OrderItem orderItem = orderItemRepo.findById(orderItemId)
                                .orElseThrow(() -> new NotFoundException("Order Item not found"));

                orderItem.setStatus(OrderStatus.valueOf(status.toUpperCase()));
                orderItemRepo.save(orderItem);
                return Response.builder()
                                .status(200)
                                .message("Order status updated successfully")
                                .build();
        }

        @Override
        public Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate,
                        Long itemId, Pageable pageable) {
                Specification<OrderItem> spec = Specification.where(OrderItemSpecification.hasStatus(status))
                                .and(OrderItemSpecification.createdBetween(startDate, endDate))
                                .and(OrderItemSpecification.hasItemId(itemId));

                Page<OrderItem> orderItemPage = orderItemRepo.findAll(spec, pageable);

                if (orderItemPage.isEmpty()) {
                        throw new NotFoundException("No Order Found");
                }
                List<OrderItemDto> orderItemDtos = orderItemPage.getContent().stream()
                                .map(entityDtoMapper::mapOrderItemToDtoPlusProductAndUser)
                                .collect(Collectors.toList());

                return Response.builder()
                                .status(200)
                                .orderItemList(orderItemDtos)
                                .totalPage(orderItemPage.getTotalPages())
                                .totalElement(orderItemPage.getTotalElements())
                                .build();
        }

}
