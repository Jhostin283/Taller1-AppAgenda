import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactFormComponent } from './contact-form.component';
import { ContactService } from '../../services/contact.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let router: Router;

  beforeEach(async () => {
    const mockContactService = jasmine.createSpyObj('ContactService', ['createContact', 'updateContact']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: ContactService, useValue: mockContactService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('TC_FR_01: Botón deshabilitado inicialmente cuando el formulario está vacío', () => {
    expect(component.contactForm.invalid).toBeTrue();
    const saveButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(saveButton.disabled).toBeTrue();
  });

  it('TC_FR_02: Botón deshabilitado por error visual al borrar campo obligatorio', () => {
    // Simulamos llenar y luego vaciar un campo
    component.contactForm.patchValue({ nombre: 'Juan' });
    component.contactForm.patchValue({ nombre: '' }); // Vaciamos
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(saveButton.disabled).toBeTrue();
  });

  it('TC_FR_03: Cancelación segura redirige a /contacts sin guardar', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/contacts']);
  });
});
