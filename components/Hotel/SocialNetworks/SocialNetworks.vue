<template>
  <div class="container mx-auto mb-20 bg-lightBackground p-7">
    <h2 class="font-robotoRegular text-3xl text-primary">Visit us also on</h2>
    <div class="mt-5 flex items-center justify-around">
      <HotelSocialNetworksIcon
        v-for="(socialNetwork, index) in socialNetworks"
        :key="index"
        :icon="socialNetwork.icon"
        :link="socialNetwork.link"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
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
