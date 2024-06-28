<template>
  <p class="mb-1.5 font-robotoRegular text-sm text-light/60">
    <div class="flex flex-wrap">
      <img
        class="mr-1.5"
        src="~/assets/icons/location-pin.svg"
        alt="hotel location"
      />
      <span class="whitespace-nowrap" v-if="address">{{ address }}</span>
      <span class="mr-1" v-if="address && city">, </span>
      <span class="whitespace-nowrap" v-if="city">{{ city }}</span>
    </div>
  </p>
</template>

<script setup lang="ts">
defineProps<{
  hotelId: number;
  address: string;
  city: string;
}>();
</script>
