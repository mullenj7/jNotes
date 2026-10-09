package com.jnotes.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.jnotes.dto.ResponseDTO;
import com.jnotes.entities.Note;
import com.jnotes.entities.User;
import com.jnotes.services.interfaces.NoteServiceInterface;

@Controller
@RequestMapping("/notes")
public class NoteController {
    @Autowired
    private NoteServiceInterface noteService;

    @GetMapping("/all/{userId}")
    public ResponseEntity<ResponseDTO> getAllUserNotes(@PathVariable Long userId,
            @PageableDefault(size = 20, page = 0) Pageable page) {
        ResponseDTO response = noteService.getAllUserNotes(userId, page);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{noteId}")
    public ResponseEntity<ResponseDTO> getNote(@PathVariable Long noteId) {
        ResponseDTO response = noteService.getNote(noteId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<ResponseDTO> saveNote(@PathVariable Long userId, @RequestBody Note note) {
        ResponseDTO response = noteService.saveNote(userId, note);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PatchMapping("/{userId}/{noteId}")
    public ResponseEntity<ResponseDTO> updateNote(@PathVariable Long userId, @PathVariable Long noteId,
            @RequestBody Note note) {
        ResponseDTO response = noteService.updateNote(userId, noteId, note);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<ResponseDTO> deleteNote(@PathVariable Long noteId) {
        ResponseDTO response = noteService.deleteNote(noteId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
