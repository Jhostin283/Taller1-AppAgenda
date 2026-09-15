package com.example.contacts.service;

import com.example.contacts.entity.Contact;
import com.example.contacts.repository.ContactRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ContactServiceTest {

    @Mock
    private ContactRepository repository;

    @InjectMocks
    private ContactService service;

    private Contact mockContact;

    @BeforeEach
    void setUp() {
        mockContact = new Contact();
        mockContact.setId(1L);
        mockContact.setNombre("Carlos");
        mockContact.setApellido("Santana");
        mockContact.setCorreo("carlos@example.com");
    }

    @Test
    void testCreateContact() {
        when(repository.save(any(Contact.class))).thenReturn(mockContact);
        Contact saved = service.createContact(mockContact);
        assertNotNull(saved);
        assertEquals("Carlos", saved.getNombre());
    }

    @Test
    void testGetContacts_Search() {
        when(repository.findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCaseOrCorreoContainingIgnoreCase("Carlos", "Carlos", "Carlos"))
                .thenReturn(List.of(mockContact));
        List<Contact> results = service.getContacts("Carlos", null, null);
        assertFalse(results.isEmpty());
    }

    @Test
    void testGetContacts_Category() {
        when(repository.findByCategoriaIgnoreCase("Amigos")).thenReturn(List.of(mockContact));
        List<Contact> results = service.getContacts(null, "Amigos", null);
        assertFalse(results.isEmpty());
    }

    @Test
    void testGetContacts_Favorite() {
        when(repository.findByFavoritoTrue()).thenReturn(List.of(mockContact));
        List<Contact> results = service.getContacts(null, null, true);
        assertFalse(results.isEmpty());
    }

    @Test
    void testGetContacts_All() {
        when(repository.findAll()).thenReturn(List.of(mockContact));
        List<Contact> results = service.getContacts(null, null, null);
        assertFalse(results.isEmpty());
    }

    @Test
    void testGetContactById() {
        when(repository.findById(1L)).thenReturn(Optional.of(mockContact));
        Optional<Contact> found = service.getContactById(1L);
        assertTrue(found.isPresent());
        assertEquals(1L, found.get().getId());
    }

    @Test
    void testUpdateContact_Success() {
        Contact updatedInfo = new Contact();
        updatedInfo.setNombre("Pedro");
        updatedInfo.setFavorito(true);

        when(repository.findById(1L)).thenReturn(Optional.of(mockContact));
        when(repository.save(any(Contact.class))).thenReturn(mockContact);

        Optional<Contact> result = service.updateContact(1L, updatedInfo);
        assertTrue(result.isPresent());
        assertEquals("Pedro", result.get().getNombre());
        assertTrue(result.get().getFavorito());
    }

    @Test
    void testUpdateContact_NotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        Optional<Contact> result = service.updateContact(99L, new Contact());
        assertFalse(result.isPresent());
    }

    @Test
    void testDeleteContact_Success() {
        when(repository.existsById(1L)).thenReturn(true);
        boolean deleted = service.deleteContact(1L);
        assertTrue(deleted);
        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteContact_NotFound() {
        when(repository.existsById(99L)).thenReturn(false);
        boolean deleted = service.deleteContact(99L);
        assertFalse(deleted);
        verify(repository, never()).deleteById(anyLong());
    }

    @Test
    void testExistsByCorreo() {
        when(repository.existsByCorreo("carlos@example.com")).thenReturn(true);
        assertTrue(service.existsByCorreo("carlos@example.com"));
    }

    @Test
    void testExistsByCorreoAndIdNot() {
        when(repository.existsByCorreoAndIdNot("carlos@example.com", 2L)).thenReturn(true);
        assertTrue(service.existsByCorreoAndIdNot("carlos@example.com", 2L));
    }
}
