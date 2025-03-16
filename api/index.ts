import { GET_WEATHER, SEARCH_LOCATION } from "@/constants/server";
import { Location, WeatherResponse } from "@/types";
import axios from "axios";

export const getWeather = async (
  name: string
): Promise<WeatherResponse | null> => {
  try {
    const url = `${GET_WEATHER}?search-term=${name}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch weather data", error);
    return null;
  }
};

export const searchLocation = async (search: string): Promise<Location[]> => {
  try {
    const response: { data: Location[] } = await axios.get(
      `${SEARCH_LOCATION}?search-term=${search}`
    );
    return response.data;
  } catch (error) {
    console.log("Failed to fetch location data", error);
    return [];
  }
};
