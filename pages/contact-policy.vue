<template>
  <div class="min-h-screen bg-light dark:bg-dark-400">
    <CommonHead
      title="Contact Policy - Hotel Swiss"
      description="Learn about Hotel Swiss contact policies, how we handle your inquiries, and our commitment to providing excellent customer service."
      url="https://hotelswiss.ch/contact-policy"
    />
    <!-- Header -->
    <div class="bg-primary py-12 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <h1 class="font-patuaOne text-4xl font-bold">
          {{ $t("ContactPolicy.title") }}
        </h1>
        <p class="mt-4 font-robotoRegular text-lg text-light/80">
          {{ $t("ContactPolicy.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-3 py-12">
      <div class="mx-auto max-w-4xl">
        <!-- Last Updated -->
        <div class="mb-8 text-center">
          <p
            class="font-robotoRegular text-sm text-gray-500 dark:text-gray-400"
          >
            {{ $t("ContactPolicy.lastUpdated") }}: {{ lastUpdated }}
          </p>
        </div>

        <!-- Introduction -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-4 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("ContactPolicy.introduction.title") }}
          </h2>
          <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
            {{ $t("ContactPolicy.introduction.content") }}
          </p>
        </div>

        <!-- Platform Role -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-4 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("ContactPolicy.platformRole.title") }}
          </h2>
          <div class="space-y-4">
            <div
              v-for="role in platformRoles"
              :key="role.id"
              class="flex items-start"
            >
              <div
                class="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <i :class="`pi pi-${role.icon} text-sm`"></i>
              </div>
              <div>
                <h3
                  class="font-robotoMedium mb-2 font-semibold text-dark dark:text-light"
                >
                  {{ $t(role.title) }}
                </h3>
                <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
                  {{ $t(role.description) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Guidelines -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("ContactPolicy.guidelines.title") }}
          </h2>
          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="guideline in contactGuidelines"
              :key="guideline.id"
              class="rounded-lg border border-gray-200 p-4 dark:border-gray-600"
            >
              <div class="mb-3 flex items-center">
                <div
                  class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                >
                  <i :class="`pi pi-${guideline.icon} text-sm`"></i>
                </div>
                <h3
                  class="font-robotoMedium font-semibold text-dark dark:text-light"
                >
                  {{ $t(guideline.title) }}
                </h3>
              </div>
              <p
                class="font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
              >
                {{ $t(guideline.description) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Response Times -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("ContactPolicy.responseTimes.title") }}
          </h2>
          <div class="space-y-4">
            <div
              v-for="timeframe in responseTimes"
              :key="timeframe.id"
              class="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            >
              <div>
                <h3
                  class="font-robotoMedium font-semibold text-dark dark:text-light"
                >
                  {{ $t(timeframe.type) }}
                </h3>
                <p
                  class="font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
                >
                  {{ $t(timeframe.description) }}
                </p>
              </div>
              <div class="text-right">
                <p class="font-robotoMedium text-lg font-semibold text-primary">
                  {{ $t(timeframe.time) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- User Responsibilities -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("ContactPolicy.userResponsibilities.title") }}
          </h2>
          <ul class="space-y-3">
            <li
              v-for="responsibility in userResponsibilities"
              :key="responsibility"
              class="flex items-start"
            >
              <i class="pi pi-check-circle mr-3 mt-1 text-green-500"></i>
              <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
                {{ $t(responsibility) }}
              </p>
            </li>
          </ul>
        </div>

        <!-- Privacy and Data -->
        <div class="mb-12 rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
          <h2
            class="mb-4 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("ContactPolicy.privacy.title") }}
          </h2>
          <p class="mb-4 font-robotoRegular text-gray-600 dark:text-gray-400">
            {{ $t("ContactPolicy.privacy.content") }}
          </p>
          <NuxtLink
            to="/privacy"
            class="font-robotoMedium inline-flex items-center text-primary hover:underline"
          >
            {{ $t("ContactPolicy.privacy.readMore") }}
            <i class="pi pi-arrow-right ml-2"></i>
          </NuxtLink>
        </div>

        <!-- Contact Support -->
        <div class="text-center">
          <div
            class="mx-auto max-w-2xl rounded-lg bg-gray-50 p-8 dark:bg-dark-300"
          >
            <h2
              class="mb-4 font-patuaOne text-2xl font-bold text-dark dark:text-light"
            >
              {{ $t("ContactPolicy.support.title") }}
            </h2>
            <p class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400">
              {{ $t("ContactPolicy.support.content") }}
            </p>
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
</template>

<script setup lang="ts">
definePageMeta({
  layout: "base",
});

const { t } = useI18n();

// SEO
useHead({
  title: t("ContactPolicy.pageTitle"),
  meta: [{ name: "description", content: t("ContactPolicy.pageDescription") }],
});

const lastUpdated = "15 Januar 2024";

const platformRoles = [
  {
    id: 1,
    icon: "link",
    title: "ContactPolicy.roles.facilitation.title",
    description: "ContactPolicy.roles.facilitation.description",
  },
  {
    id: 2,
    icon: "shield",
    title: "ContactPolicy.roles.verification.title",
    description: "ContactPolicy.roles.verification.description",
  },
  {
    id: 3,
    icon: "eye",
    title: "ContactPolicy.roles.visibility.title",
    description: "ContactPolicy.roles.visibility.description",
  },
  {
    id: 4,
    icon: "headphones",
    title: "ContactPolicy.roles.support.title",
    description: "ContactPolicy.roles.support.description",
  },
];

const contactGuidelines = [
  {
    id: 1,
    icon: "clock",
    title: "ContactPolicy.guidelines.timing.title",
    description: "ContactPolicy.guidelines.timing.description",
  },
  {
    id: 2,
    icon: "comment",
    title: "ContactPolicy.guidelines.communication.title",
    description: "ContactPolicy.guidelines.communication.description",
  },
  {
    id: 3,
    icon: "info-circle",
    title: "ContactPolicy.guidelines.information.title",
    description: "ContactPolicy.guidelines.information.description",
  },
  {
    id: 4,
    icon: "heart",
    title: "ContactPolicy.guidelines.respect.title",
    description: "ContactPolicy.guidelines.respect.description",
  },
];

const responseTimes = [
  {
    id: 1,
    type: "ContactPolicy.responseTimes.immediate.type",
    description: "ContactPolicy.responseTimes.immediate.description",
    time: "ContactPolicy.responseTimes.immediate.time",
  },
  {
    id: 2,
    type: "ContactPolicy.responseTimes.standard.type",
    description: "ContactPolicy.responseTimes.standard.description",
    time: "ContactPolicy.responseTimes.standard.time",
  },
  {
    id: 3,
    type: "ContactPolicy.responseTimes.complex.type",
    description: "ContactPolicy.responseTimes.complex.description",
    time: "ContactPolicy.responseTimes.complex.time",
  },
];

const userResponsibilities = [
  "ContactPolicy.responsibilities.accurate",
  "ContactPolicy.responsibilities.respectful",
  "ContactPolicy.responsibilities.responsive",
  "ContactPolicy.responsibilities.direct",
  "ContactPolicy.responsibilities.privacy",
];
</script>
