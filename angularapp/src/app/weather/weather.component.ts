import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  cityName: string = '';
  weatherData: any;
  errorMessage: string = '';
  currentDate: Date = new Date(); // Define and initialize currentDate

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {}

  searchCityWeather() {
    if (this.cityName.trim() === '') {
      this.errorMessage = '*Required';
      this.weatherData = null; // Clear any previous weather data
    } else {
      this.weatherService
        .getWeatherDataForCity(this.cityName)
        .subscribe((data) => {
          this.weatherData = data;
          this.errorMessage = '';
        });
    }
  }
}
