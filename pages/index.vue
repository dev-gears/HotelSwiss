<template>
  <div class="container mx-auto h-screen w-full bg-white">
    <PromoBlock class="promo-block" />
    <HotelsByCategories />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "landing",
});
</script>
