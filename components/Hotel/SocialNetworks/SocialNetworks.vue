<template>
  <div v-if="socialLinks && socialLinks.length > 0">
    <div class="container px-3">
      <div
        class="rounded-2xl bg-light p-6 shadow-md dark:bg-dark-100 dark:text-light"
      >
        <!-- Content -->
        <div class="relative">
          <!-- Header with icon -->
          <div class="mb-6 flex items-center gap-3">
            <div class="rounded-lg bg-primary/10 p-2 dark:bg-primary">
              <i class="pi pi-share-alt text-xl text-primary dark:text-light" />
            </div>
            <div>
              <h2
                class="flex items-center font-patuaOne text-xl font-bold text-dark dark:text-light"
              >
                {{ $t("SocialNetworks.visitUsAlsoOn") }}
              </h2>
              <p
                class="font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
              >
                {{ $t("SocialNetworks.connectWithUs") }}
              </p>
            </div>
          </div>

          <!-- Social Links Grid -->
          <div
            class="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-start sm:gap-3"
          >
            <HotelSocialNetworksIcon
              v-for="(socialLink, index) in socialLinks"
              :key="`${socialLink.link}-${index}`"
              :icon="socialLink.icon"
              :link="socialLink.link"
              :name="socialLink.name"
              :index="index"
            />
          </div>

          <!-- Footer note -->
          <div class="mt-4 text-center sm:text-left">
            <p
              class="font-robotoRegular text-xs text-gray-500 dark:text-gray-500"
            >
              {{ $t("SocialNetworks.followForUpdates") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SocialLink } from "@/types/hotel";

defineProps<{
  socialLinks: SocialLink[];
}>();
</script>

<style scoped></style>
