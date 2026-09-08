import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactListComponent } from './contact-list.component';
import { ContactService } from '../../services/contact.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactService: jasmine.SpyObj<ContactService>;

  beforeEach(async () => {
    const mockService = jasmine.createSpyObj('ContactService', ['getContacts', 'deleteContact']);
    mockService.getContacts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [ContactListComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: ContactService, useValue: mockService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
    fixture.detectChanges();
  });

  it('TC_FR_04: Modal de borrado defensivo (no usar alert nativo)', () => {
    // Espiamos window.confirm para asegurarnos de que NO se use
    spyOn(window, 'confirm');
    
    // Llamamos a la función de eliminar asumiendo que muestra un modal UI
    component.deleteContact(1);
    
    // El alert nativo está prohibido en la regla UX
    expect(window.confirm).not.toHaveBeenCalled();
    
    // Opcional: Validar que alguna propiedad booleana del modal se active
    // expect(component.showDeleteModal).toBeTrue();
  });
});
