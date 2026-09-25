import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CityWeatherListComponent } from './city-weather-list.component';
import { WeatherService, CityWeather } from '../weather.service';
import { of, throwError } from 'rxjs';

describe('CityWeatherListComponent', () => {
  let component: CityWeatherListComponent;
  let fixture: ComponentFixture<CityWeatherListComponent>;
  let mockWeatherService: any;

  beforeEach(async () => {
    mockWeatherService = {
      getWeatherForCity: jasmine.createSpy('getWeatherForCity').and.returnValue(of(null))
    };

    await TestBed.configureTestingModule({
      imports: [CityWeatherListComponent],
      providers: [
        { provide: WeatherService, useValue: mockWeatherService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CityWeatherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load weather data when selectedLocation is set', () => {
    const mockData: CityWeather = { city: 'Lima', country: 'Peru', temperature: 20, description: 'Clear' };
    mockWeatherService.getWeatherForCity.and.returnValue(of(mockData));

    component.selectedLocation = { country: 'Peru', city: 'Lima' };

    expect(component.location()).toEqual({ country: 'Peru', city: 'Lima' });
    expect(mockWeatherService.getWeatherForCity).toHaveBeenCalledWith('Peru', 'Lima');
    expect(component.weather()).toEqual(mockData);
    expect(component.loading()).toBeFalse();
    expect(component.error()).toBeNull();
  });

  it('should handle error when loading weather data fails', () => {
    mockWeatherService.getWeatherForCity.and.returnValue(throwError(() => new Error('API down')));

    component.selectedLocation = { country: 'Colombia', city: 'Bogota' };

    expect(component.error()).toBe('No se pudo obtener el clima para esta ciudad. Intente de nuevo más tarde.');
    expect(component.weather()).toBeNull();
    expect(component.loading()).toBeFalse();
  });

  it('should open and close details modal', () => {
    component.weather.set({ city: 'Mexico City', country: 'Mexico', temperature: 25, description: 'Sunny' });
    
    component.openDetailsModal();
    expect(component.isModalOpen()).toBeTrue();

    component.closeModal();
    expect(component.isModalOpen()).toBeFalse();
  });
});
