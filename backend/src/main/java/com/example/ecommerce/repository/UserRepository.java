/*
 * User Repository
 * @author teshan_kalhara
 * @create 4/29/2025
 * @modify 4/29/2025
 */
package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
