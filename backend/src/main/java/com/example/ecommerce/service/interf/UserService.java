/*
    User service interface for the e-commerce application.
    
    @author teshan_kalhara
    @create 5/7/2025
    @update 5/7/2025
*/
package com.example.ecommerce.service.interf;

import com.example.ecommerce.dto.LoginRequest;
import com.example.ecommerce.dto.Response;
import com.example.ecommerce.dto.UserDto;
import com.example.ecommerce.entity.User;

public interface UserService {
    Response registerUser(UserDto registrationRequest);

    Response loginUser(LoginRequest loginRequest);

    Response getAllUsers();

    User getLoginUser();

    Response getUserInfoAndOrderHistory();
}
