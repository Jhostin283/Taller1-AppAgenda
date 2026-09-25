import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, PredictionResponse } from '../weather.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-visitor-prediction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visitor-prediction.component.html',
  styleUrl: './visitor-prediction.component.scss'
})
export class VisitorPredictionComponent implements OnInit {
  private weatherService = inject(WeatherService);

  predictions = signal<PredictionResponse[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  locationName = 'Mirador San Francisco';
  city = 'Tingo Maria';
  country = 'Peru';
  
  startDate: Date = new Date();

  ngOnInit() {
    this.loadWeekPredictions();
  }
  
  getMinDate(): string {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 2); // Hasta 2 años en el pasado
    return d.toISOString().split('T')[0];
  }

  getMaxDate(): string {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 2); // Hasta 2 años en el futuro
    return d.toISOString().split('T')[0];
  }

  onDateSelected(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    if (val) {
      // Create local date precisely
      const parts = val.split('-');
      this.startDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      this.loadWeekPredictions();
    }
  }

  loadWeekPredictions() {
    this.loading.set(true);
    this.error.set(null);

    const requests = [];
    // Generar las 7 fechas a partir de la fecha seleccionada
    for (let i = 0; i < 7; i++) {
      const d = new Date(this.startDate);
      d.setDate(d.getDate() + i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      requests.push(this.weatherService.predictVisitors(this.country, this.city, this.locationName, dateStr));
    }

    forkJoin(requests).subscribe({
      next: (responses) => {
        this.predictions.set(responses);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudo cargar el pronóstico de 7 días. Intente más tarde.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  getWeatherIconType(description: string): string {
    const desc = description.toLowerCase();
    if (desc.includes('lluvia') || desc.includes('llovizna') || desc.includes('chubasco') || desc.includes('rain')) return 'rain';
    if (desc.includes('nub') || desc.includes('cubierto') || desc.includes('cloud') || desc.includes('overcast')) return 'cloud';
    if (desc.includes('niev') || desc.includes('hielo') || desc.includes('snow')) return 'snow';
    if (desc.includes('tormenta') || desc.includes('trueno') || desc.includes('thunder')) return 'thunder';
    return 'sun';
  }

  getCapacityStatus(visitors: number): { text: string, color: string } {
    if (visitors > 500) return { text: 'Alta', color: 'text-red-600 bg-red-100' };
    if (visitors > 200) return { text: 'Media', color: 'text-yellow-700 bg-yellow-100' };
    return { text: 'Baja', color: 'text-green-700 bg-green-100' };
  }

  getDayName(dateStr: string): string {
    const date = new Date(dateStr + 'T00:00:00'); // Parse as local timezone precisely
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  }
}
