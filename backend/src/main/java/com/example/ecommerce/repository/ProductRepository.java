/*
 * Product Repository
 * @author teshan_kalhara
 * @create 4/29/2025
 * @modify 4/29/2025
 */
package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByNameContainingOrDescriptionContaining(String name, String description);
}
