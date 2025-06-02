<template>
  <div class="min-h-screen bg-light dark:bg-primary">
    <!-- Hero Section -->
    <div class="bg-primary py-20 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <h1 class="font-patuaOne text-5xl font-bold">
          {{ $t("About.hero.title") }}
        </h1>
        <p class="mt-6 font-robotoRegular text-xl text-light/90">
          {{ $t("About.hero.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Mission Statement -->
    <div class="py-16">
      <div class="container mx-auto px-3">
        <div class="mx-auto max-w-4xl text-center">
          <h2
            class="mb-8 font-patuaOne text-3xl font-bold text-dark dark:text-light"
          >
            {{ $t("About.mission.title") }}
          </h2>
          <p
            class="font-robotoRegular text-lg text-gray-600 dark:text-gray-400"
          >
            {{ $t("About.mission.content") }}
          </p>
        </div>
      </div>
    </div>

    <!-- Our Story -->
    <div class="bg-gray-50 py-16 dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <div class="mx-auto max-w-4xl">
          <h2
            class="mb-12 text-center font-patuaOne text-3xl font-bold text-dark dark:text-light"
          >
            {{ $t("About.story.title") }}
          </h2>
          <div class="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div class="space-y-6">
              <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
                {{ $t("About.story.paragraph1") }}
              </p>
              <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
                {{ $t("About.story.paragraph2") }}
              </p>
              <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
                {{ $t("About.story.paragraph3") }}
              </p>
            </div>
            <div class="flex justify-center">
              <img
                src="~/assets/images/minimal-logo.svg"
                alt="Hotel Swiss Logo"
                class="h-64 w-64 invert dark:invert-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- What Makes Us Different -->
    <div class="py-16">
      <div class="container mx-auto px-3">
        <div class="mx-auto max-w-6xl">
          <h2
            class="mb-12 text-center font-patuaOne text-3xl font-bold text-dark dark:text-light"
          >
            {{ $t("About.differentiators.title") }}
          </h2>
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="feature in features"
              :key="feature.id"
              class="rounded-lg bg-white p-8 text-center shadow-md dark:bg-dark-300"
            >
              <div class="mb-6 flex justify-center">
                <div
                  class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <i :class="`pi pi-${feature.icon} text-2xl`"></i>
                </div>
              </div>
              <h3
                class="mb-4 font-patuaOne text-xl font-bold text-dark dark:text-light"
              >
                {{ $t(feature.title) }}
              </h3>
              <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
                {{ $t(feature.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Our Values -->
    <div class="bg-gray-50 py-16 dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <div class="mx-auto max-w-4xl">
          <h2
            class="mb-12 text-center font-patuaOne text-3xl font-bold text-dark dark:text-light"
          >
            {{ $t("About.values.title") }}
          </h2>
          <div class="space-y-8">
            <div
              v-for="value in values"
              :key="value.id"
              class="flex items-start"
            >
              <div
                class="mr-6 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-light"
              >
                <i :class="`pi pi-${value.icon} text-lg`"></i>
              </div>
              <div>
                <h3
                  class="mb-3 font-patuaOne text-xl font-bold text-dark dark:text-light"
                >
                  {{ $t(value.title) }}
                </h3>
                <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
                  {{ $t(value.description) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="py-16">
      <div class="container mx-auto px-3">
        <div class="mx-auto max-w-4xl">
          <h2
            class="mb-12 text-center font-patuaOne text-3xl font-bold text-dark dark:text-light"
          >
            {{ $t("About.statistics.title") }}
          </h2>
          <div class="grid gap-8 md:grid-cols-4">
            <div v-for="stat in statistics" :key="stat.id" class="text-center">
              <div class="mb-3 font-patuaOne text-4xl font-bold text-primary">
                {{ $t(stat.number) }}
              </div>
              <div
                class="font-robotoMedium text-lg font-semibold text-dark dark:text-light"
              >
                {{ $t(stat.label) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact CTA -->
    <div class="bg-primary py-16 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <div class="mx-auto max-w-2xl">
          <h2 class="mb-6 font-patuaOne text-3xl font-bold">
            {{ $t("About.cta.title") }}
          </h2>
          <p class="mb-8 font-robotoRegular text-lg text-light/90">
            {{ $t("About.cta.subtitle") }}
          </p>
          <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <NuxtLink
              to="/search"
              class="font-robotoMedium inline-flex items-center justify-center rounded-lg bg-light px-8 py-4 text-primary transition-colors hover:bg-gray-100"
            >
              {{ $t("About.cta.startExploring") }}
              <i class="pi pi-arrow-right ml-2"></i>
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="font-robotoMedium inline-flex items-center justify-center rounded-lg border border-light px-8 py-4 text-light transition-colors hover:bg-light/10"
            >
              {{ $t("About.cta.contactUs") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
  layout: "base",
});

useHead({
  title: t("About.pageTitle"),
  meta: [{ name: "description", content: t("About.pageDescription") }],
});

const features = [
  {
    id: 1,
    icon: "link",
    title: "About.features.directContact.title",
    description: "About.features.directContact.description",
  },
  {
    id: 2,
    icon: "shield",
    title: "About.features.verified.title",
    description: "About.features.verified.description",
  },
  {
    id: 3,
    icon: "globe",
    title: "About.features.multilingual.title",
    description: "About.features.multilingual.description",
  },
  {
    id: 4,
    icon: "heart",
    title: "About.features.local.title",
    description: "About.features.local.description",
  },
  {
    id: 5,
    icon: "mobile",
    title: "About.features.technology.title",
    description: "About.features.technology.description",
  },
  {
    id: 6,
    icon: "users",
    title: "About.features.community.title",
    description: "About.features.community.description",
  },
];

const values = [
  {
    id: 1,
    icon: "eye",
    title: "About.values.transparency.title",
    description: "About.values.transparency.description",
  },
  {
    id: 2,
    icon: "star",
    title: "About.values.quality.title",
    description: "About.values.quality.description",
  },
  {
    id: 3,
    icon: "users",
    title: "About.values.community.title",
    description: "About.values.community.description",
  },
  {
    id: 4,
    icon: "refresh",
    title: "About.values.innovation.title",
    description: "About.values.innovation.description",
  },
];

const statistics = [
  {
    id: 1,
    number: "About.stats.hotels.number",
    label: "About.stats.hotels.label",
  },
  {
    id: 2,
    number: "About.stats.cantons.number",
    label: "About.stats.cantons.label",
  },
  {
    id: 3,
    number: "About.stats.languages.number",
    label: "About.stats.languages.label",
  },
  {
    id: 4,
    number: "About.stats.contacts.number",
    label: "About.stats.contacts.label",
  },
];
</script>
