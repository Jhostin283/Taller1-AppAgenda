import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactListComponent } from './contact-list.component';
import { DefaultService, Contact } from '../../../api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactService: jasmine.SpyObj<DefaultService>;

  const mockContacts: Contact[] = [
    { id: 1, nombre: 'Ana', apellido: 'Paz', correo: 'ana@example.com' }
  ];

  beforeEach(async () => {
    const mockService = jasmine.createSpyObj('DefaultService', ['getContacts', 'deleteContact']);
    mockService.getContacts.and.returnValue(of(mockContacts));

    await TestBed.configureTestingModule({
      imports: [ContactListComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: DefaultService, useValue: mockService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(DefaultService) as jasmine.SpyObj<DefaultService>;
    fixture.detectChanges(); // Ejecuta ngOnInit -> loadContacts
  });

  it('debe cargar contactos en la inicialización', () => {
    expect(component.contacts()).toEqual(mockContacts);
    expect(component.isLoading()).toBeFalse();
  });

  it('debe cargar contactos con filtros al llamar onFilterChange', () => {
    component.searchTerm.set('Ana');
    component.selectedCategory.set('Familia');
    component.showFavoritesOnly.set(true);
    
    component.onFilterChange();
    
    expect(contactService.getContacts).toHaveBeenCalledWith('Ana', 'Familia', true);
  });

  it('debe manejar error al cargar contactos', () => {
    contactService.getContacts.and.returnValue(throwError(() => new Error('Error')));
    component.loadContacts();
    expect(component.errorMessage()).toBe('Error al cargar la lista de contactos.');
    expect(component.isLoading()).toBeFalse();
  });

  it('TC_FR_04: Modal de borrado defensivo (no usar alert nativo)', () => {
    spyOn(window, 'confirm');
    component.openDeleteModal(1);
    expect(window.confirm).not.toHaveBeenCalled();
    expect(component.contactToDelete()).toBe(1);
  });

  it('debe cerrar el modal de borrado', () => {
    component.openDeleteModal(1);
    component.closeDeleteModal();
    expect(component.contactToDelete()).toBeNull();
  });

  it('debe eliminar contacto y actualizar lista en confirmDelete', () => {
    contactService.deleteContact.and.returnValue(of(undefined));
    component.openDeleteModal(1);
    component.confirmDelete();
    expect(contactService.deleteContact).toHaveBeenCalledWith(1);
    expect(component.contacts().length).toBe(0);
    expect(component.contactToDelete()).toBeNull();
  });

  it('debe no hacer nada si confirmDelete es llamado sin id', () => {
    component.contactToDelete.set(null);
    component.confirmDelete();
    expect(contactService.deleteContact).not.toHaveBeenCalled();
  });

  it('debe manejar error al eliminar contacto', () => {
    contactService.deleteContact.and.returnValue(throwError(() => new Error('Error')));
    component.openDeleteModal(1);
    component.confirmDelete();
    expect(component.errorMessage()).toBe('Error al eliminar el contacto');
    expect(component.contactToDelete()).toBeNull();
  });
});
