<template>
  <div>
    <CommonHead
      :title="$t('Terms.pageTitle')"
      :description="$t('Terms.pageDescription')"
    />

    <div class="min-h-screen bg-light-100 dark:bg-dark-100">
      <div class="container mx-auto px-3 py-12">
        <div class="mx-auto max-w-4xl">
          <!-- Header -->
          <div class="mb-12 text-center">
            <h1
              class="mb-4 font-patuaOne text-4xl font-bold text-primary dark:text-light"
            >
              {{ $t("Terms.title") }}
            </h1>
            <p
              class="font-robotoRegular text-lg text-primary-200/80 dark:text-light/80"
            >
              {{ $t("Terms.lastUpdated") }}: {{ lastUpdated }}
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
                  {{ $t("Terms.introduction.title") }}
                </h2>
                <p
                  class="mb-4 font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Terms.introduction.content") }}
                </p>
              </section>

              <!-- Acceptance of Terms -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Terms.acceptance.title") }}
                </h2>
                <p
                  class="font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Terms.acceptance.content") }}
                </p>
              </section>

              <!-- Use of Service -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Terms.useOfService.title") }}
                </h2>
                <div class="space-y-4">
                  <div v-for="rule in serviceRules" :key="rule">
                    <h3
                      class="mb-2 font-patuaOne text-lg font-medium text-primary dark:text-light"
                    >
                      {{ $t(`Terms.useOfService.rules.${rule}.title`) }}
                    </h3>
                    <p
                      class="font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                    >
                      {{ $t(`Terms.useOfService.rules.${rule}.content`) }}
                    </p>
                  </div>
                </div>
              </section>
              <!-- Contact Terms -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Terms.contactTerms.title") }}
                </h2>
                <ul class="space-y-3">
                  <li
                    v-for="term in contactTerms"
                    :key="term"
                    class="flex items-start space-x-3"
                  >
                    <i
                      class="pi pi-info-circle mt-1 text-primary dark:text-light"
                    ></i>
                    <span
                      class="font-robotoRegular text-primary-200 dark:text-light/90"
                    >
                      {{ $t(`Terms.contactTerms.terms.${term}`) }}
                    </span>
                  </li>
                </ul>
              </section>

              <!-- Verification Badges -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Terms.verificationBadges.title") }}
                </h2>
                <p
                  class="font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Terms.verificationBadges.content") }}
                </p>
              </section>

              <!-- Premium Placement -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Terms.premiumPlacement.title") }}
                </h2>
                <p
                  class="font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Terms.premiumPlacement.content") }}
                </p>
              </section>

              <!-- Cancellation Policy -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Terms.cancellation.title") }}
                </h2>
                <p
                  class="mb-4 font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Terms.cancellation.content") }}
                </p>
                <div class="rounded-lg bg-primary/5 p-4 dark:bg-primary-200/10">
                  <h4
                    class="mb-2 font-patuaOne text-base font-medium text-primary dark:text-light"
                  >
                    {{ $t("Terms.cancellation.policy.title") }}
                  </h4>
                  <ul class="space-y-2">
                    <li
                      v-for="policy in cancellationPolicies"
                      :key="policy"
                      class="font-robotoRegular text-sm text-primary-200 dark:text-light/90"
                    >
                      • {{ $t(`Terms.cancellation.policy.rules.${policy}`) }}
                    </li>
                  </ul>
                </div>
              </section>

              <!-- Liability -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Terms.liability.title") }}
                </h2>
                <p
                  class="font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Terms.liability.content") }}
                </p>
              </section>

              <!-- Governing Law -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Terms.governingLaw.title") }}
                </h2>
                <p
                  class="font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Terms.governingLaw.content") }}
                </p>
              </section>

              <!-- Contact -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Terms.contact.title") }}
                </h2>
                <p
                  class="font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Terms.contact.content") }}
                </p>
                <div class="mt-4 space-y-2">
                  <p
                    class="font-robotoRegular text-primary-200 dark:text-light/90"
                  >
                    <strong>{{ $t("Terms.contact.email") }}:</strong>
                    legal@hotelswiss.com
                  </p>
                  <p
                    class="font-robotoRegular text-primary-200 dark:text-light/90"
                  >
                    <strong>{{ $t("Terms.contact.address") }}:</strong>
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

const serviceRules = [
  "eligibility",
  "accountSecurity",
  "prohibitedUse",
  "contentPolicy",
];

const contactTerms = [
  "availability",
  "directContact",
  "noCommission",
  "verification",
  "premiumPlacement",
];

const cancellationPolicies = [
  "directArrangement",
  "hotelPolicies",
  "noLiability",
  "disputeResolution",
];
</script>
