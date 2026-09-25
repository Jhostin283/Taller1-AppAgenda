import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService, CityWeather } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get weather for a city', () => {
    const mockWeather: CityWeather = { city: 'Lima', country: 'Peru', temperature: 20, description: 'Clear' };

    service.getWeatherForCity('Peru', 'Lima').subscribe(data => {
      expect(data).toEqual(mockWeather);
    });

    const req = httpMock.expectOne('/api/weather/Peru/Lima');
    expect(req.request.method).toBe('GET');
    req.flush(mockWeather);
  });

  it('should get countries', () => {
    const mockCountries = ['Peru', 'Colombia'];
    service.getCountries().subscribe(data => {
      expect(data).toEqual(mockCountries);
    });
    const req = httpMock.expectOne('/api/weather/countries');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });
});
