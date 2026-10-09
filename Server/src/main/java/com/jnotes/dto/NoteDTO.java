package com.jnotes.dto;

import java.time.LocalDateTime;

import org.json.JSONArray;
import org.json.JSONObject;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;


import lombok.Data;

@Data
public class NoteDTO {

    private Long id;
    private LocalDateTime DateCreated;
    private LocalDateTime LastUpdated;
    private UserDTO user;
    private String content;
    private String title;
}
