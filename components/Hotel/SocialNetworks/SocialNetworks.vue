<template>
  <div
    class="container mx-auto mb-40 border-t-2 border-primary-100/40 bg-light-100 px-7 pt-8"
  >
    <h2 class="font-robotoRegular text-xl text-primary-200">
      {{ $t("SocialNetworks.visitUsAlsoOn") }}
    </h2>
    <div class="mt-6 flex flex-wrap items-center justify-center gap-6">
      <HotelSocialNetworksIcon
        v-for="socialLink in socialLinks"
        :icon="socialLink.icon"
        :link="socialLink.link"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SocialLink } from "@/types/hotel";
defineProps({
  socialLinks: Array<SocialLink>,
});

const socialNetworks = [
  {
    name: "Website",
    icon: "globe",
    link: "https://www.facebook.com",
  },
  {
    name: "Facebook",
    icon: "facebook",
    link: "https://www.facebook.com",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com",
  },
  {
    name: "Twitter",
    icon: "twitter",
    link: "https://www.twitter.com",
  },
  {
    name: "Youtube",
    icon: "youtube",
    link: "https://www.youtube.com",
  },
];
</script>

<style scoped></style>
