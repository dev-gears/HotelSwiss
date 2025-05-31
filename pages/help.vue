<template>
  <div class="min-h-screen bg-light dark:bg-dark-400">
    <!-- Header -->
    <div class="bg-primary py-12 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <h1 class="font-patuaOne text-4xl font-bold">
          {{ $t("Help.title") }}
        </h1>
        <p class="mt-4 font-robotoRegular text-lg text-light/80">
          {{ $t("Help.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-3 py-12">
      <!-- Search Help -->
      <div class="mb-12">
        <div class="mx-auto max-w-md">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('Help.searchPlaceholder')"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-dark-300 dark:text-light"
            />
            <i
              class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            ></i>
          </div>
        </div>
      </div>

      <!-- Help Categories -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="category in helpCategories"
          :key="category.id"
          class="rounded-lg bg-white p-6 shadow-md dark:bg-dark-300"
        >
          <div class="mb-4 flex items-center">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"
            >
              <i :class="`pi pi-${category.icon} text-xl`"></i>
            </div>
            <h3
              class="ml-4 font-patuaOne text-xl font-semibold text-dark dark:text-light"
            >
              {{ $t(category.title) }}
            </h3>
          </div>
          <p class="mb-4 font-robotoRegular text-gray-600 dark:text-gray-400">
            {{ $t(category.description) }}
          </p>
          <ul class="space-y-2">
            <li v-for="item in category.items" :key="item.slug">
              <NuxtLink
                :to="`/help/${category.id}#${item.slug}`"
                class="font-robotoRegular text-sm text-primary hover:underline"
              >
                {{ $t(item.title) }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Popular Articles -->
      <div class="mt-16">
        <h2
          class="mb-8 text-center font-patuaOne text-3xl font-bold text-dark dark:text-light"
        >
          {{ $t("Help.popularArticles") }}
        </h2>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="article in popularArticles"
            :key="article.id"
            class="rounded-lg bg-white p-6 shadow-md dark:bg-dark-300"
          >
            <h3
              class="mb-3 font-patuaOne text-lg font-semibold text-dark dark:text-light"
            >
              {{ $t(article.title) }}
            </h3>
            <p
              class="mb-4 font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
            >
              {{ $t(article.excerpt) }}
            </p>
            <NuxtLink
              :to="`/help/article/${article.slug}`"
              class="font-robotoRegular text-sm text-primary hover:underline"
            >
              {{ $t("Help.readMore") }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Contact Support -->
      <div class="mt-16 text-center">
        <div
          class="mx-auto max-w-2xl rounded-lg bg-gray-50 p-8 dark:bg-dark-300"
        >
          <h2
            class="mb-4 font-patuaOne text-2xl font-bold text-dark dark:text-light"
          >
            {{ $t("Help.needMoreHelp") }}
          </h2>
          <p class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400">
            {{ $t("Help.contactSupportText") }}
          </p>
          <NuxtLink
            to="/contact"
            class="font-robotoMedium hover:bg-primary-dark inline-flex items-center rounded-lg bg-primary px-6 py-3 text-light transition-colors"
          >
            {{ $t("Help.contactSupport") }}
            <i class="pi pi-arrow-right ml-2"></i>
          </NuxtLink>
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
  title: t("Help.pageTitle"),
  meta: [{ name: "description", content: t("Help.pageDescription") }],
});

const searchQuery = ref("");

const helpCategories = [
  {
    id: "getting-started",
    icon: "play-circle",
    title: "Help.categories.gettingStarted.title",
    description: "Help.categories.gettingStarted.description",
    items: [
      {
        title: "Help.categories.gettingStarted.items.howToSearch",
        slug: "how-to-search",
      },
      {
        title: "Help.categories.gettingStarted.items.accountSetup",
        slug: "account-setup",
      },
      {
        title: "Help.categories.gettingStarted.items.contactingHotels",
        slug: "contacting-hotels",
      },
    ],
  },
  {
    id: "platform-features",
    icon: "cog",
    title: "Help.categories.platformFeatures.title",
    description: "Help.categories.platformFeatures.description",
    items: [
      {
        title: "Help.categories.platformFeatures.items.verificationBadges",
        slug: "verification-badges",
      },
      {
        title: "Help.categories.platformFeatures.items.premiumPlacement",
        slug: "premium-placement",
      },
      {
        title: "Help.categories.platformFeatures.items.filters",
        slug: "filters",
      },
    ],
  },
  {
    id: "troubleshooting",
    icon: "wrench",
    title: "Help.categories.troubleshooting.title",
    description: "Help.categories.troubleshooting.description",
    items: [
      {
        title: "Help.categories.troubleshooting.items.contactIssues",
        slug: "contact-issues",
      },
      {
        title: "Help.categories.troubleshooting.items.accountProblems",
        slug: "account-problems",
      },
      {
        title: "Help.categories.troubleshooting.items.technicalSupport",
        slug: "technical-support",
      },
    ],
  },
];

const popularArticles = [
  {
    id: 1,
    title: "Help.articles.howToContact.title",
    excerpt: "Help.articles.howToContact.excerpt",
    slug: "how-to-contact-hotels",
  },
  {
    id: 2,
    title: "Help.articles.verificationBadges.title",
    excerpt: "Help.articles.verificationBadges.excerpt",
    slug: "understanding-verification-badges",
  },
  {
    id: 3,
    title: "Help.articles.accountSettings.title",
    excerpt: "Help.articles.accountSettings.excerpt",
    slug: "managing-account-settings",
  },
];
</script>
