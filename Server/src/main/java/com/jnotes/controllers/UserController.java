package com.jnotes.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jnotes.dto.ResponseDTO;
import com.jnotes.entities.User;
import com.jnotes.services.interfaces.UserServiceInterface;

@RestController
@RequestMapping("/users")
public class UserController {

    //@Autowired
    private final UserServiceInterface userService;

    public UserController(final UserServiceInterface userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseDTO> getAllUsers() {
        ResponseDTO response = userService.getAllUsers();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ResponseDTO> register(@RequestBody User user) {
        ResponseDTO response = userService.createUser(user);
        return ResponseEntity
                .status(response.getStatusCode())
                .body(response);
    }
}
