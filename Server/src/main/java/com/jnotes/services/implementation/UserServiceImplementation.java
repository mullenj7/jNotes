package com.jnotes.services.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jnotes.dto.LoginRequestDTO;
import com.jnotes.dto.ResponseDTO;
import com.jnotes.dto.UserDTO;
import com.jnotes.entities.User;
import com.jnotes.entities.Note;
import com.jnotes.repositories.NoteRepository;
import com.jnotes.repositories.UserRepository;
import com.jnotes.services.interfaces.UserServiceInterface;
import com.jnotes.utils.JWTUtils;
import com.jnotes.utils.Utils;

@Service
public class UserServiceImplementation implements UserServiceInterface {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTUtils jwtUtils;

    @Override
    public ResponseDTO createUser(User user) {
        ResponseDTO response = new ResponseDTO();
        System.out.println("creating user " + user);
        try {
            if (user.getRole() == null || user.getRole().isBlank()) {
                user.setRole("USER");
            }
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new Exception(user.getEmail() + "Already Exists");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);
            response.setStatusCode(200);
            response.setUser(userDTO);
            response.setMessage("User Created");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred during user registration: " + e.getMessage());

        }
        return response;
    }

    @Override
    public ResponseDTO login(LoginRequestDTO loginRequest) {

        ResponseDTO response = new ResponseDTO();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new Exception("user Not found"));

            var token = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setExpirationTime("7 Days");
            response.setMessage("successful");

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error occurred during user login: " + e.getMessage());
        }
        return response;
    }

    @Override
    public ResponseDTO getAllUsers() {
        ResponseDTO response = new ResponseDTO();
        try {
            List<User> userList = userRepository.findAll();
            System.out.println("user list " + userList);
            List<UserDTO> userDTOList = Utils.mapUserListEntityToUserListDTO(userList);
            response.setStatusCode(200);
            response.setMessage("success");
            response.setUserList(userDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error getting all users " + e.getMessage());
        }
        return response;

    }

    @Override
    public ResponseDTO getUserById(Long userId) {
        ResponseDTO response = new ResponseDTO();
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new Exception());
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            response.setUser(userDTO);
            response.setStatusCode(200);
            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting User " + e.getMessage());
            return response;
        }
    }

    @Override
    public ResponseDTO deleteUser(Long userId) { // need to delete all user notes too
        ResponseDTO response = new ResponseDTO();
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new Exception());
            List<Note> notes = user.getNotes();
            userRepository.deleteById(userId);
            for (int i = 0; i < notes.size(); i++) {
                noteRepository.deleteById(notes.get(i).getId());
            }
            response.setStatusCode(200);
            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Deleting User " + e.getMessage());
            return response;
        }
    }

}
