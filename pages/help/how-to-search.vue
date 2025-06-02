<template>
  <div class="min-h-screen bg-light dark:bg-dark-400">
    <!-- Header -->
    <div class="bg-primary py-12 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <h1 class="font-patuaOne text-4xl font-bold">
          {{ $t("HelpSearch.title") }}
        </h1>
        <p class="mt-4 font-robotoRegular text-lg text-light/80">
          {{ $t("HelpSearch.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-3 py-12">
      <div class="mx-auto max-w-4xl">
        <!-- Back to Help -->
        <div class="mb-8">
          <NuxtLink
            to="/help"
            class="font-robotoMedium inline-flex items-center text-primary hover:underline"
          >
            <i class="pi pi-arrow-left mr-2"></i>
            {{ $t("Common.backToHelp") }}
          </NuxtLink>
        </div>

        <!-- Search Basics -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpSearch.basics.title") }}
          </h2>
          <p class="mb-4 font-robotoRegular text-gray-600 dark:text-gray-400">
            {{ $t("HelpSearch.basics.content") }}
          </p>
          <ul class="space-y-3">
            <li
              v-for="step in searchSteps"
              :key="step"
              class="flex items-start"
            >
              <i class="pi pi-check-circle mr-3 mt-1 text-green-500"></i>
              <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
                {{ $t(step) }}
              </p>
            </li>
          </ul>
        </div>

        <!-- Search Filters -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpSearch.filters.title") }}
          </h2>
          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="filter in searchFilters"
              :key="filter.id"
              class="flex items-start"
            >
              <div
                class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <i :class="`pi pi-${filter.icon} text-sm`"></i>
              </div>
              <div>
                <h3
                  class="font-robotoMedium mb-2 text-lg font-semibold text-dark dark:text-light"
                >
                  {{ $t(filter.title) }}
                </h3>
                <p
                  class="font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
                >
                  {{ $t(filter.description) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Tips -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpSearch.tips.title") }}
          </h2>
          <div class="space-y-4">
            <div
              v-for="tip in searchTips"
              :key="tip.id"
              class="rounded-lg border border-gray-200 p-4 dark:border-gray-600"
            >
              <div class="mb-2 flex items-center">
                <div
                  class="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                >
                  <i :class="`pi pi-${tip.icon} text-xs`"></i>
                </div>
                <h3
                  class="font-robotoMedium font-semibold text-dark dark:text-light"
                >
                  {{ $t(tip.title) }}
                </h3>
              </div>
              <p
                class="font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
              >
                {{ $t(tip.description) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Related Help -->
        <div class="text-center">
          <div
            class="mx-auto max-w-2xl rounded-lg bg-gray-50 p-8 dark:bg-dark-300"
          >
            <h2
              class="mb-4 font-patuaOne text-2xl font-bold text-dark dark:text-light"
            >
              {{ $t("HelpSearch.related.title") }}
            </h2>
            <p class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400">
              {{ $t("HelpSearch.related.content") }}
            </p>
            <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <NuxtLink
                to="/contact-guide"
                class="font-robotoMedium hover:bg-primary-dark inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-light transition-colors"
              >
                {{ $t("HelpSearch.related.contactGuide") }}
              </NuxtLink>
              <NuxtLink
                to="/help/search-filters"
                class="font-robotoMedium inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 text-primary transition-colors hover:bg-primary hover:text-light"
              >
                {{ $t("HelpSearch.related.searchFilters") }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "base",
});

const { t } = useI18n();

useHead({
  title: t("HelpSearch.pageTitle"),
  meta: [{ name: "description", content: t("HelpSearch.pageDescription") }],
});

const searchSteps = [
  "HelpSearch.basics.steps.openSearch",
  "HelpSearch.basics.steps.enterKeywords",
  "HelpSearch.basics.steps.applyFilters",
  "HelpSearch.basics.steps.browseResults",
  "HelpSearch.basics.steps.selectHotel",
];

const searchFilters = [
  {
    id: 1,
    icon: "map-marker",
    title: "HelpSearch.filters.location.title",
    description: "HelpSearch.filters.location.description",
  },
  {
    id: 2,
    icon: "dollar",
    title: "HelpSearch.filters.price.title",
    description: "HelpSearch.filters.price.description",
  },
  {
    id: 3,
    icon: "star",
    title: "HelpSearch.filters.rating.title",
    description: "HelpSearch.filters.rating.description",
  },
  {
    id: 4,
    icon: "cog",
    title: "HelpSearch.filters.amenities.title",
    description: "HelpSearch.filters.amenities.description",
  },
];

const searchTips = [
  {
    id: 1,
    icon: "lightbulb",
    title: "HelpSearch.tips.keywords.title",
    description: "HelpSearch.tips.keywords.description",
  },
  {
    id: 2,
    icon: "filter",
    title: "HelpSearch.tips.filters.title",
    description: "HelpSearch.tips.filters.description",
  },
  {
    id: 3,
    icon: "shield",
    title: "HelpSearch.tips.verification.title",
    description: "HelpSearch.tips.verification.description",
  },
  {
    id: 4,
    icon: "heart",
    title: "HelpSearch.tips.save.title",
    description: "HelpSearch.tips.save.description",
  },
];
</script>
