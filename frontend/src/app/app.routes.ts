import { Routes } from '@angular/router';
import { ContactFormComponent } from './contacts/components/contact-form/contact-form.component';
import { ContactListComponent } from './contacts/pages/contact-list/contact-list.component';

export const routes: Routes = [
  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/new', component: ContactFormComponent },
  { path: 'contacts/edit/:id', component: ContactFormComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }
];
