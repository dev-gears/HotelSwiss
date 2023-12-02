<template>
  <div class="max-sm:px-4">
    <CommonBlockHeader :title="`Category:`" />
    <CommonGridSection :hotels="categorizedHotels" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
definePageMeta({
  layout: "base",
});

const route = useRoute();
const { data: categorizedHotels } = useHotelApiData(
  `/hotels?category_id=${route.params.id}`,
);
</script>
