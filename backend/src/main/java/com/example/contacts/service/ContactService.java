package com.example.contacts.service;

import com.example.contacts.entity.Contact;
import com.example.contacts.repository.ContactRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    
    private final ContactRepository repository;

    public ContactService(ContactRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public Contact createContact(Contact contact) {
        return repository.save(contact);
    }
    
    @Transactional(readOnly = true)
    public List<Contact> getContacts(String search, String category, Boolean favorite) {
        if (search != null && !search.isEmpty()) {
            return repository.findByNombreContainingIgnoreCaseOrApellidoContainingIgnoreCaseOrCorreoContainingIgnoreCase(search, search, search);
        } else if (category != null && !category.isEmpty()) {
            return repository.findByCategoriaIgnoreCase(category);
        } else if (favorite != null && favorite) {
            return repository.findByFavoritoTrue();
        }
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Contact> getContactById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Optional<Contact> updateContact(Long id, Contact updatedContact) {
        return repository.findById(id).map(existing -> {
            existing.setNombre(updatedContact.getNombre());
            existing.setApellido(updatedContact.getApellido());
            existing.setCorreo(updatedContact.getCorreo());
            existing.setTelefono(updatedContact.getTelefono());
            existing.setDireccion(updatedContact.getDireccion());
            existing.setEmpresa(updatedContact.getEmpresa());
            existing.setCargo(updatedContact.getCargo());
            existing.setCategoria(updatedContact.getCategoria());
            existing.setNotas(updatedContact.getNotas());
            existing.setFavorito(updatedContact.getFavorito() != null ? updatedContact.getFavorito() : false);
            return repository.save(existing);
        });
    }

    @Transactional
    public boolean deleteContact(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public boolean existsByCorreo(String correo) {
        return repository.existsByCorreo(correo);
    }

    @Transactional(readOnly = true)
    public boolean existsByCorreoAndIdNot(String correo, Long id) {
        return repository.existsByCorreoAndIdNot(correo, id);
    }
}
