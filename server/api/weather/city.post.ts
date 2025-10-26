import { WeatherResponse } from "~/types/weather-app";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const API_KEY = config.openWeatherApiKey;
  const BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

  if (!API_KEY) {
    throw createError({
      statusCode: 500,
      message: "OpenWeather API key is not configured",
    });
  }

  // Get query parameter
  const { city } = await readBody(event);
  if (!city) {
    throw createError({
      statusCode: 400,
      message: "City parameter is required",
    });
  }

  try {
    // First, get coordinates for the city
    const geoResponse = await $fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`,
    );
    console.log(geoResponse);
    if (!geoResponse || geoResponse.length === 0) {
      throw createError({
        statusCode: 404,
        message: "City not found",
      });
    }

    const { lat, lon } = geoResponse[0];

    // Then fetch weather data
    return await $fetch<WeatherResponse>(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&exclude=minutely`,
    );
  } catch (error) {
    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        message: `Failed to fetch weather data: ${error.message}`,
      });
    }
    throw createError({
      statusCode: 500,
      message: "Failed to fetch weather data",
    });
  }
});
