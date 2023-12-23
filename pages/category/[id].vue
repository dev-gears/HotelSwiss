<template>
  <div class="max-sm:px-4">
    <CommonBlockHeader :title="`Category:`" />
    <CommonGridSection
      :hotels="data.results"
      :nextUrl="data.next"
      :bindIntersection="true"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
definePageMeta({
  layout: "base",
});

const route = useRoute();
const { data } = useHotelApiData(`/hotels?category_id=${route.params.id}`);
</script>
