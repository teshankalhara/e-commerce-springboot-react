/*
 * Category Repository
 * @author teshan_kalhara
 * @create 4/29/2025
 * @modify 4/29/2025
 */
package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
