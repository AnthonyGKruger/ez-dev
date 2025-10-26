import type { WeatherResponse } from "~/types/weather-app";

export default () => {
  const fetchWeatherByCity = async (city: string): Promise<WeatherResponse> => {
    try {
      return await $fetch<WeatherResponse>(`/api/weather/city`, {
        method: "POST",
        body: { city },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch weather data: ${error.message}`);
      }
      throw new Error("Failed to fetch weather data");
    }
  };

  const fetchWeatherByCoordinates = async (
    lat: number,
    lon: number,
  ): Promise<WeatherResponse> => {
    try {
      return await $fetch<WeatherResponse>("/api/weather", {
        query: { lat: lat.toString(), lon: lon.toString() },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch weather data: ${error.message}`);
      }
      throw new Error("Failed to fetch weather data");
    }
  };

  return {
    fetchWeatherByCity,
    fetchWeatherByCoordinates,
  };
};
