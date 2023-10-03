import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

describe('WeatherService', () => {
  let service: WeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule], // Include HttpClientModule
      providers: [WeatherService],
    });

    // Inject the service and test controller
    service = TestBed.inject(WeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // Rest of your tests...
  it('should create weather service', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to the OpenWeatherMap API with the correct URL and parameters', () => {
    const city = 'New York';

    service.getWeatherDataForCity(city).subscribe();

    const req = httpTestingController.expectOne((request) => {
      return (
        request.url === 'https://api.openweathermap.org/data/2.5/weather' &&
        request.method === 'GET' &&
        request.params.get('q') === city &&
        request.params.get('appid') === service['apiKey']
      );
    });

    req.flush({});
  });

  it('should return the weather data when a successful response is received', () => {
    const city = 'New York';
    const dummyWeatherData = {
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
    };

    service.getWeatherDataForCity(city).subscribe((weatherData) => {
      expect(weatherData).toEqual(dummyWeatherData);
    });

    const req = httpTestingController.expectOne((request) => {
      return (
        request.url === 'https://api.openweathermap.org/data/2.5/weather' &&
        request.method === 'GET'
      );
    });

    req.flush(dummyWeatherData);
  });
});
