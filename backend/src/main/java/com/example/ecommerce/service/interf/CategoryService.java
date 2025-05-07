/*
    Category service interface for the e-commerce application.
    
    @author teshan_kalhara
    @create 5/7/2025
    @update 5/7/2025
*/
package com.example.ecommerce.service.interf;

import com.example.ecommerce.dto.CategoryDto;
import com.example.ecommerce.dto.Response;

public interface CategoryService {

    Response createCategory(CategoryDto categoryRequest);

    Response updateCategory(Long categoryId, CategoryDto categoryRequest);

    Response getAllCategories();

    Response getCategoryById(Long categoryId);

    Response deleteCategory(Long categoryId);
}
