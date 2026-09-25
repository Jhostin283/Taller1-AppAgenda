import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityWeather, WeatherService } from '../weather.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocationSelection } from '../country-selector/country-selector.component';

@Component({
  selector: 'app-city-weather-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-4" *ngIf="location()">
      
      <div *ngIf="loading()" class="text-blue-500 my-4 flex items-center justify-center">
        <span class="animate-pulse font-medium">Cargando clima...</span>
      </div>

      <div *ngIf="error()" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-4 text-sm" role="alert">
        <p class="font-bold">Error</p>
        <p>{{ error() }}</p>
      </div>

      <div *ngIf="!loading() && !error() && weather()" class="flex items-center justify-between border border-gray-200 p-4 rounded-xl bg-white shadow-sm mt-4 hover:shadow-md transition">
        <div class="flex items-center gap-4">
          <!-- Weather Icon -->
          <div [ngSwitch]="getWeatherIconType(weather()?.description || '')">
            <svg *ngSwitchCase="'sun'" class="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <svg *ngSwitchCase="'cloud'" class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            <svg *ngSwitchCase="'rain'" class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18v2m-4-2v2m8-2v2"></path></svg>
            <svg *ngSwitchCase="'snow'" class="w-10 h-10 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18m0 0l3-3m-3 3l-3-3m8-6h-10m0 0l3-3m-3 3l3 3m10-10l-6 6m0 0l-3-3m3 3l3-3"></path></svg>
            <svg *ngSwitchDefault class="w-10 h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
          </div>
          <div>
            <h4 class="text-xl font-extrabold text-gray-800">{{ weather()?.city }}, <span class="text-gray-500 font-medium text-lg">{{ weather()?.country }}</span></h4>
            <p class="text-gray-500 font-medium capitalize text-sm">{{ translateDescription(weather()?.description || '') }}</p>
          </div>
        </div>
        <div class="flex items-center gap-6">
          <span class="text-3xl font-black text-blue-600 tracking-tighter">{{ weather()?.temperature }}°</span>
          <button (click)="openDetailsModal()" class="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold px-4 py-2 rounded-lg transition-colors">
            Detalles
          </button>
        </div>
      </div>
    </div>

    <!-- Backdrop-blur Modal con tema hoja rayada de cuaderno -->
    <div *ngIf="isModalOpen() && weather()" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div class="bg-white p-6 rounded-lg shadow-xl w-96 relative border border-gray-300" style="background-image: repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 28px); background-position: 0 1.2rem;">
        <button (click)="closeModal()" class="absolute top-2 right-4 text-gray-500 hover:text-black font-bold text-xl">x</button>
        <h2 class="text-2xl font-bold mb-4 pt-2 text-blue-800">{{ weather()?.city }}</h2>
        <p class="text-lg mb-2"><strong>País:</strong> {{ weather()?.country }}</p>
        <p class="text-lg mb-2"><strong>Temp:</strong> {{ weather()?.temperature }}°C</p>
        <p class="text-lg mb-2"><strong>Estado:</strong> <span class="capitalize">{{ translateDescription(weather()?.description || '') }}</span></p>
      </div>
    </div>
  `
})
export class CityWeatherListComponent {
  location = signal<LocationSelection | null>(null);
  weather = signal<CityWeather | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  isModalOpen = signal<boolean>(false);

  constructor(private weatherService: WeatherService) {}

  @Input()
  set selectedLocation(val: LocationSelection | null) {
    if (val) {
      this.location.set(val);
      this.loadWeather(val.country, val.city);
    }
  }

  loadWeather(country: string, city: string) {
    this.loading.set(true);
    this.error.set(null);
    this.weather.set(null);

    this.weatherService.getWeatherForCity(country, city)
      .pipe(
        catchError(err => {
          this.error.set('No se pudo obtener el clima para esta ciudad. Intente de nuevo más tarde.');
          return of(null);
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe(data => {
        if (data) {
          this.weather.set(data);
        } else if (!this.error()) {
          this.weather.set(null);
        }
      });
  }

  openDetailsModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  getWeatherIconType(description: string): string {
    const desc = description.toLowerCase();
    if (desc.includes('clear') || desc.includes('sun') || desc.includes('despejado') || desc.includes('sol')) return 'sun';
    if (desc.includes('cloud') || desc.includes('nub') || desc.includes('overcast')) return 'cloud';
    if (desc.includes('rain') || desc.includes('drizzle') || desc.includes('lluvia') || desc.includes('llovizna')) return 'rain';
    if (desc.includes('snow') || desc.includes('nieve')) return 'snow';
    return 'default';
  }

  translateDescription(description: string): string {
    const desc = description.toLowerCase().trim();
    
    // Casos compuestos comunes
    if (desc.includes('light rain shower')) return 'Chubasco Ligero';
    if (desc.includes('heavy rain shower')) return 'Chubasco Fuerte';
    if (desc.includes('moderate rain shower')) return 'Chubasco Moderado';
    if (desc.includes('rain shower')) return 'Chubascos';
    if (desc.includes('patchy light rain')) return 'Lluvia Ligera Aislada';
    if (desc.includes('patchy rain')) return 'Lluvia Aislada';
    if (desc.includes('light rain')) return 'Lluvia Ligera';
    if (desc.includes('moderate rain')) return 'Lluvia Moderada';
    if (desc.includes('heavy rain')) return 'Lluvia Fuerte';
    if (desc.includes('freezing rain')) return 'Lluvia Helada';
    if (desc.includes('drizzle')) return 'Llovizna';
    if (desc.includes('thunder')) return 'Tormenta Eléctrica';

    const map: Record<string, string> = {
      'clear': 'Despejado',
      'sunny': 'Soleado',
      'partly cloudy': 'Parcialmente Nublado',
      'cloudy': 'Nublado',
      'overcast': 'Cubierto / Nublado',
      'rain': 'Lluvia',
      'snow': 'Nieve',
      'mist': 'Neblina',
      'fog': 'Niebla'
    };
    return map[desc] || description;
  }
}
