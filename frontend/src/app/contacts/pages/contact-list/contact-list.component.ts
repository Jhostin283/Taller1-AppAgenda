import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DefaultService, Contact } from '../../../api';
import { CountrySelectorComponent } from '../../../weather/country-selector/country-selector.component';
import { CityWeatherListComponent } from '../../../weather/city-weather-list/city-weather-list.component';
import { VisitorPredictionComponent } from '../../../weather/visitor-prediction/visitor-prediction.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CountrySelectorComponent, CityWeatherListComponent, VisitorPredictionComponent],
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

  selectedWeatherLocation = signal<any>(null);

  onLocationSelected(location: any) {
    this.selectedWeatherLocation.set(location);
  }

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
