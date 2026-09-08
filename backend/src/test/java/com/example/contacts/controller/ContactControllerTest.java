package com.example.contacts.controller;

import com.example.contacts.dto.ContactDto;
import com.example.contacts.entity.Contact;
import com.example.contacts.service.ContactService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ContactController.class)
public class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ContactService contactService;

    @Nested
    class CrearContacto {
        @Test
        void TC_BA_01_creacionExitosa_retorna201() throws Exception {
            ContactDto newContact = new ContactDto();
            newContact.setNombre("Juan");
            newContact.setApellido("Perez");
            newContact.setCorreo("juan@example.com");

            Contact savedContact = new Contact();
            savedContact.setId(1L);
            savedContact.setNombre("Juan");
            savedContact.setApellido("Perez");
            savedContact.setCorreo("juan@example.com");

            when(contactService.existsByCorreo(any())).thenReturn(false);
            when(contactService.createContact(any(Contact.class))).thenReturn(savedContact);

            mockMvc.perform(post("/api/contacts")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(newContact)))
                    .andExpect(status().isCreated());
        }

        @Test
        void TC_BA_02_validacionFallidaCorreo_retorna400() throws Exception {
            ContactDto newContact = new ContactDto();
            newContact.setNombre("Juan");
            newContact.setApellido("Perez");
            newContact.setCorreo("correo-invalido");

            mockMvc.perform(post("/api/contacts")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(newContact)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        void TC_BA_03_validacionFallidaTelefono_retorna400() throws Exception {
            ContactDto newContact = new ContactDto();
            newContact.setNombre("Juan");
            newContact.setApellido("Perez");
            newContact.setCorreo("juan@example.com");
            newContact.setTelefono("123letras"); // Inválido por letras

            mockMvc.perform(post("/api/contacts")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(newContact)))
                    .andExpect(status().isBadRequest());
        }

        @Test
        void TC_BA_04_correoDuplicado_retorna409() throws Exception {
            ContactDto newContact = new ContactDto();
            newContact.setNombre("Juan");
            newContact.setApellido("Perez");
            newContact.setCorreo("juan@example.com");

            when(contactService.existsByCorreo("juan@example.com")).thenReturn(true);

            mockMvc.perform(post("/api/contacts")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(newContact)))
                    .andExpect(status().isConflict());
        }
    }

    @Nested
    class ListarContactos {
        @Test
        void TC_BA_05_listadoSinFiltros_retorna200() throws Exception {
            when(contactService.getContacts(null, null, null)).thenReturn(List.of());

            mockMvc.perform(get("/api/contacts"))
                    .andExpect(status().isOk());
        }

        @Test
        void TC_BA_06_contactoExistente_retorna200() throws Exception {
            Contact contact = new Contact();
            contact.setId(1L);
            when(contactService.getContactById(1L)).thenReturn(Optional.of(contact));

            mockMvc.perform(get("/api/contacts/1"))
                    .andExpect(status().isOk());
        }
    }

    @Nested
    class ActualizarEliminar {
        @Test
        void TC_BA_07_actualizacionDeDatos_retorna200() throws Exception {
            ContactDto updateContact = new ContactDto();
            updateContact.setNombre("Juan Updated");
            updateContact.setApellido("Perez");
            updateContact.setCorreo("juan@example.com");

            Contact updatedEntity = new Contact();
            updatedEntity.setId(1L);

            when(contactService.existsByCorreoAndIdNot(any(), any())).thenReturn(false);
            when(contactService.updateContact(eq(1L), any(Contact.class))).thenReturn(Optional.of(updatedEntity));

            mockMvc.perform(put("/api/contacts/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(updateContact)))
                    .andExpect(status().isOk());
        }

        @Test
        void TC_BA_08_eliminacionFisica_retorna204() throws Exception {
            when(contactService.deleteContact(1L)).thenReturn(true);

            mockMvc.perform(delete("/api/contacts/1"))
                    .andExpect(status().isNoContent());
        }
    }
}
