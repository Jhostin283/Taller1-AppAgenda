import { Component, EventEmitter, Output, OnInit, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../weather.service';

export interface LocationSelection {
  country: string;
  city: string;
}

@Component({
  selector: 'app-country-selector',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="flex flex-col md:flex-row gap-4 items-end bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div class="w-full md:w-1/3">
        <label for="country" class="block text-sm font-bold text-gray-700 mb-1">País</label>
        <select 
          id="country" 
          [formControl]="countryControl" 
          class="border border-gray-300 p-2.5 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer"
        >
          <option value="" disabled selected>-- Seleccione --</option>
          <option *ngFor="let c of availableCountries()" [value]="c">{{ c }}</option>
        </select>
      </div>

      <div class="w-full md:w-1/3" *ngIf="countryControl.valid">
        <label for="city" class="block text-sm font-bold text-gray-700 mb-1">Ciudad o Región</label>
        <select 
          id="city" 
          [formControl]="cityControl" 
          class="border border-gray-300 p-2.5 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none transition cursor-pointer"
        >
          <option value="" disabled selected>-- Seleccione --</option>
          <option *ngFor="let c of availableCities()" [value]="c">{{ c }}</option>
        </select>
      </div>

      <div class="w-full md:w-auto">
        <button 
          (click)="onSelect()" 
          [disabled]="countryControl.invalid || cityControl.invalid"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md">
          Obtener Clima
        </button>
      </div>
    </div>
  `
})
export class CountrySelectorComponent implements OnInit {
  private weatherService = inject(WeatherService);
  
  countryControl = new FormControl('', Validators.required);
  cityControl = new FormControl({value: '', disabled: true}, Validators.required);
  
  availableCountries = signal<string[]>([]);
  availableCities = signal<string[]>([]);

  @Output() locationSelected = new EventEmitter<LocationSelection>();

  ngOnInit() {
    this.weatherService.getCountries().subscribe(countries => {
      this.availableCountries.set(countries);
    });

    this.countryControl.valueChanges.subscribe(country => {
      if (country) {
        this.cityControl.disable();
        this.cityControl.setValue('');
        this.weatherService.getCitiesForCountry(country).subscribe(cities => {
          this.availableCities.set(cities);
          this.cityControl.enable();
        });
      }
    });
  }

  onSelect() {
    if (this.countryControl.valid && this.cityControl.valid) {
      this.locationSelected.emit({
        country: this.countryControl.value!,
        city: this.cityControl.value!
      });
    }
  }
}
