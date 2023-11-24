<template>
  <p class="mb-1.5 font-robotoRegular text-sm text-lightBackground/60">
    <NuxtLink :to="`/category/${hotelId}`" class="flex">
      <img
        class="mr-1.5"
        src="~/assets/icons/location-pin.svg"
        alt="hotel location"
      />{{ address }}, {{ city }}
    </NuxtLink>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  hotelId: number;
  address: string;
  city: string;
}>();
</script>
