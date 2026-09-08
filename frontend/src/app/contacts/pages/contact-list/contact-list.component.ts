import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DefaultService, Contact } from '../../../api';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  private contactService = inject(DefaultService);

  contacts = signal<Contact[]>([]);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  // Filtros
  searchTerm = signal('');
  selectedCategory = signal('');
  showFavoritesOnly = signal(false);

  ngOnInit() {
    this.loadContacts();
  }

  onFilterChange() {
    this.loadContacts();
  }

  loadContacts() {
    this.isLoading.set(true);
    
    const search = this.searchTerm() || undefined;
    const category = this.selectedCategory() || undefined;
    const favorite = this.showFavoritesOnly() || undefined;

    this.contactService.getContacts(search, category, favorite).subscribe({
      next: (data: Contact[]) => {
        this.contacts.set(data);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        this.errorMessage.set('Error al cargar la lista de contactos.');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }

  contactToDelete = signal<number | null>(null);

  openDeleteModal(id: number | undefined) {
    if (id) this.contactToDelete.set(id);
  }

  closeDeleteModal() {
    this.contactToDelete.set(null);
  }

  confirmDelete() {
    const id = this.contactToDelete();
    if (!id) return;
    
    this.contactService.deleteContact(id).subscribe({
      next: () => {
        this.contacts.set(this.contacts().filter(c => c.id !== id));
        this.closeDeleteModal();
      },
      error: (err: any) => {
        this.errorMessage.set('Error al eliminar el contacto');
        this.closeDeleteModal();
        console.error(err);
      }
    });
  }
}
