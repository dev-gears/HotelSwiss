<template>
  <div class="min-h-screen bg-light dark:bg-primary">
    <!-- Hero Section -->
    <div class="bg-primary py-20 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <h1 class="font-patuaOne text-5xl font-bold">
          {{ $t("Discovery.hero.title") }}
        </h1>
        <p class="mt-6 font-robotoRegular text-xl text-light/90">
          {{ $t("Discovery.hero.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Discovery Sections -->
    <div class="container mx-auto flex flex-col gap-3 px-3 py-16">
      <!-- Discover by Categories -->
      <DiscoverByCategories />

      <!-- Discover by Cantons -->
      <DiscoverByCantons />
    </div>
  </div>
</template>

<script setup lang="ts">
import DiscoverByCategories from "~/components/Search/Discovery/DiscoverByCategories.vue";
import DiscoverByCantons from "~/components/Search/Discovery/DiscoverByCantons.vue";

const { t } = useI18n();

useSeoMeta({
  title: () => `${t("Discovery.hero.title")} - Hotel Swiss`,
  description: () => t("Discovery.hero.subtitle"),
  ogTitle: () => `${t("Discovery.hero.title")} - Hotel Swiss`,
  ogDescription: () => t("Discovery.hero.subtitle"),
  ogType: "website",
  twitterCard: "summary_large_image",
});

definePageMeta({
  layout: "base",
});
</script>
