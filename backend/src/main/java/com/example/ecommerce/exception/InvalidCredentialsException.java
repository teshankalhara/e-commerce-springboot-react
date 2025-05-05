/*
    Invalid credentials exception
    
    @author teshan_kalhara
    @create 5/5/2025
    @update 5/5/2025
*/
package com.example.ecommerce.exception;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
