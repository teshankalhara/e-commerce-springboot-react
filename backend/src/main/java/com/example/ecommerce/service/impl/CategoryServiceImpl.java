/*
    Category service implementation for the e-commerce application.
    
    @author teshan_kalhara
    @create 5/7/2025
    @update 5/10/2025
*/
package com.example.ecommerce.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.example.ecommerce.dto.CategoryDto;
import com.example.ecommerce.dto.Response;
import com.example.ecommerce.entity.Category;
import com.example.ecommerce.exception.NotFoundException;
import com.example.ecommerce.mapper.EntityDtoMapper;
import com.example.ecommerce.repository.CategoryRepository;
import com.example.ecommerce.service.interf.CategoryService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService {

        private final CategoryRepository categoryRepo;
        private final EntityDtoMapper entityDtoMapper;

        @Override
        public Response createCategory(CategoryDto categoryRequest) {
                Category category = new Category();
                category.setName(categoryRequest.getName());
                categoryRepo.save(category);
                return Response.builder()
                                .status(200)
                                .message("Category created successfully")
                                .build();
        }

        @Override
        public Response updateCategory(Long categoryId, CategoryDto categoryRequest) {
                Category category = categoryRepo.findById(categoryId)
                                .orElseThrow(() -> new NotFoundException("Category Not Found"));
                category.setName(categoryRequest.getName());
                categoryRepo.save(category);
                return Response.builder()
                                .status(200)
                                .message("category updated successfully")
                                .build();
        }

        @Override
        public Response getAllCategories() {
                List<Category> categories = categoryRepo.findAll();
                List<CategoryDto> categoryDtoList = categories.stream()
                                .map(entityDtoMapper::mapCategoryToDtoBasic)
                                .collect(Collectors.toList());

                return Response.builder()
                                .status(200)
                                .categoryList(categoryDtoList)
                                .build();
        }

        @Override
        public Response getCategoryById(Long categoryId) {
                Category category = categoryRepo.findById(categoryId)
                                .orElseThrow(() -> new NotFoundException("Category Not Found"));
                CategoryDto categoryDto = entityDtoMapper.mapCategoryToDtoBasic(category);
                return Response.builder()
                                .status(200)
                                .category(categoryDto)
                                .build();
        }

        @Override
        public Response deleteCategory(Long categoryId) {
                Category category = categoryRepo.findById(categoryId)
                                .orElseThrow(() -> new NotFoundException("Category Not Found"));
                categoryRepo.delete(category);
                return Response.builder()
                                .status(200)
                                .message("Category was deleted successfully")
                                .build();
        }
}
