package com.jnotes.utils;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;

import com.jnotes.dto.NoteDTO;
import com.jnotes.dto.UserDTO;
import com.jnotes.entities.User;
import com.jnotes.entities.Note;

public class Utils {

    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());
        //userDTO.setNotes(mapNoteListEntityToNoteListDTO(user.getNotes()));
        return userDTO;
    }

    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> usersList) {
        return usersList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static NoteDTO mapNoteEntityToNoteDTO(Note note) {
        NoteDTO noteDTO = new NoteDTO();
        noteDTO.setId(note.getId());
        noteDTO.setUser(mapUserEntityToUserDTO(note.getUser()));
        noteDTO.setDateCreated(note.getDateCreated());
        noteDTO.setLastUpdated(note.getLastUpdated());
        noteDTO.setContent(note.getContent());
        noteDTO.setTitle(note.getTitle());
        return noteDTO;
    }

    public static List<NoteDTO> mapNoteListEntityToNoteListDTO(List<Note> noteList) {
        return noteList.stream().map(Utils::mapNoteEntityToNoteDTO).collect(Collectors.toList());
    }
}
