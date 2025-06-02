<template>
  <div class="min-h-screen bg-light dark:bg-primary">
    <!-- Header -->
    <div class="bg-primary py-12 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <h1 class="font-patuaOne text-4xl font-bold">
          {{ $t("FAQ.title") }}
        </h1>
        <p class="mt-4 font-robotoRegular text-lg text-light/80">
          {{ $t("FAQ.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-3 py-12">
      <div class="mx-auto max-w-4xl">
        <!-- Search FAQ -->
        <div class="mb-12">
          <div class="mx-auto max-w-md">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="$t('FAQ.searchPlaceholder')"
                class="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-dark-300 dark:text-light"
              />
              <i
                class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              ></i>
            </div>
          </div>
        </div>

        <!-- FAQ Categories -->
        <div class="mb-12">
          <div class="flex flex-wrap justify-center gap-4">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="selectedCategory = category.id"
              :class="[
                'font-robotoMedium rounded-lg px-6 py-3 transition-colors',
                selectedCategory === category.id
                  ? 'bg-primary-200 text-light dark:border'
                  : 'bg-gray-100 text-dark hover:bg-gray-50 dark:bg-dark-300 dark:text-light dark:hover:bg-dark-200',
              ]"
            >
              {{ $t(category.name) }}
            </button>
          </div>
        </div>

        <!-- FAQ Items -->
        <div class="space-y-4">
          <div
            v-for="faq in filteredFAQs"
            :key="faq.id"
            class="rounded-lg bg-white shadow-md dark:bg-dark-300"
          >
            <button
              @click="toggleFAQ(faq.id)"
              class="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-dark-200"
            >
              <h3
                class="font-robotoMedium text-lg font-semibold text-dark dark:text-light"
              >
                {{ $t(faq.question) }}
              </h3>
              <i
                :class="[
                  'pi text-primary transition-transform duration-200',
                  expandedFAQs.includes(faq.id)
                    ? 'pi-chevron-up'
                    : 'pi-chevron-down',
                ]"
              ></i>
            </button>
            <div
              v-if="expandedFAQs.includes(faq.id)"
              class="border-t border-gray-200 p-6 dark:border-gray-600"
            >
              <div
                class="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400"
                v-html="$t(faq.answer)"
              ></div>
            </div>
          </div>
        </div>

        <!-- Still Need Help -->
        <div class="mt-16 text-center">
          <div
            class="mx-auto max-w-2xl rounded-lg bg-gray-50 p-8 dark:bg-dark-300"
          >
            <h2
              class="mb-4 font-patuaOne text-2xl font-bold text-dark dark:text-light"
            >
              {{ $t("FAQ.stillNeedHelp.title") }}
            </h2>
            <p class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400">
              {{ $t("FAQ.stillNeedHelp.content") }}
            </p>
            <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <NuxtLink
                to="/contact"
                class="font-robotoMedium hover:bg-primary-dark inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-light transition-colors"
              >
                {{ $t("FAQ.contactSupport") }}
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
  title: t("FAQ.pageTitle"),
  meta: [{ name: "description", content: t("FAQ.pageDescription") }],
});

const searchQuery = ref("");
const selectedCategory = ref("all");
const expandedFAQs = ref<number[]>([]);

const categories = [
  { id: "all", name: "FAQ.categories.all" },
  { id: "general", name: "FAQ.categories.general" },
  { id: "contact", name: "FAQ.categories.contact" },
  { id: "account", name: "FAQ.categories.account" },
  { id: "platform", name: "FAQ.categories.platform" },
];

const faqs = [
  {
    id: 1,
    category: "general",
    question: "FAQ.items.whatIsHotelSwiss.question",
    answer: "FAQ.items.whatIsHotelSwiss.answer",
  },
  {
    id: 2,
    category: "general",
    question: "FAQ.items.howItWorks.question",
    answer: "FAQ.items.howItWorks.answer",
  },
  {
    id: 3,
    category: "contact",
    question: "FAQ.items.howToContact.question",
    answer: "FAQ.items.howToContact.answer",
  },
  {
    id: 4,
    category: "contact",
    question: "FAQ.items.responseTime.question",
    answer: "FAQ.items.responseTime.answer",
  },
  {
    id: 5,
    category: "contact",
    question: "FAQ.items.noResponse.question",
    answer: "FAQ.items.noResponse.answer",
  },
  {
    id: 6,
    category: "platform",
    question: "FAQ.items.verificationBadges.question",
    answer: "FAQ.items.verificationBadges.answer",
  },
  {
    id: 7,
    category: "platform",
    question: "FAQ.items.premiumPlacement.question",
    answer: "FAQ.items.premiumPlacement.answer",
  },
  {
    id: 8,
    category: "platform",
    question: "FAQ.items.trustSafety.question",
    answer: "FAQ.items.trustSafety.answer",
  },
  {
    id: 9,
    category: "account",
    question: "FAQ.items.createAccount.question",
    answer: "FAQ.items.createAccount.answer",
  },
  {
    id: 10,
    category: "account",
    question: "FAQ.items.accountBenefits.question",
    answer: "FAQ.items.accountBenefits.answer",
  },
  {
    id: 11,
    category: "general",
    question: "FAQ.items.fees.question",
    answer: "FAQ.items.fees.answer",
  },
  {
    id: 12,
    category: "platform",
    question: "FAQ.items.directBooking.question",
    answer: "FAQ.items.directBooking.answer",
  },
];

const filteredFAQs = computed(() => {
  let filtered = faqs;

  if (selectedCategory.value !== "all") {
    filtered = filtered.filter(
      (faq) => faq.category === selectedCategory.value,
    );
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (faq) =>
        t(faq.question).toLowerCase().includes(query) ||
        t(faq.answer).toLowerCase().includes(query),
    );
  }

  return filtered;
});

const toggleFAQ = (id: number) => {
  const index = expandedFAQs.value.indexOf(id);
  if (index > -1) {
    expandedFAQs.value.splice(index, 1);
  } else {
    expandedFAQs.value.push(id);
  }
};
</script>
