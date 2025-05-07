/*
    Address service interface for the e-commerce application.
    
    @author teshan_kalhara
    @create 5/7/2025
    @update 5/7/2025
*/
package com.example.ecommerce.service.interf;

import com.example.ecommerce.dto.AddressDto;
import com.example.ecommerce.dto.Response;

public interface AddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);
}
