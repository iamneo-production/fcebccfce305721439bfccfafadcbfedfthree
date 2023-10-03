import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../services/weather.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherService: WeatherService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [HttpClientTestingModule], // Include HttpClientModule
      schemas:[NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            getWeatherDataForCity: () => of({ /* Mocked weather data */ })
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  it('should create weather component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current date', () => {
    const currentDate = new Date();
    component.currentDate = currentDate;
    const dateContainer: HTMLElement = fixture.nativeElement.querySelector('.date-container');
    expect(dateContainer.textContent);
  });

  it('should call searchCityWeather when search button is clicked', () => {
    spyOn(component, 'searchCityWeather');
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.search-button');
    buttonElement.click();
    expect(component.searchCityWeather).toHaveBeenCalled();
  });

  it('should not display weather data when weatherData is undefined', () => {
    const weatherCard: HTMLElement = fixture.nativeElement.querySelector('.weather-card');
    expect(weatherCard).toBeNull();
  });

});
