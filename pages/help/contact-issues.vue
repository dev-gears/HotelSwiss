<template>
  <div class="min-h-screen bg-light dark:bg-dark-400">
    <!-- Header -->
    <div class="bg-primary py-12 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <h1 class="font-patuaOne text-4xl font-bold">
          {{ $t("HelpContactIssues.title") }}
        </h1>
        <p class="mt-4 font-robotoRegular text-lg text-light/80">
          {{ $t("HelpContactIssues.subtitle") }}
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

        <!-- Common Contact Issues -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpContactIssues.common.title") }}
          </h2>
          <p class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400">
            {{ $t("HelpContactIssues.common.content") }}
          </p>

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
                <strong>{{ $t("HelpContactIssues.common.solution") }}:</strong>
                {{ $t(issue.solution) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Form Validation Issues -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpContactIssues.validation.title") }}
          </h2>
          <div class="space-y-6">
            <div
              v-for="issue in validationIssues"
              :key="issue.id"
              class="rounded-lg border border-gray-200 p-6 dark:border-gray-600"
            >
              <div class="mb-4 flex items-center">
                <div
                  class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                >
                  <i :class="`pi pi-${issue.icon} text-sm`"></i>
                </div>
                <h3
                  class="font-robotoMedium font-semibold text-dark dark:text-light"
                >
                  {{ $t(issue.title) }}
                </h3>
              </div>
              <p
                class="mb-3 font-robotoRegular text-gray-600 dark:text-gray-400"
              >
                {{ $t(issue.description) }}
              </p>
              <div class="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-dark-400">
                <h4
                  class="font-robotoMedium mb-2 text-sm font-semibold text-dark dark:text-light"
                >
                  {{ $t("HelpContactIssues.validation.example") }}:
                </h4>
                <div
                  class="rounded-md border border-red-200 p-3 dark:border-red-800"
                >
                  <p
                    class="font-robotoRegular text-sm text-red-600 dark:text-red-400"
                  >
                    {{ $t(issue.example) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Best Practices -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("HelpContactIssues.bestPractices.title") }}
          </h2>
          <ul class="space-y-4">
            <li
              v-for="practice in bestPractices"
              :key="practice.id"
              class="flex items-start"
            >
              <i class="pi pi-check-circle mr-3 mt-1 text-green-500"></i>
              <div>
                <h4
                  class="font-robotoMedium mb-1 font-semibold text-dark dark:text-light"
                >
                  {{ $t(practice.title) }}
                </h4>
                <p
                  class="font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
                >
                  {{ $t(practice.description) }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Need Technical Support -->
        <div class="text-center">
          <div
            class="mx-auto max-w-2xl rounded-lg bg-gray-50 p-8 dark:bg-dark-300"
          >
            <h2
              class="mb-4 font-patuaOne text-2xl font-bold text-dark dark:text-light"
            >
              {{ $t("HelpContactIssues.support.title") }}
            </h2>
            <p class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400">
              {{ $t("HelpContactIssues.support.content") }}
            </p>
            <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <NuxtLink
                to="/contact"
                class="font-robotoMedium hover:bg-primary-dark inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-light transition-colors"
              >
                {{ $t("HelpContactIssues.support.contactSupport") }}
              </NuxtLink>
              <NuxtLink
                to="/contact-guide"
                class="font-robotoMedium inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 text-primary transition-colors hover:bg-primary hover:text-light"
              >
                {{ $t("HelpContactIssues.support.contactGuide") }}
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
  title: t("HelpContactIssues.pageTitle"),
  meta: [
    { name: "description", content: t("HelpContactIssues.pageDescription") },
  ],
});

const commonIssues = [
  {
    id: 1,
    title: "HelpContactIssues.common.issues.noResponse.title",
    problem: "HelpContactIssues.common.issues.noResponse.problem",
    solution: "HelpContactIssues.common.issues.noResponse.solution",
  },
  {
    id: 2,
    title: "HelpContactIssues.common.issues.errorMessage.title",
    problem: "HelpContactIssues.common.issues.errorMessage.problem",
    solution: "HelpContactIssues.common.issues.errorMessage.solution",
  },
  {
    id: 3,
    title: "HelpContactIssues.common.issues.loadingIssue.title",
    problem: "HelpContactIssues.common.issues.loadingIssue.problem",
    solution: "HelpContactIssues.common.issues.loadingIssue.solution",
  },
];

const validationIssues = [
  {
    id: 1,
    icon: "exclamation-circle",
    title: "HelpContactIssues.validation.issues.email.title",
    description: "HelpContactIssues.validation.issues.email.description",
    example: "HelpContactIssues.validation.issues.email.example",
  },
  {
    id: 2,
    icon: "exclamation-circle",
    title: "HelpContactIssues.validation.issues.dates.title",
    description: "HelpContactIssues.validation.issues.dates.description",
    example: "HelpContactIssues.validation.issues.dates.example",
  },
  {
    id: 3,
    icon: "exclamation-circle",
    title: "HelpContactIssues.validation.issues.message.title",
    description: "HelpContactIssues.validation.issues.message.description",
    example: "HelpContactIssues.validation.issues.message.example",
  },
];

const bestPractices = [
  {
    id: 1,
    title: "HelpContactIssues.bestPractices.input.title",
    description: "HelpContactIssues.bestPractices.input.description",
  },
  {
    id: 2,
    title: "HelpContactIssues.bestPractices.browser.title",
    description: "HelpContactIssues.bestPractices.browser.description",
  },
  {
    id: 3,
    title: "HelpContactIssues.bestPractices.dates.title",
    description: "HelpContactIssues.bestPractices.dates.description",
  },
  {
    id: 4,
    title: "HelpContactIssues.bestPractices.retry.title",
    description: "HelpContactIssues.bestPractices.retry.description",
  },
];
</script>
