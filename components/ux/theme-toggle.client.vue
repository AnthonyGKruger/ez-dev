<template>
  <UxFeatureToggle
    id="theme-toggle"
    name="theme-toggle"
    bottom="12px"
    right="0"
    type="theme"
    :checked-value="$colorMode.value === 'light'"
    @toggle="
      () =>
        $colorMode.value === 'dark'
          ? ($colorMode.preference = 'light')
          : ($colorMode.preference = 'dark')
    "
  />
</template>
