<template>
  <div class="min-h-screen bg-light dark:bg-dark-400">
    <!-- Header -->
    <div class="bg-primary py-12 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <h1 class="font-patuaOne text-4xl font-bold">
          {{ $t("HelpFilters.title") }}
        </h1>
        <p class="mt-4 font-robotoRegular text-lg text-light/80">
          {{ $t("HelpFilters.subtitle") }}
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

        <!-- Filter Types -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpFilters.types.title") }}
          </h2>
          <p class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400">
            {{ $t("HelpFilters.types.content") }}
          </p>

          <!-- Filter Type Cards -->
          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="filter in filterTypes"
              :key="filter.id"
              class="rounded-lg border border-gray-200 p-6 dark:border-gray-600"
            >
              <div class="mb-4 flex items-center">
                <div
                  class="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                >
                  <i :class="`pi pi-${filter.icon} text-lg`"></i>
                </div>
                <h3
                  class="font-patuaOne text-xl font-semibold text-dark dark:text-light"
                >
                  {{ $t(filter.title) }}
                </h3>
              </div>
              <p
                class="mb-3 font-robotoRegular text-gray-600 dark:text-gray-400"
              >
                {{ $t(filter.description) }}
              </p>
              <div class="mt-4 flex flex-wrap gap-2">
                <div
                  v-for="example in filter.examples"
                  :key="example"
                  class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {{ $t(example) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- How to Use Filters -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpFilters.howTo.title") }}
          </h2>
          <div class="space-y-6">
            <div
              v-for="(step, index) in filterSteps"
              :key="step.id"
              class="flex items-start"
            >
              <div
                class="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-light"
              >
                {{ index + 1 }}
              </div>
              <div>
                <h3
                  class="font-robotoMedium mb-2 text-lg font-semibold text-dark dark:text-light"
                >
                  {{ $t(step.title) }}
                </h3>
                <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
                  {{ $t(step.description) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter Tips -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpFilters.tips.title") }}
          </h2>
          <ul class="space-y-4">
            <li
              v-for="tip in filterTips"
              :key="tip.id"
              class="flex items-start"
            >
              <i class="pi pi-check-circle mr-3 mt-1 text-green-500"></i>
              <div>
                <h4
                  class="font-robotoMedium mb-1 font-semibold text-dark dark:text-light"
                >
                  {{ $t(tip.title) }}
                </h4>
                <p
                  class="font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
                >
                  {{ $t(tip.description) }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Related Help -->
        <div class="text-center">
          <div
            class="mx-auto max-w-2xl rounded-lg bg-gray-50 p-8 dark:bg-dark-300"
          >
            <h2
              class="mb-4 font-patuaOne text-2xl font-bold text-dark dark:text-light"
            >
              {{ $t("HelpFilters.related.title") }}
            </h2>
            <p class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400">
              {{ $t("HelpFilters.related.content") }}
            </p>
            <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <NuxtLink
                to="/help/how-to-search"
                class="font-robotoMedium hover:bg-primary-dark inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-light transition-colors"
              >
                {{ $t("HelpFilters.related.searchGuide") }}
              </NuxtLink>
              <NuxtLink
                to="/help/verification-badges"
                class="font-robotoMedium inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 text-primary transition-colors hover:bg-primary hover:text-light"
              >
                {{ $t("HelpFilters.related.verificationBadges") }}
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
  title: t("HelpFilters.pageTitle"),
  meta: [{ name: "description", content: t("HelpFilters.pageDescription") }],
});

const filterTypes = [
  {
    id: 1,
    icon: "map-marker",
    title: "HelpFilters.types.location.title",
    description: "HelpFilters.types.location.description",
    examples: [
      "HelpFilters.types.location.examples.zurich",
      "HelpFilters.types.location.examples.geneva",
      "HelpFilters.types.location.examples.bern",
    ],
  },
  {
    id: 2,
    icon: "dollar",
    title: "HelpFilters.types.price.title",
    description: "HelpFilters.types.price.description",
    examples: [
      "HelpFilters.types.price.examples.budget",
      "HelpFilters.types.price.examples.mid",
      "HelpFilters.types.price.examples.luxury",
    ],
  },
  {
    id: 3,
    icon: "star",
    title: "HelpFilters.types.star.title",
    description: "HelpFilters.types.star.description",
    examples: [
      "HelpFilters.types.star.examples.five",
      "HelpFilters.types.star.examples.four",
      "HelpFilters.types.star.examples.three",
    ],
  },
  {
    id: 4,
    icon: "list",
    title: "HelpFilters.types.amenities.title",
    description: "HelpFilters.types.amenities.description",
    examples: [
      "HelpFilters.types.amenities.examples.wifi",
      "HelpFilters.types.amenities.examples.parking",
      "HelpFilters.types.amenities.examples.pool",
    ],
  },
];

const filterSteps = [
  {
    id: 1,
    title: "HelpFilters.howTo.steps.open.title",
    description: "HelpFilters.howTo.steps.open.description",
  },
  {
    id: 2,
    title: "HelpFilters.howTo.steps.select.title",
    description: "HelpFilters.howTo.steps.select.description",
  },
  {
    id: 3,
    title: "HelpFilters.howTo.steps.apply.title",
    description: "HelpFilters.howTo.steps.apply.description",
  },
  {
    id: 4,
    title: "HelpFilters.howTo.steps.adjust.title",
    description: "HelpFilters.howTo.steps.adjust.description",
  },
  {
    id: 5,
    title: "HelpFilters.howTo.steps.clear.title",
    description: "HelpFilters.howTo.steps.clear.description",
  },
];

const filterTips = [
  {
    id: 1,
    title: "HelpFilters.tips.combine.title",
    description: "HelpFilters.tips.combine.description",
  },
  {
    id: 2,
    title: "HelpFilters.tips.prioritize.title",
    description: "HelpFilters.tips.prioritize.description",
  },
  {
    id: 3,
    title: "HelpFilters.tips.verfication.title",
    description: "HelpFilters.tips.verfication.description",
  },
  {
    id: 4,
    title: "HelpFilters.tips.remember.title",
    description: "HelpFilters.tips.remember.description",
  },
];
</script>
