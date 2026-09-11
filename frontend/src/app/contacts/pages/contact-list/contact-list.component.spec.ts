import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactListComponent } from './contact-list.component';
import { DefaultService } from '../../../api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactService: jasmine.SpyObj<DefaultService>;

  beforeEach(async () => {
    const mockService = jasmine.createSpyObj('DefaultService', ['getContacts', 'deleteContact']);
    mockService.getContacts.and.returnValue(of([]));

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
    fixture.detectChanges();
  });

  it('TC_FR_04: Modal de borrado defensivo (no usar alert nativo)', () => {
    spyOn(window, 'confirm');
    
    component.openDeleteModal(1);
    
    expect(window.confirm).not.toHaveBeenCalled();
    expect(component.contactToDelete()).toBe(1);
  });
});
