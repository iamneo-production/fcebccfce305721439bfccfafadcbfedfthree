import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = 'dd94f859a0e52d6e4767fddf735f04a7'; // Replace with your OpenWeatherMap API key
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherDataForCity(city: string): Observable<any> {
    // Define the query parameters including the API key
    const params = {
      q: city,
      appid: this.apiKey,
    };

    // Make the GET request to the OpenWeatherMap API
    return this.http.get(this.apiUrl, { params });
  }
}
