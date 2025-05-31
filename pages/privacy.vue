<template>
  <div>
    <CommonHead
      :title="$t('Privacy.pageTitle')"
      :description="$t('Privacy.pageDescription')"
    />

    <div class="min-h-screen bg-light-100 dark:bg-dark-100">
      <div class="container mx-auto px-3 py-12">
        <div class="mx-auto max-w-4xl">
          <!-- Header -->
          <div class="mb-12 text-center">
            <h1
              class="mb-4 font-patuaOne text-4xl font-bold text-primary dark:text-light"
            >
              {{ $t("Privacy.title") }}
            </h1>
            <p
              class="font-robotoRegular text-lg text-primary-200/80 dark:text-light/80"
            >
              {{ $t("Privacy.lastUpdated") }}: {{ lastUpdated }}
            </p>
          </div>

          <!-- Content -->
          <div class="rounded-2xl bg-light p-8 shadow-card dark:bg-dark-200">
            <div class="prose prose-lg max-w-none">
              <!-- Introduction -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Privacy.introduction.title") }}
                </h2>
                <p
                  class="mb-4 font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Privacy.introduction.content") }}
                </p>
              </section>

              <!-- Information We Collect -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Privacy.informationCollected.title") }}
                </h2>
                <div class="space-y-4">
                  <div v-for="item in informationTypes" :key="item.key">
                    <h3
                      class="mb-2 font-patuaOne text-lg font-medium text-primary dark:text-light"
                    >
                      {{
                        $t(
                          `Privacy.informationCollected.types.${item.key}.title`,
                        )
                      }}
                    </h3>
                    <p
                      class="font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                    >
                      {{
                        $t(
                          `Privacy.informationCollected.types.${item.key}.content`,
                        )
                      }}
                    </p>
                  </div>
                </div>
              </section>

              <!-- How We Use Information -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Privacy.howWeUse.title") }}
                </h2>
                <ul class="space-y-3">
                  <li
                    v-for="use in informationUses"
                    :key="use"
                    class="flex items-start space-x-3"
                  >
                    <i
                      class="pi pi-check-circle mt-1 text-primary dark:text-light"
                    ></i>
                    <span
                      class="font-robotoRegular text-primary-200 dark:text-light/90"
                    >
                      {{ $t(`Privacy.howWeUse.uses.${use}`) }}
                    </span>
                  </li>
                </ul>
              </section>

              <!-- Information Sharing -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Privacy.informationSharing.title") }}
                </h2>
                <p
                  class="mb-4 font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Privacy.informationSharing.content") }}
                </p>
              </section>

              <!-- Your Rights -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Privacy.yourRights.title") }}
                </h2>
                <ul class="space-y-3">
                  <li
                    v-for="right in userRights"
                    :key="right"
                    class="flex items-start space-x-3"
                  >
                    <i
                      class="pi pi-shield mt-1 text-primary dark:text-light"
                    ></i>
                    <span
                      class="font-robotoRegular text-primary-200 dark:text-light/90"
                    >
                      {{ $t(`Privacy.yourRights.rights.${right}`) }}
                    </span>
                  </li>
                </ul>
              </section>

              <!-- Contact -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Privacy.contact.title") }}
                </h2>
                <p
                  class="font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Privacy.contact.content") }}
                </p>
                <div class="mt-4 space-y-2">
                  <p
                    class="font-robotoRegular text-primary-200 dark:text-light/90"
                  >
                    <strong>{{ $t("Privacy.contact.email") }}:</strong>
                    privacy@hotelswiss.com
                  </p>
                  <p
                    class="font-robotoRegular text-primary-200 dark:text-light/90"
                  >
                    <strong>{{ $t("Privacy.contact.address") }}:</strong>
                    {{ $t("Footer.address") }}
                  </p>
                </div>
              </section>
            </div>
          </div>

          <!-- Back to Home -->
          <div class="mt-8 text-center">
            <NuxtLink
              to="/"
              class="inline-flex items-center space-x-2 rounded-lg bg-primary px-6 py-3 text-light transition-colors hover:bg-primary-200 dark:bg-primary-200 dark:hover:bg-primary"
            >
              <i class="pi pi-arrow-left"></i>
              <span class="font-robotoRegular">{{
                $t("Common.backToHome")
              }}</span>
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

const lastUpdated = "2024-12-01";

const informationTypes = [
  { key: "personal" },
  { key: "contact" },
  { key: "technical" },
  { key: "preferences" },
];

const informationUses = [
  "facilitateContact",
  "provideSupport",
  "improveServices",
  "communication",
  "marketing",
  "legal",
];

const userRights = [
  "access",
  "rectification",
  "erasure",
  "portability",
  "restriction",
  "objection",
];
</script>
