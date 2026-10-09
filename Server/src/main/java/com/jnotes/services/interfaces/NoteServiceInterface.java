package com.jnotes.services.interfaces;

import org.springframework.data.domain.Pageable;

import com.jnotes.dto.ResponseDTO;
import com.jnotes.entities.Note;
import com.jnotes.entities.User;

public interface NoteServiceInterface {
    ResponseDTO getAllUserNotes(Long userId, Pageable page);

    ResponseDTO getNote(Long noteId);

    ResponseDTO saveNote(Long noteId, Note note);

    ResponseDTO updateNote(Long userId, Long noteId, Note note);

    ResponseDTO deleteNote(Long noteId);
}
