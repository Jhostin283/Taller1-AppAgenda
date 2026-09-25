import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CityWeather {
  city: string;
  country: string;
  temperature: number;
  description: string;
}

export interface PredictionResponse {
  location: string;
  date: string;
  predictedVisitors: number;
  forecast: CityWeather;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private apiUrl = '/api/weather';
  private predictionUrl = '/api/prediction/visitors';

  getCountries(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/countries`);
  }

  getCitiesForCountry(country: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cities/${country}`);
  }

  getWeatherForCity(country: string, city: string): Observable<CityWeather> {
    return this.http.get<CityWeather>(`${this.apiUrl}/${country}/${city}`);
  }

  predictVisitors(country: string, city: string, location: string, date: string): Observable<PredictionResponse> {
    return this.http.get<PredictionResponse>(`${this.predictionUrl}?country=${country}&city=${city}&location=${location}&date=${date}`);
  }
}
