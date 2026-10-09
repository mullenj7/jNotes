package com.jnotes.services.interfaces;

import com.jnotes.dto.LoginRequestDTO;
import com.jnotes.dto.ResponseDTO;
import com.jnotes.entities.User;

public interface UserServiceInterface {

    ResponseDTO createUser(User user);

    ResponseDTO login(LoginRequestDTO loginRequest);

    ResponseDTO getAllUsers();

    ResponseDTO deleteUser(Long userId);

    ResponseDTO getUserById(Long userId);

}
