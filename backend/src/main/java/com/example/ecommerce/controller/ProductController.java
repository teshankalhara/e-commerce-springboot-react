/*
    Product controller
    
    @author teshan_kalhara
    @create 4/25/2025
    @update 5/10/2025
*/
package com.example.ecommerce.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecommerce.dto.Response;
import com.example.ecommerce.exception.InvalidCredentialsException;
import com.example.ecommerce.service.interf.ProductService;

import java.math.BigDecimal;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> createProduct(
            @RequestParam Long categoryId,
            @RequestParam MultipartFile image,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam BigDecimal price) {
        if (categoryId == null || image.isEmpty() || name.isEmpty() || description.isEmpty() || price == null) {
            throw new InvalidCredentialsException("All Fields are Required");
        }
        return ResponseEntity.ok(productService.createProduct(categoryId, image, name, description, price));
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateProduct(
            @RequestParam Long productId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) BigDecimal price) {
        return ResponseEntity.ok(productService.updateProduct(productId, categoryId, image, name, description, price));
    }

    @DeleteMapping("/delete/{productId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(productService.deleteProduct(productId));

    }

    @GetMapping("/get-by-product-id/{productId}")
    public ResponseEntity<Response> getProductById(@PathVariable Long productId) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }

    @GetMapping("/get-all")
    public ResponseEntity<Response> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/get-by-category-id/{categoryId}")
    public ResponseEntity<Response> getProductsByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
    }

    @GetMapping("/search")
    public ResponseEntity<Response> searchForProduct(@RequestParam String searchValue) {
        return ResponseEntity.ok(productService.searchProduct(searchValue));
    }

}
