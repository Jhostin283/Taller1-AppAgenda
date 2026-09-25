import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VisitorPredictionComponent } from './visitor-prediction.component';
import { WeatherService } from '../weather.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('VisitorPredictionComponent', () => {
  let component: VisitorPredictionComponent;
  let fixture: ComponentFixture<VisitorPredictionComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('WeatherService', ['predictVisitors']);
    
    await TestBed.configureTestingModule({
      imports: [VisitorPredictionComponent],
      providers: [
        { provide: WeatherService, useValue: spy }
      ]
    }).compileComponents();

    weatherServiceSpy = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
  });

  it('[TC-FR-05] should restrict DatePicker to -2 and +2 years', () => {
    fixture = TestBed.createComponent(VisitorPredictionComponent);
    component = fixture.componentInstance;
    
    const minDate = component.getMinDate();
    const maxDate = component.getMaxDate();
    
    const currentYear = new Date().getFullYear();
    expect(minDate.startsWith((currentYear - 2).toString())).toBeTrue();
    expect(maxDate.startsWith((currentYear + 2).toString())).toBeTrue();
  });

  it('[TC-FR-06] should create and load 7 days of predictions automatically', fakeAsync(() => {
    const mockRes = {
      location: 'Mirador San Francisco',
      date: '2026-10-15',
      predictedVisitors: 450,
      forecast: { city: 'Tingo Maria', country: 'Peru', temperature: 25, description: 'Sunny' }
    };
    
    weatherServiceSpy.predictVisitors.and.returnValue(of(mockRes));

    fixture = TestBed.createComponent(VisitorPredictionComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
    tick();

    expect(weatherServiceSpy.predictVisitors).toHaveBeenCalledTimes(7);
    expect(component.predictions().length).toBe(7);
    expect(component.loading()).toBeFalse();
  }));

  it('[TC-FR-07] should calculate capacity status correctly', () => {
    fixture = TestBed.createComponent(VisitorPredictionComponent);
    component = fixture.componentInstance;
    expect(component.getCapacityStatus(150).text).toBe('Baja');
    expect(component.getCapacityStatus(250).text).toBe('Media');
    expect(component.getCapacityStatus(600).text).toBe('Alta');
  });

  it('[TC-FR-08] should render Hero Image header and date picker', () => {
    fixture = TestBed.createComponent(VisitorPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    const heroHeader = fixture.debugElement.query(By.css('div.relative.h-64'));
    expect(heroHeader).toBeTruthy('Header hero missing');
    
    const bgImage = heroHeader.query(By.css('img'));
    expect(bgImage.nativeElement.src).toContain('assets/mirador.png');
    
    const dateInput = heroHeader.query(By.css('input[type="date"]'));
    expect(dateInput).toBeTruthy('Date input missing in header');
  });

  it('[TC-FR-10] should highlight Today card with a blue border', fakeAsync(() => {
    const mockRes = {
      location: 'Mirador', date: '2026-10-15', predictedVisitors: 450,
      forecast: { city: 'T', country: 'P', temperature: 25, description: 'Sunny' }
    };
    weatherServiceSpy.predictVisitors.and.returnValue(of(mockRes));

    fixture = TestBed.createComponent(VisitorPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('div.w-44'));
    expect(cards.length).toBe(7);
    
    // First card is "Today"
    expect(cards[0].nativeElement.classList.contains('border-blue-400')).toBeTrue();
    // Second card is not "Today"
    expect(cards[1].nativeElement.classList.contains('border-blue-400')).toBeFalse();
  }));

  it('[TC-FR-11] should show red error banner when prediction fails', fakeAsync(() => {
    weatherServiceSpy.predictVisitors.and.returnValue(throwError(() => new Error('API Error')));

    fixture = TestBed.createComponent(VisitorPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.error()).toBeTruthy();
    const errorBanner = fixture.debugElement.query(By.css('div.bg-red-50'));
    expect(errorBanner).toBeTruthy('Error banner should be displayed');
  }));
});
