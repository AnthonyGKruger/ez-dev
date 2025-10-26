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

  // Get query parameters
  const { lat, lon } = getQuery(event);

  if (!lat || !lon || typeof lat !== "string" || typeof lon !== "string") {
    throw createError({
      statusCode: 400,
      message: "Latitude and longitude parameters are required",
    });
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    throw createError({
      statusCode: 400,
      message: "Invalid latitude or longitude",
    });
  }

  try {
    return await $fetch<WeatherResponse>(
      `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&exclude=minutely`,
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
