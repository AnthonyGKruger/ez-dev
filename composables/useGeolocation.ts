export default () => {
  const location = useState<{ lat: number; lon: number } | null>(
    "userLocation",
    () => null,
  );
  const isLocationLoading = ref(false);
  const locationError = ref<string | null>(null);

  const requestLocation = (): Promise<{ lat: number; lon: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        locationError.value = "Geolocation is not supported by your browser";
        resolve(null);
        return;
      }

      isLocationLoading.value = true;
      locationError.value = null;

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          location.value = { lat: latitude, lon: longitude };
          isLocationLoading.value = false;
          resolve({ lat: latitude, lon: longitude });
        },
        (error) => {
          isLocationLoading.value = false;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              locationError.value =
                "Location access denied. Please enable location permissions to use this feature.";
              break;
            case error.POSITION_UNAVAILABLE:
              locationError.value = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              locationError.value =
                "The request to get user location timed out.";
              break;
            default:
              locationError.value =
                "An unknown error occurred while retrieving location.";
              break;
          }
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        },
      );
    });
  };

  return {
    location,
    isLocationLoading,
    locationError,
    requestLocation,
  };
};
