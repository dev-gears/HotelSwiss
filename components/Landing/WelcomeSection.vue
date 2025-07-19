<template>
  <section class="bg-light-100 py-16 dark:bg-dark-200">
    <div class="container mx-auto px-3">
      <div class="mx-auto max-w-6xl">
        <!-- Main Welcome Content -->
        <div class="mb-12 text-center">
          <h2
            class="mb-6 font-patuaOne text-4xl font-bold text-dark dark:text-light"
          >
            {{ $t("Landing.welcome.title") }}
          </h2>
          <p
            class="mx-auto max-w-3xl font-robotoRegular text-xl leading-relaxed text-gray-600 dark:text-gray-300"
          >
            {{ $t("Landing.welcome.subtitle") }}
          </p>
        </div>

        <!-- Feature Cards -->
        <div class="mb-12 grid gap-8 md:grid-cols-3">
          <!-- Direct Contact Feature -->
          <div
            class="group rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-dark-300"
          >
            <div class="mb-6 flex justify-center">
              <div
                class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg"
              >
                <i class="pi pi-phone text-2xl"></i>
              </div>
            </div>
            <h3
              class="mb-4 font-patuaOne text-xl font-bold text-dark dark:text-light"
            >
              {{ $t("Landing.features.directContact.title") }}
            </h3>
            <p
              class="font-robotoRegular leading-relaxed text-gray-600 dark:text-gray-300"
            >
              {{ $t("Landing.features.directContact.description") }}
            </p>
          </div>

          <!-- No Commission Feature -->
          <div
            class="group rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-dark-300"
          >
            <div class="mb-6 flex justify-center">
              <div
                class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg"
              >
                <i class="pi pi-money-bill text-2xl"></i>
              </div>
            </div>
            <h3
              class="mb-4 font-patuaOne text-xl font-bold text-dark dark:text-light"
            >
              {{ $t("Landing.features.noCommission.title") }}
            </h3>
            <p
              class="font-robotoRegular leading-relaxed text-gray-600 dark:text-gray-300"
            >
              {{ $t("Landing.features.noCommission.description") }}
            </p>
          </div>

          <!-- Swiss Focus Feature -->
          <div
            class="group rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-dark-300"
          >
            <div class="mb-6 flex justify-center">
              <div
                class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg"
              >
                <i class="pi pi-map text-2xl"></i>
              </div>
            </div>
            <h3
              class="mb-4 font-patuaOne text-xl font-bold text-dark dark:text-light"
            >
              {{ $t("Landing.features.swissFocus.title") }}
            </h3>
            <p
              class="font-robotoRegular leading-relaxed text-gray-600 dark:text-gray-300"
            >
              {{ $t("Landing.features.swissFocus.description") }}
            </p>
          </div>
        </div>

        <!-- Statistics Banner -->
        <div
          class="rounded-2xl bg-gradient-to-r from-primary to-primary-200 p-8 text-center text-light shadow-lg dark:from-dark-300 dark:to-dark-400"
        >
          <div class="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div
              class="border-r border-light/20 pr-6 last:border-r-0 dark:border-light/10 md:border-r md:pr-0"
            >
              <div class="mb-2 font-patuaOne text-3xl font-bold">26</div>
              <div class="font-robotoRegular text-sm text-light/90">
                {{ $t("Landing.stats.cantons") }}
              </div>
            </div>
            <div
              class="border-r-0 border-light/20 dark:border-light/10 md:border-r md:border-light/20 md:pr-0"
            >
              <div class="mb-2 font-patuaOne text-3xl font-bold">1000+</div>
              <div class="font-robotoRegular text-sm text-light/90">
                {{ $t("Landing.stats.hotels") }}
              </div>
            </div>
            <div
              class="border-r border-light/20 pr-6 last:border-r-0 dark:border-light/10 md:border-r md:pr-0"
            >
              <div class="mb-2 font-patuaOne text-3xl font-bold">4</div>
              <div class="font-robotoRegular text-sm text-light/90">
                {{ $t("Landing.stats.languages") }}
              </div>
            </div>
            <div>
              <div class="mb-2 font-patuaOne text-3xl font-bold">0%</div>
              <div class="font-robotoRegular text-sm text-light/90">
                {{ $t("Landing.stats.commission") }}
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-12 text-center">
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <NuxtLink
              to="/search"
              class="font-robotoMedium inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 font-semibold text-light shadow-lg transition-all duration-200 hover:scale-105 hover:bg-primary-200 hover:shadow-xl"
            >
              {{ $t("Landing.cta.exploreHotels") }}
              <i class="pi pi-arrow-right ml-2"></i>
            </NuxtLink>
            <NuxtLink
              to="/discover"
              class="font-robotoMedium inline-flex items-center justify-center rounded-xl border border-primary/20 bg-light px-8 py-4 font-semibold text-primary shadow-md transition-all duration-200 hover:scale-105 hover:bg-gray-50 hover:shadow-lg dark:border-light/20 dark:bg-dark-300 dark:text-light dark:hover:bg-dark-400"
            >
              {{ $t("Landing.cta.discoverRegions") }}
              <i class="pi pi-compass ml-2"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
