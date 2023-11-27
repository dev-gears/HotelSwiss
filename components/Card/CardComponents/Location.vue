<template>
  <p class="text-light/60 mb-1.5 font-robotoRegular text-sm">
    <NuxtLink :to="`/category/${hotelId}`" class="flex">
      <img
        class="mr-1.5"
        src="~/assets/icons/location-pin.svg"
        alt="hotel location"
      />
      <span v-if="address">{{ address }}</span>
      <span v-if="city">, {{ city }}</span>
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
