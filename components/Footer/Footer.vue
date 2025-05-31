<template>
  <footer class="bg-primary text-light dark:bg-dark-300">
    <div class="container mx-auto px-3">
      <!-- Main Footer Content -->
      <div class="py-12">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <!-- Brand Section -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <img
                src="~/assets/images/minimal-logo.svg"
                alt="Hotel Swiss Logo"
                class="h-8"
              />
              <span class="font-patuaOne text-2xl font-bold text-light">
                {{ $t("Footer.brandName") }}
              </span>
            </div>
            <p
              class="font-robotoRegular text-sm text-light/80 dark:text-light/70"
            >
              {{ $t("Footer.brandDescription") }}
            </p>
            <!-- Social Media Links -->
            <div class="flex space-x-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-10 w-10 items-center justify-center rounded-full bg-light/10 text-light transition-all duration-200 hover:bg-light/20 hover:text-light dark:bg-light/5 dark:hover:bg-light/15"
                v-ripple
              >
                <i :class="`pi pi-${social.icon} text-sm`"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4">
            <h3 class="font-patuaOne text-lg font-semibold text-light">
              {{ $t("Footer.quickLinks") }}
            </h3>
            <ul class="space-y-2">
              <li v-for="link in quickLinks" :key="link.path">
                <NuxtLink
                  :to="link.path"
                  class="font-robotoRegular text-sm text-light/80 transition-colors duration-200 hover:text-light dark:text-light/70 dark:hover:text-light"
                >
                  {{ $t(link.label) }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Support -->
          <div class="space-y-4">
            <h3 class="font-patuaOne text-lg font-semibold text-light">
              {{ $t("Footer.support") }}
            </h3>
            <ul class="space-y-2">
              <li v-for="link in supportLinks" :key="link.path">
                <NuxtLink
                  :to="link.path"
                  class="font-robotoRegular text-sm text-light/80 transition-colors duration-200 hover:text-light dark:text-light/70 dark:hover:text-light"
                >
                  {{ $t(link.label) }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="space-y-4">
            <h3 class="font-patuaOne text-lg font-semibold text-light">
              {{ $t("Footer.contact") }}
            </h3>
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <i class="pi pi-map-marker mt-1 text-light/60"></i>
                <p
                  class="font-robotoRegular text-sm text-light/80 dark:text-light/70"
                >
                  {{ $t("Footer.address") }}
                </p>
              </div>
              <div class="flex items-center space-x-3">
                <i class="pi pi-phone text-light/60"></i>
                <a
                  href="tel:+41123456789"
                  class="font-robotoRegular text-sm text-light/80 transition-colors duration-200 hover:text-light dark:text-light/70 dark:hover:text-light"
                >
                  {{ $t("Footer.phone") }}
                </a>
              </div>
              <div class="flex items-center space-x-3">
                <i class="pi pi-envelope text-light/60"></i>
                <a
                  href="mailto:info@hotelswiss.com"
                  class="font-robotoRegular text-sm text-light/80 transition-colors duration-200 hover:text-light dark:text-light/70 dark:hover:text-light"
                >
                  info@hotelswiss.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="border-t border-light/10 py-6">
        <div
          class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0"
        >
          <div
            class="flex flex-col items-center space-y-2 md:flex-row md:space-x-6 md:space-y-0"
          >
            <p
              class="font-robotoRegular text-xs text-light/70 dark:text-light/60"
            >
              {{ $t("Footer.copyright", { year: currentYear }) }}
            </p>
            <div class="flex space-x-4">
              <NuxtLink
                to="/privacy"
                class="font-robotoRegular text-xs text-light/70 transition-colors duration-200 hover:text-light dark:text-light/60 dark:hover:text-light"
              >
                {{ $t("Footer.privacy") }}
              </NuxtLink>
              <NuxtLink
                to="/terms"
                class="font-robotoRegular text-xs text-light/70 transition-colors duration-200 hover:text-light dark:text-light/60 dark:hover:text-light"
              >
                {{ $t("Footer.terms") }}
              </NuxtLink>
              <NuxtLink
                to="/cookies"
                class="font-robotoRegular text-xs text-light/70 transition-colors duration-200 hover:text-light dark:text-light/60 dark:hover:text-light"
              >
                {{ $t("Footer.cookies") }}
              </NuxtLink>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span
              class="font-robotoRegular text-xs text-light/70 dark:text-light/60"
            >
              {{ $t("Footer.madeWith") }}
            </span>
            <i class="pi pi-heart text-sm text-red-400"></i>
            <span
              class="font-robotoRegular text-xs text-light/70 dark:text-light/60"
            >
              {{ $t("Footer.inSwitzerland") }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();

const currentYear = new Date().getFullYear();

const socialLinks = [
  {
    name: "Facebook",
    icon: "facebook",
    url: "https://facebook.com/hotelswiss",
  },
  {
    name: "Twitter",
    icon: "twitter",
    url: "https://twitter.com/hotelswiss",
  },
  {
    name: "Instagram",
    icon: "instagram",
    url: "https://instagram.com/hotelswiss",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    url: "https://linkedin.com/company/hotelswiss",
  },
];

const quickLinks = [
  { path: "/", label: "Footer.home" },
  { path: "/search", label: "Footer.findHotels" },
  { path: "/category/luxury", label: "Footer.luxury" },
  { path: "/category/budget", label: "Footer.budget" },
  { path: "/about", label: "Footer.about" },
];

const supportLinks = [
  { path: "/contact", label: "Footer.contactUs" },
  { path: "/help", label: "Footer.help" },
  { path: "/contact-guide", label: "Footer.contactGuide" },
  { path: "/contact-policy", label: "Footer.contactPolicy" },
  { path: "/faq", label: "Footer.faq" },
];
</script>

<style scoped></style>
