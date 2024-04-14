<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <ScrollTop class="bg-primary" />
    <NuxtPage />
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
</style>
