<template>
  <div>
    <CommonHead
      :title="$t('Cookies.pageTitle')"
      :description="$t('Cookies.pageDescription')"
    />

    <div class="min-h-screen bg-light-100 dark:bg-dark-100">
      <div class="container mx-auto px-3 py-12">
        <div class="mx-auto max-w-4xl">
          <!-- Header -->
          <div class="mb-12 text-center">
            <h1
              class="mb-4 font-patuaOne text-4xl font-bold text-primary dark:text-light"
            >
              {{ $t("Cookies.title") }}
            </h1>
            <p
              class="font-robotoRegular text-lg text-primary-200/80 dark:text-light/80"
            >
              {{ $t("Cookies.lastUpdated") }}: {{ lastUpdated }}
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
                  {{ $t("Cookies.introduction.title") }}
                </h2>
                <p
                  class="mb-4 font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Cookies.introduction.content") }}
                </p>
              </section>

              <!-- What Are Cookies -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Cookies.whatAreCookies.title") }}
                </h2>
                <p
                  class="font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Cookies.whatAreCookies.content") }}
                </p>
              </section>

              <!-- Types of Cookies -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Cookies.typesOfCookies.title") }}
                </h2>
                <div class="space-y-6">
                  <div
                    v-for="cookieType in cookieTypes"
                    :key="cookieType.key"
                    class="border-l-4 border-primary pl-4"
                  >
                    <h3
                      class="mb-2 font-patuaOne text-lg font-medium text-primary dark:text-light"
                    >
                      {{
                        $t(
                          `Cookies.typesOfCookies.types.${cookieType.key}.title`,
                        )
                      }}
                    </h3>
                    <p
                      class="mb-3 font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                    >
                      {{
                        $t(
                          `Cookies.typesOfCookies.types.${cookieType.key}.description`,
                        )
                      }}
                    </p>
                    <div class="rounded-lg bg-light-100 p-3 dark:bg-dark-300">
                      <p
                        class="font-robotoRegular text-sm text-primary-200 dark:text-light/80"
                      >
                        <strong>{{ $t("Cookies.purpose") }}:</strong>
                        {{
                          $t(
                            `Cookies.typesOfCookies.types.${cookieType.key}.purpose`,
                          )
                        }}
                      </p>
                      <p
                        class="mt-1 font-robotoRegular text-sm text-primary-200 dark:text-light/80"
                      >
                        <strong>{{ $t("Cookies.duration") }}:</strong>
                        {{
                          $t(
                            `Cookies.typesOfCookies.types.${cookieType.key}.duration`,
                          )
                        }}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <!-- How We Use Cookies -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Cookies.howWeUseCookies.title") }}
                </h2>
                <ul class="space-y-3">
                  <li
                    v-for="use in cookieUses"
                    :key="use"
                    class="flex items-start space-x-3"
                  >
                    <i
                      class="pi pi-check-circle mt-1 text-primary dark:text-light"
                    ></i>
                    <span
                      class="font-robotoRegular text-primary-200 dark:text-light/90"
                    >
                      {{ $t(`Cookies.howWeUseCookies.uses.${use}`) }}
                    </span>
                  </li>
                </ul>
              </section>

              <!-- Third-Party Cookies -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Cookies.thirdParty.title") }}
                </h2>
                <p
                  class="mb-4 font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Cookies.thirdParty.content") }}
                </p>
                <div class="grid gap-4 md:grid-cols-2">
                  <div
                    v-for="provider in thirdPartyProviders"
                    :key="provider"
                    class="rounded-lg bg-primary/5 p-4 dark:bg-primary-200/10"
                  >
                    <h4
                      class="mb-2 font-patuaOne text-base font-medium text-primary dark:text-light"
                    >
                      {{ $t(`Cookies.thirdParty.providers.${provider}.name`) }}
                    </h4>
                    <p
                      class="font-robotoRegular text-sm text-primary-200 dark:text-light/90"
                    >
                      {{
                        $t(`Cookies.thirdParty.providers.${provider}.purpose`)
                      }}
                    </p>
                  </div>
                </div>
              </section>

              <!-- Managing Cookies -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Cookies.managingCookies.title") }}
                </h2>
                <p
                  class="mb-4 font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Cookies.managingCookies.content") }}
                </p>
                <div class="rounded-lg bg-primary/5 p-4 dark:bg-primary-200/10">
                  <h4
                    class="mb-3 font-patuaOne text-base font-medium text-primary dark:text-light"
                  >
                    {{
                      $t("Cookies.managingCookies.browserInstructions.title")
                    }}
                  </h4>
                  <ul class="space-y-2">
                    <li
                      v-for="browser in browsers"
                      :key="browser"
                      class="font-robotoRegular text-sm text-primary-200 dark:text-light/90"
                    >
                      •
                      <strong
                        >{{
                          $t(
                            `Cookies.managingCookies.browserInstructions.browsers.${browser}.name`,
                          )
                        }}:</strong
                      >
                      {{
                        $t(
                          `Cookies.managingCookies.browserInstructions.browsers.${browser}.instruction`,
                        )
                      }}
                    </li>
                  </ul>
                </div>
              </section>

              <!-- Contact -->
              <section class="mb-8">
                <h2
                  class="mb-4 font-patuaOne text-2xl font-semibold text-primary dark:text-light"
                >
                  {{ $t("Cookies.contact.title") }}
                </h2>
                <p
                  class="font-robotoRegular leading-relaxed text-primary-200 dark:text-light/90"
                >
                  {{ $t("Cookies.contact.content") }}
                </p>
                <div class="mt-4 space-y-2">
                  <p
                    class="font-robotoRegular text-primary-200 dark:text-light/90"
                  >
                    <strong>{{ $t("Cookies.contact.email") }}:</strong>
                    privacy@hotelswiss.com
                  </p>
                  <p
                    class="font-robotoRegular text-primary-200 dark:text-light/90"
                  >
                    <strong>{{ $t("Cookies.contact.address") }}:</strong>
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

const cookieTypes = [
  { key: "essential" },
  { key: "functional" },
  { key: "analytics" },
  { key: "marketing" },
];

const cookieUses = [
  "authentication",
  "preferences",
  "security",
  "analytics",
  "personalization",
  "advertising",
];

const thirdPartyProviders = [
  "googleAnalytics",
  "googleMaps",
  "socialMedia",
  "paymentProcessors",
];

const browsers = ["chrome", "firefox", "safari", "edge"];
</script>
