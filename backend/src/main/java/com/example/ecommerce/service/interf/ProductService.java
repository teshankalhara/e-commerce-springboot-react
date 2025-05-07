/*
    Product service interface for the e-commerce application.
    
    @author teshan_kalhara
    @create 5/7/2025
    @update 5/7/2025
*/
package com.example.ecommerce.service.interf;

import org.springframework.web.multipart.MultipartFile;

import com.example.ecommerce.dto.Response;

import java.math.BigDecimal;

public interface ProductService {

    Response createProduct(Long categoryId, MultipartFile image, String name, String description, BigDecimal price);

    Response updateProduct(Long productId, Long categoryId, MultipartFile image, String name, String description,
            BigDecimal price);

    Response deleteProduct(Long productId);

    Response getProductById(Long productId);

    Response getAllProducts();

    Response getProductsByCategory(Long categoryId);

    Response searchProduct(String searchValue);
}
