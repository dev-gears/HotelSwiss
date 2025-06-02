<template>
  <div class="flex min-h-screen flex-col justify-between">
    <div class="bg-light-100 dark:bg-primary">
      <Header />
      <div class="container mx-auto px-3">
        <SearchSection />
      </div>
      <slot />
    </div>
    <Footer />
    <ScrollTop />
  </div>
</template>

<script setup lang="ts">
import ScrollTop from "primevue/scrolltop";
import SearchSection from "~/components/Search/SearchSection.vue";
</script>
