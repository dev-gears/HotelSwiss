<template>
  <div class="container mx-auto px-3 max-sm:px-4">
    <CommonBlockHeader :title="`Canton:`" />
    <SkeletonLoadersTabContentSkeleton v-if="isLoading" />
    <CommonGridSection
      v-else
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

const { data, pending: isLoading } = useHotelApiData(
  `/hotels?canton_id=${route.params.id}`,
);
</script>
