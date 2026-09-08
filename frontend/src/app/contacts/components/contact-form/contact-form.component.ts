import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultService, Contact } from '../../../api';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contactService = inject(DefaultService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  contactId = signal<number | null>(null);
  isEditMode = signal(false);

  contactForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(50)]],
    apellido: ['', [Validators.required, Validators.maxLength(50)]],
    correo: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    telefono: ['', [Validators.maxLength(20), Validators.pattern(/^[\+\d\s\-\(\)]+$/)]],
    direccion: ['', [Validators.maxLength(255)]],
    empresa: ['', [Validators.maxLength(100)]],
    cargo: ['', [Validators.maxLength(100)]],
    categoria: ['', [Validators.maxLength(50)]],
    notas: [''],
    favorito: [false]
  });

  isSubmitting = signal(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.contactId.set(+id);
      this.loadContactData(+id);
    }
  }

  loadContactData(id: number) {
    this.contactService.getContactById(id).subscribe({
      next: (contact) => {
        this.contactForm.patchValue(contact);
      },
      error: (err) => console.error(err)
    });
  }

  onSubmit() {
    this.successMessage.set(null);
    this.errorMessage.set(null);

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.errorMessage.set('Por favor, revisa los campos en rojo. Faltan datos obligatorios o hay errores de formato.');
      return;
    }

    this.isSubmitting.set(true);

    const contactData: Contact = this.contactForm.value;

    if (this.isEditMode() && this.contactId() !== null) {
      this.contactService.updateContact(this.contactId()!, contactData).subscribe({
        next: () => this.handleSuccess('¡Contacto actualizado exitosamente!'),
        error: (err) => this.handleError(err)
      });
    } else {
      this.contactService.createContact(contactData).subscribe({
        next: () => this.handleSuccess('¡Contacto creado exitosamente!'),
        error: (err) => this.handleError(err)
      });
    }
  }

  private handleSuccess(msg: string) {
    this.successMessage.set(msg + ' Volviendo a la agenda...');
    this.isSubmitting.set(false);
    setTimeout(() => this.router.navigate(['/contacts']), 1500);
  }

  private handleError(err: any) {
    if (err.status === 409) {
      this.errorMessage.set('Ese correo electrónico ya está registrado por otro contacto.');
    } else if (err.status === 400) {
      this.errorMessage.set('Error 400: Datos inválidos enviados al servidor.');
    } else {
      this.errorMessage.set('Ocurrió un error al guardar en el servidor.');
    }
    this.isSubmitting.set(false);
    console.error(err);
  }
}
