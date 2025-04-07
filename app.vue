<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
    <ScrollTop
      class="light-ripple"
      :pt="{
        root: '!bg-primary !text-light !rounded-full !p-2 !z-50 !shadow-cardImage light-ripple',
        transition: '!transition-all !duration-300 !ease-in-out',
      }"
    />
  </NuxtLayout>
</template>

<style>
:root {
  --p-primary-color: #354f52;
  --p-focus-ring-shadow: transparent;
}

.dark {
  --p-primary-color: #26393b;
}

html {
  @apply bg-light-100 dark:bg-dark-100;
}

body {
  @apply bg-light-100 dark:bg-dark-100;
}

*::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
