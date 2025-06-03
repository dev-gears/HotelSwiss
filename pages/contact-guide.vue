<template>
  <div class="min-h-screen bg-light dark:bg-dark-400">
    <CommonHead
      title="Contact Guide - Hotel Swiss"
      description="A comprehensive guide on how to contact Hotel Swiss, reach our support team, and get the assistance you need for your Swiss hotel booking."
      url="https://hotelswiss.ch/contact-guide"
    />
    <!-- Header -->
    <div class="bg-primary py-12 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <h1 class="font-patuaOne text-4xl font-bold">
          {{ $t("ContactGuide.title") }}
        </h1>
        <p class="mt-4 font-robotoRegular text-lg text-light/80">
          {{ $t("ContactGuide.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-3 py-12">
      <div class="mx-auto max-w-4xl">
        <!-- Introduction -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-4 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("ContactGuide.introduction.title") }}
          </h2>
          <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
            {{ $t("ContactGuide.introduction.content") }}
          </p>
        </div>

        <!-- Step-by-Step Guide -->
        <div class="mb-12">
          <h2
            class="mb-8 text-center font-patuaOne text-3xl font-bold text-dark dark:text-light"
          >
            {{ $t("ContactGuide.stepByStep.title") }}
          </h2>
          <div class="space-y-8">
            <div
              v-for="(step, index) in contactSteps"
              :key="step.id"
              class="flex items-start"
            >
              <div
                class="mr-6 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-light"
              >
                {{ index + 1 }}
              </div>
              <div
                class="flex-1 rounded-lg bg-white p-6 shadow-md dark:bg-dark-300"
              >
                <h3
                  class="mb-3 font-patuaOne text-xl font-semibold text-dark dark:text-light"
                >
                  {{ $t(step.title) }}
                </h3>
                <p
                  class="mb-4 font-robotoRegular text-gray-600 dark:text-gray-400"
                >
                  {{ $t(step.description) }}
                </p>
                <ul v-if="step.tips" class="space-y-2">
                  <li
                    v-for="tip in step.tips"
                    :key="tip"
                    class="flex items-start font-robotoRegular text-sm text-gray-500 dark:text-gray-400"
                  >
                    <i
                      class="pi pi-check-circle mr-2 mt-0.5 text-green-500"
                    ></i>
                    {{ $t(tip) }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Practices -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("ContactGuide.bestPractices.title") }}
          </h2>
          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="practice in bestPractices"
              :key="practice.id"
              class="flex items-start"
            >
              <div
                class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
              >
                <i :class="`pi pi-${practice.icon} text-sm`"></i>
              </div>
              <div>
                <h3
                  class="font-robotoMedium mb-2 text-lg font-semibold text-dark dark:text-light"
                >
                  {{ $t(practice.title) }}
                </h3>
                <p
                  class="font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
                >
                  {{ $t(practice.description) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Common Issues -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("ContactGuide.commonIssues.title") }}
          </h2>
          <div class="space-y-6">
            <div
              v-for="issue in commonIssues"
              :key="issue.id"
              class="border-l-4 border-orange-400 bg-orange-50 p-4 dark:bg-orange-900/20"
            >
              <h3
                class="font-robotoMedium mb-2 font-semibold text-orange-800 dark:text-orange-400"
              >
                {{ $t(issue.title) }}
              </h3>
              <p
                class="mb-3 font-robotoRegular text-sm text-orange-700 dark:text-orange-300"
              >
                {{ $t(issue.problem) }}
              </p>
              <p
                class="font-robotoRegular text-sm text-orange-600 dark:text-orange-400"
              >
                <strong>{{ $t("ContactGuide.solution") }}:</strong>
                {{ $t(issue.solution) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Need More Help -->
        <div class="text-center">
          <div
            class="mx-auto max-w-2xl rounded-lg bg-gray-50 p-8 dark:bg-dark-300"
          >
            <h2
              class="mb-4 font-patuaOne text-2xl font-bold text-dark dark:text-light"
            >
              {{ $t("ContactGuide.needHelp.title") }}
            </h2>
            <p class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400">
              {{ $t("ContactGuide.needHelp.content") }}
            </p>
            <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <NuxtLink
                to="/contact"
                class="font-robotoMedium hover:bg-primary-dark inline-flex items-center rounded-lg bg-primary px-6 py-3 text-light transition-colors"
              >
                {{ $t("ContactPolicy.support.contactUs") }}
                <i class="pi pi-arrow-right ml-2"></i>
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

// SEO
useHead({
  title: t("ContactGuide.pageTitle"),
  meta: [{ name: "description", content: t("ContactGuide.pageDescription") }],
});

const contactSteps = [
  {
    id: 1,
    title: "ContactGuide.steps.search.title",
    description: "ContactGuide.steps.search.description",
    tips: [
      "ContactGuide.steps.search.tips.useFilters",
      "ContactGuide.steps.search.tips.checkVerification",
      "ContactGuide.steps.search.tips.readReviews",
    ],
  },
  {
    id: 2,
    title: "ContactGuide.steps.selectHotel.title",
    description: "ContactGuide.steps.selectHotel.description",
    tips: [
      "ContactGuide.steps.selectHotel.tips.checkAmenities",
      "ContactGuide.steps.selectHotel.tips.verifyLocation",
      "ContactGuide.steps.selectHotel.tips.compareOptions",
    ],
  },
  {
    id: 3,
    title: "ContactGuide.steps.initiateContact.title",
    description: "ContactGuide.steps.initiateContact.description",
    tips: [
      "ContactGuide.steps.initiateContact.tips.clearMessage",
      "ContactGuide.steps.initiateContact.tips.includeDates",
      "ContactGuide.steps.initiateContact.tips.mentionRequirements",
    ],
  },
  {
    id: 4,
    title: "ContactGuide.steps.followUp.title",
    description: "ContactGuide.steps.followUp.description",
    tips: [
      "ContactGuide.steps.followUp.tips.waitPatient",
      "ContactGuide.steps.followUp.tips.checkSpam",
      "ContactGuide.steps.followUp.tips.keepRecords",
    ],
  },
];

const bestPractices = [
  {
    id: 1,
    icon: "clock",
    title: "ContactGuide.bestPractices.timing.title",
    description: "ContactGuide.bestPractices.timing.description",
  },
  {
    id: 2,
    icon: "file-edit",
    title: "ContactGuide.bestPractices.communication.title",
    description: "ContactGuide.bestPractices.communication.description",
  },
  {
    id: 3,
    icon: "shield",
    title: "ContactGuide.bestPractices.verification.title",
    description: "ContactGuide.bestPractices.verification.description",
  },
  {
    id: 4,
    icon: "users",
    title: "ContactGuide.bestPractices.courtesy.title",
    description: "ContactGuide.bestPractices.courtesy.description",
  },
];

const commonIssues = [
  {
    id: 1,
    title: "ContactGuide.issues.noResponse.title",
    problem: "ContactGuide.issues.noResponse.problem",
    solution: "ContactGuide.issues.noResponse.solution",
  },
  {
    id: 2,
    title: "ContactGuide.issues.unavailability.title",
    problem: "ContactGuide.issues.unavailability.problem",
    solution: "ContactGuide.issues.unavailability.solution",
  },
  {
    id: 3,
    title: "ContactGuide.issues.pricing.title",
    problem: "ContactGuide.issues.pricing.problem",
    solution: "ContactGuide.issues.pricing.solution",
  },
];
</script>
