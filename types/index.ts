import { WeatherResponse } from "./weather";
export enum WeatherCondition {
  CLEAR = "CLEAR",
  CLOUDY = "CLOUDY",
  RAIN = "RAIN",
  SNOW = "SNOW",
  STORM = "STORM",
  WINDY = "WINDY",
}

export const TemperatureCode = {
  1000: WeatherCondition.CLEAR,
  1030: WeatherCondition.CLOUDY,
  1100: WeatherCondition.CLEAR,
  1200: WeatherCondition.CLOUDY,
  1300: WeatherCondition.WINDY,
  1400: WeatherCondition.CLOUDY,
  1500: WeatherCondition.SNOW,
  2100: WeatherCondition.RAIN,
  2200: WeatherCondition.RAIN,
  2300: WeatherCondition.RAIN,
  2400: WeatherCondition.SNOW,
  2500: WeatherCondition.SNOW,
  3100: WeatherCondition.RAIN,
  3200: WeatherCondition.RAIN,
  3300: WeatherCondition.RAIN,
  3400: WeatherCondition.SNOW,
  3500: WeatherCondition.SNOW,
  4100: WeatherCondition.SNOW,
  4200: WeatherCondition.SNOW,
  4300: WeatherCondition.SNOW,
  4400: WeatherCondition.SNOW,
  5100: WeatherCondition.RAIN,
  5200: WeatherCondition.SNOW,
  6100: WeatherCondition.STORM,
  6200: WeatherCondition.STORM,
  6300: WeatherCondition.STORM,
} as const;

export type TemperatureCodeKey = keyof typeof TemperatureCode;

export interface Location {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export { WeatherResponse };
