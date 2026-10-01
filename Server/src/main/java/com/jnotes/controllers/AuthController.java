package com.jnotes.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jnotes.dto.LoginRequestDTO;
import com.jnotes.dto.ResponseDTO;
import com.jnotes.entities.User;
import com.jnotes.services.interfaces.UserServiceInterface;

@RestController
@RequestMapping("/auth")
public class AuthController {

    //@Autowired
    private final UserServiceInterface userService;

    public AuthController(final UserServiceInterface userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody User user) {
        System.out.println("got request ");
        ResponseDTO response = userService.createUser(user);
        System.out.println("response " + response);
        return ResponseEntity
                .status(HttpStatus.valueOf(response.getStatusCode()))
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        ResponseDTO response = userService.login(loginRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
