import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form.component';
import { DefaultService } from '../../../api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async () => {
    const mockContactService = jasmine.createSpyObj('DefaultService', ['createContact', 'updateContact', 'getContactById']);

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: DefaultService, useValue: mockContactService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
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
    const cancelLink = fixture.debugElement.query(By.css('a.btn.btn-outline.btn-error')).nativeElement;
    expect(cancelLink.getAttribute('routerLink')).toBe('/contacts');
  });
});
