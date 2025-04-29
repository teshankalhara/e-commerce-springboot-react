/*
 * Address Repository
 * @author teshan_kalhara
 * @create 4/29/2025
 * @modify 4/29/2025
 */
package com.example.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ecommerce.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
