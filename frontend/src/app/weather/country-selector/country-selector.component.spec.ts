import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountrySelectorComponent } from './country-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { of } from 'rxjs';

describe('CountrySelectorComponent', () => {
  let component: CountrySelectorComponent;
  let fixture: ComponentFixture<CountrySelectorComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getCountries', 'getCitiesForCountry']);
    mockWeatherService.getCountries.and.returnValue(of(['Peru', 'Colombia']));
    mockWeatherService.getCitiesForCountry.and.returnValue(of(['Lima', 'Bogota']));

    await TestBed.configureTestingModule({
      imports: [CountrySelectorComponent, ReactiveFormsModule],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected location when valid', () => {
    spyOn(component.locationSelected, 'emit');
    component.countryControl.setValue('Peru');
    component.cityControl.enable();
    component.cityControl.setValue('Lima');
    component.onSelect();
    expect(component.locationSelected.emit).toHaveBeenCalledWith({ country: 'Peru', city: 'Lima' });
  });

  it('should not emit if invalid', () => {
    spyOn(component.locationSelected, 'emit');
    component.countryControl.setValue('Peru');
    component.cityControl.setValue('');
    component.onSelect();
    expect(component.locationSelected.emit).not.toHaveBeenCalled();
  });
});
