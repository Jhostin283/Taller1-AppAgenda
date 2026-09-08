package com.example.contacts.controller;

import com.example.contacts.dto.ContactDto;
import com.example.contacts.service.ContactService;
import com.example.contacts.entity.Contact;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    private ContactDto mapToDto(Contact entity) {
        ContactDto dto = new ContactDto();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setApellido(entity.getApellido());
        dto.setCorreo(entity.getCorreo());
        dto.setTelefono(entity.getTelefono());
        dto.setDireccion(entity.getDireccion());
        dto.setEmpresa(entity.getEmpresa());
        dto.setCargo(entity.getCargo());
        dto.setCategoria(entity.getCategoria());
        dto.setNotas(entity.getNotas());
        dto.setFavorito(entity.getFavorito());
        if (entity.getFechaCreacion() != null) {
            dto.setFechaCreacion(entity.getFechaCreacion().atZone(ZoneId.systemDefault()).toOffsetDateTime());
        }
        if (entity.getFechaActualizacion() != null) {
            dto.setFechaActualizacion(entity.getFechaActualizacion().atZone(ZoneId.systemDefault()).toOffsetDateTime());
        }
        return dto;
    }

    private Contact mapToEntity(ContactDto dto) {
        Contact entity = new Contact();
        entity.setNombre(dto.getNombre());
        entity.setApellido(dto.getApellido());
        entity.setCorreo(dto.getCorreo());
        entity.setTelefono(dto.getTelefono());
        entity.setDireccion(dto.getDireccion());
        entity.setEmpresa(dto.getEmpresa());
        entity.setCargo(dto.getCargo());
        entity.setCategoria(dto.getCategoria());
        entity.setNotas(dto.getNotas());
        entity.setFavorito(dto.getFavorito() != null ? dto.getFavorito() : false);
        return entity;
    }

    @PostMapping
    public ResponseEntity<ContactDto> createContact(@Valid @RequestBody ContactDto contactDto) {
        if (contactService.existsByCorreo(contactDto.getCorreo())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Contact saved = contactService.createContact(mapToEntity(contactDto));
        return new ResponseEntity<>(mapToDto(saved), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ContactDto>> getContacts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Boolean favorite) {
        List<Contact> entities = contactService.getContacts(search, category, favorite);
        return new ResponseEntity<>(entities.stream().map(this::mapToDto).collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactDto> getContactById(@PathVariable Long id) {
        return contactService.getContactById(id)
                .map(entity -> new ResponseEntity<>(mapToDto(entity), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactDto> updateContact(@PathVariable Long id, @Valid @RequestBody ContactDto contactDto) {
        if (contactService.existsByCorreoAndIdNot(contactDto.getCorreo(), id)) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return contactService.updateContact(id, mapToEntity(contactDto))
                .map(entity -> new ResponseEntity<>(mapToDto(entity), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        if (contactService.deleteContact(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
