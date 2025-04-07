<template>
  <div class="container px-3">
    <div
      class="border-b border-primary-100/40 bg-light-100 pb-6 pt-3 dark:border-light/10 dark:bg-dark-100"
    >
      <h2 class="font-robotoRegular text-xl text-primary-200">
        {{ $t("SocialNetworks.visitUsAlsoOn") }}:
      </h2>
      <div
        class="mt-6 flex w-full flex-wrap items-center justify-center gap-6 px-3 md:justify-start"
      >
        <HotelSocialNetworksIcon
          v-for="socialLink in socialLinks"
          :icon="socialLink.icon"
          :link="socialLink.link"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SocialLink } from "@/types/hotel";
defineProps({
  socialLinks: Array<SocialLink>,
});
</script>

<style scoped></style>
