/*
    Address service implementation for the e-commerce application.
    
    @author teshan_kalhara
    @create 5/7/2025
    @update 5/7/2025
*/
package com.example.ecommerce.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.ecommerce.dto.AddressDto;
import com.example.ecommerce.dto.Response;
import com.example.ecommerce.entity.Address;
import com.example.ecommerce.entity.User;
import com.example.ecommerce.repository.AddressRepository;
import com.example.ecommerce.service.interf.AddressService;
import com.example.ecommerce.service.interf.UserService;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepo;
    private final UserService userService;

    @Override
    public Response saveAndUpdateAddress(AddressDto addressDto) {
        User user = userService.getLoginUser();
        Address address = user.getAddress();

        if (address == null) {
            address = new Address();
            address.setUser(user);
        }
        if (addressDto.getStreet() != null)
            address.setStreet(addressDto.getStreet());
        if (addressDto.getCity() != null)
            address.setCity(addressDto.getCity());
        if (addressDto.getState() != null)
            address.setState(addressDto.getState());
        if (addressDto.getZipCode() != null)
            address.setZipCode(addressDto.getZipCode());
        if (addressDto.getCountry() != null)
            address.setCountry(addressDto.getCountry());

        addressRepo.save(address);

        String message = (user.getAddress() == null) ? "Address successfully created" : "Address successfully updated";
        return Response.builder()
                .status(200)
                .message(message)
                .build();
    }
}