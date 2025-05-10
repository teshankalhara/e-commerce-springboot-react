/*
    CustomUserDetailsService class is used to load user-specific data.

    @author teshan_kalhara
    @create 5/10/2025
    @update 5/10/2025
 */
package com.example.ecommerce.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.ecommerce.entity.User;
import com.example.ecommerce.exception.NotFoundException;
import com.example.ecommerce.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepo.findByEmail(username)
                .orElseThrow(() -> new NotFoundException("User/ Email Not found"));

        return AuthUser.builder()
                .user(user)
                .build();
    }
}
