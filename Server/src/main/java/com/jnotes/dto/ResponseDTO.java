package com.jnotes.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO {

    private int StatusCode;
    private String Message;
    private String role;
    private String token;
    private String expirationTime;
    private List<UserDTO> userList;
    private UserDTO user;
}
