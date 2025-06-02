<template>
  <div class="min-h-screen bg-light dark:bg-dark-400">
    <!-- Header -->
    <div class="bg-primary py-12 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <h1 class="font-patuaOne text-4xl font-bold">
          {{ $t("HelpVerification.title") }}
        </h1>
        <p class="mt-4 font-robotoRegular text-lg text-light/80">
          {{ $t("HelpVerification.subtitle") }}
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

        <!-- What are Verification Badges -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpVerification.what.title") }}
          </h2>
          <p class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400">
            {{ $t("HelpVerification.what.content") }}
          </p>

          <!-- Verification Badge Example -->
          <div class="rounded-lg bg-gray-50 p-6 dark:bg-dark-400">
            <div class="flex items-center justify-center">
              <div
                class="flex items-center space-x-2 rounded-full bg-green-100 px-4 py-2 dark:bg-green-900"
              >
                <i
                  class="pi pi-shield-check text-green-600 dark:text-green-400"
                ></i>
                <span
                  class="font-robotoMedium text-sm text-green-800 dark:text-green-200"
                >
                  {{ $t("HelpVerification.badge.verified") }}
                </span>
              </div>
            </div>
            <p
              class="mt-4 text-center font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
            >
              {{ $t("HelpVerification.badge.example") }}
            </p>
          </div>
        </div>

        <!-- Verification Process -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpVerification.process.title") }}
          </h2>
          <div class="space-y-6">
            <div
              v-for="(step, index) in verificationSteps"
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

        <!-- Benefits for Travelers -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpVerification.benefits.title") }}
          </h2>
          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="benefit in verificationBenefits"
              :key="benefit.id"
              class="flex items-start"
            >
              <div
                class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
              >
                <i :class="`pi pi-${benefit.icon} text-sm`"></i>
              </div>
              <div>
                <h3
                  class="font-robotoMedium mb-2 text-lg font-semibold text-dark dark:text-light"
                >
                  {{ $t(benefit.title) }}
                </h3>
                <p
                  class="font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
                >
                  {{ $t(benefit.description) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- How to Identify -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpVerification.identify.title") }}
          </h2>
          <div class="space-y-4">
            <div
              v-for="location in badgeLocations"
              :key="location.id"
              class="rounded-lg border border-gray-200 p-4 dark:border-gray-600"
            >
              <div class="mb-2 flex items-center">
                <div
                  class="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                >
                  <i :class="`pi pi-${location.icon} text-xs`"></i>
                </div>
                <h3
                  class="font-robotoMedium font-semibold text-dark dark:text-light"
                >
                  {{ $t(location.title) }}
                </h3>
              </div>
              <p
                class="font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
              >
                {{ $t(location.description) }}
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
              {{ $t("HelpVerification.related.title") }}
            </h2>
            <p class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400">
              {{ $t("HelpVerification.related.content") }}
            </p>
            <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <NuxtLink
                to="/help/how-to-search"
                class="font-robotoMedium hover:bg-primary-dark inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-light transition-colors"
              >
                {{ $t("HelpVerification.related.searchGuide") }}
              </NuxtLink>
              <NuxtLink
                to="/contact-policy"
                class="font-robotoMedium inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 text-primary transition-colors hover:bg-primary hover:text-light"
              >
                {{ $t("HelpVerification.related.contactPolicy") }}
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
  title: t("HelpVerification.pageTitle"),
  meta: [
    { name: "description", content: t("HelpVerification.pageDescription") },
  ],
});

const verificationSteps = [
  {
    id: 1,
    title: "HelpVerification.process.steps.application.title",
    description: "HelpVerification.process.steps.application.description",
  },
  {
    id: 2,
    title: "HelpVerification.process.steps.documentation.title",
    description: "HelpVerification.process.steps.documentation.description",
  },
  {
    id: 3,
    title: "HelpVerification.process.steps.review.title",
    description: "HelpVerification.process.steps.review.description",
  },
  {
    id: 4,
    title: "HelpVerification.process.steps.approval.title",
    description: "HelpVerification.process.steps.approval.description",
  },
];

const verificationBenefits = [
  {
    id: 1,
    icon: "shield",
    title: "HelpVerification.benefits.trust.title",
    description: "HelpVerification.benefits.trust.description",
  },
  {
    id: 2,
    icon: "check-circle",
    title: "HelpVerification.benefits.quality.title",
    description: "HelpVerification.benefits.quality.description",
  },
  {
    id: 3,
    icon: "star",
    title: "HelpVerification.benefits.reliability.title",
    description: "HelpVerification.benefits.reliability.description",
  },
  {
    id: 4,
    icon: "phone",
    title: "HelpVerification.benefits.contact.title",
    description: "HelpVerification.benefits.contact.description",
  },
];

const badgeLocations = [
  {
    id: 1,
    icon: "th-large",
    title: "HelpVerification.identify.locations.searchResults.title",
    description:
      "HelpVerification.identify.locations.searchResults.description",
  },
  {
    id: 2,
    icon: "file",
    title: "HelpVerification.identify.locations.hotelPage.title",
    description: "HelpVerification.identify.locations.hotelPage.description",
  },
  {
    id: 3,
    icon: "home",
    title: "HelpVerification.identify.locations.homepage.title",
    description: "HelpVerification.identify.locations.homepage.description",
  },
];
</script>
