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
html {
  @apply bg-light-100;
}

*::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

:root {
  --p-primary-color: #354f52;
  --p-focus-ring-shadow: transparent;
}
</style>
