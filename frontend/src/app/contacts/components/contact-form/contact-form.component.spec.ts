import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form.component';
import { DefaultService, Contact } from '../../../api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let contactService: jasmine.SpyObj<DefaultService>;
  let router: Router;

  beforeEach(async () => {
    const mockContactService = jasmine.createSpyObj('DefaultService', ['createContact', 'updateContact', 'getContactById']);
    
    // Simulate empty params by default
    const mockActivatedRoute = {
      snapshot: { paramMap: { get: () => null } }
    };

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: DefaultService, useValue: mockContactService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(DefaultService) as jasmine.SpyObj<DefaultService>;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('TC_FR_01: Botón deshabilitado inicialmente cuando el formulario está vacío', () => {
    expect(component.contactForm.invalid).toBeTrue();
    const saveButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(saveButton.disabled).toBeTrue();
  });

  it('TC_FR_02: Botón deshabilitado por error visual al borrar campo obligatorio', () => {
    component.contactForm.patchValue({ nombre: 'Juan' });
    component.contactForm.patchValue({ nombre: '' }); 
    fixture.detectChanges();
    const saveButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(saveButton.disabled).toBeTrue();
  });

  it('TC_FR_03: Cancelación segura redirige a /contacts sin guardar', () => {
    const cancelLink = fixture.debugElement.query(By.css('a[routerLink="/contacts"]')).nativeElement;
    expect(cancelLink.getAttribute('routerLink')).toBe('/contacts');
  });

  it('debe marcar campos como touched si el formulario es inválido en onSubmit', () => {
    component.onSubmit();
    expect(component.errorMessage()).toContain('revisa los campos en rojo');
    expect(component.contactForm.touched).toBeTrue();
  });

  it('debe crear contacto exitosamente y redirigir', fakeAsync(() => {
    component.contactForm.patchValue({
      nombre: 'Juan', apellido: 'Perez', correo: 'juan@test.com'
    });
    contactService.createContact.and.returnValue(of({}));
    
    component.onSubmit();
    
    expect(contactService.createContact).toHaveBeenCalled();
    expect(component.successMessage()).toContain('creado exitosamente');
    
    tick(1500); // Simulate timeout
    expect(router.navigate).toHaveBeenCalledWith(['/contacts']);
  }));

  it('debe manejar error 409 (conflicto) al crear contacto', () => {
    component.contactForm.patchValue({
      nombre: 'Juan', apellido: 'Perez', correo: 'juan@test.com'
    });
    contactService.createContact.and.returnValue(throwError(() => ({ status: 409 })));
    
    component.onSubmit();
    
    expect(component.errorMessage()).toContain('ya está registrado');
    expect(component.isSubmitting()).toBeFalse();
  });

  it('debe manejar error 400 al crear contacto', () => {
    component.contactForm.patchValue({
      nombre: 'Juan', apellido: 'Perez', correo: 'juan@test.com'
    });
    contactService.createContact.and.returnValue(throwError(() => ({ status: 400 })));
    
    component.onSubmit();
    
    expect(component.errorMessage()).toContain('Error 400');
  });
});

describe('ContactFormComponent - Edit Mode', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let contactService: jasmine.SpyObj<DefaultService>;
  let router: Router;

  beforeEach(async () => {
    const mockContactService = jasmine.createSpyObj('DefaultService', ['createContact', 'updateContact', 'getContactById']);
    
    const mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '1' } } // Simulate /edit/1
    };

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: DefaultService, useValue: mockContactService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(DefaultService) as jasmine.SpyObj<DefaultService>;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    contactService.getContactById.and.returnValue(of({ nombre: 'Juan Editado', apellido: 'Perez', correo: 'juan@test.com' }));
    fixture.detectChanges(); // calls ngOnInit
  });

  it('debe cargar datos del contacto en ngOnInit en modo edición', () => {
    expect(component.isEditMode()).toBeTrue();
    expect(component.contactId()).toBe(1);
    expect(contactService.getContactById).toHaveBeenCalledWith(1);
    expect(component.contactForm.get('nombre')?.value).toBe('Juan Editado');
  });

  it('debe actualizar contacto exitosamente y redirigir', fakeAsync(() => {
    component.contactForm.patchValue({ nombre: 'Juan Editado', apellido: 'Perez', correo: 'juan@test.com' });
    contactService.updateContact.and.returnValue(of({}));
    
    component.onSubmit();
    
    expect(contactService.updateContact).toHaveBeenCalledWith(1, jasmine.any(Object));
    expect(component.successMessage()).toContain('actualizado exitosamente');
    
    tick(1500);
    expect(router.navigate).toHaveBeenCalledWith(['/contacts']);
  }));

  it('debe manejar error genérico al actualizar', () => {
    component.contactForm.patchValue({ nombre: 'Juan Editado', apellido: 'Perez', correo: 'juan@test.com' });
    contactService.updateContact.and.returnValue(throwError(() => ({ status: 500 })));
    
    component.onSubmit();
    
    expect(component.errorMessage()).toContain('Ocurrió un error al guardar');
  });
});
