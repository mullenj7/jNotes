package com.jnotes.services.implementation;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.jnotes.dto.NoteDTO;
import com.jnotes.dto.ResponseDTO;
import com.jnotes.entities.Note;
import com.jnotes.entities.User;
import com.jnotes.repositories.NoteRepository;
import com.jnotes.repositories.UserRepository;
import com.jnotes.services.interfaces.NoteServiceInterface;
import com.jnotes.utils.Utils;

@Service
public class NoteServiceImplementation implements NoteServiceInterface {

    @Autowired
    NoteRepository noteRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseDTO getAllUserNotes(Long userId, Pageable page) { // Need to test different paging options
        ResponseDTO response = new ResponseDTO();
        try {
            Page<NoteDTO> notes = noteRepository.findByUserId(userId, page).map(Utils::mapNoteEntityToNoteDTO);
            response.setNotes(notes.getContent());
            response.setStatusCode(200);
            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting Notes " + e.getMessage());
            return response;
        }
    }

    @Override
    public ResponseDTO getNote(Long noteId) {
        ResponseDTO response = new ResponseDTO();
        try {
            Note note = noteRepository.findById(noteId).orElseThrow(() -> new NotFoundException());
            response.setNote(Utils.mapNoteEntityToNoteDTO(note));
            response.setStatusCode(200);
            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Getting Note " + e.getMessage());
            return response;
        }
    }

    @Override
    public ResponseDTO saveNote(Long userId, Note note) {
        ResponseDTO response = new ResponseDTO();
        try {
            LocalDateTime currentTime = LocalDateTime.now();
            User user = userRepository.findById(userId).orElseThrow(() -> new Exception());
            note.setDateCreated(currentTime);
            note.setUser(user);
            note.setLastUpdated(currentTime);
            noteRepository.save(note);
            response.setMessage("Note Saved");
            response.setStatusCode(200);
            response.setId(note.getId());
            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Saving Note " + e.getMessage());
            return response;
        }
    }

    @Override
    public ResponseDTO updateNote(Long userId, Long noteId, Note note) {
        ResponseDTO response = new ResponseDTO();
        try {
            LocalDateTime currentTime = LocalDateTime.now();
            Note oldNote = noteRepository.findById(noteId).orElseThrow(() -> new NotFoundException());
            oldNote.setLastUpdated(currentTime);
            oldNote.setContent(note.getContent());
            oldNote.setTitle(note.getTitle());
            noteRepository.save(oldNote);
            response.setMessage("Note Saved");
            response.setStatusCode(200);
            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Updating Note " + e.getMessage());
            return response;
        }
    }

    @Override
    public ResponseDTO deleteNote(Long noteId) {
        ResponseDTO response = new ResponseDTO();
        try {
            noteRepository.deleteById(noteId);
            response.setStatusCode(200);
            return response;
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Deleting Note " + e.getMessage());
            return response;
        }
    }

}
