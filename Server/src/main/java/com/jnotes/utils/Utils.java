package com.jnotes.utils;

import java.util.List;
import java.util.stream.Collectors;

import com.jnotes.dto.UserDTO;
import com.jnotes.entities.User;

public class Utils {

    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> usersList) {
        return usersList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }
}
