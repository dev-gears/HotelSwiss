<template>
  <CommonHead
    :title="`Canton: ${title}`"
    :description="`Hotels in ${title} canton, Switzerland`"
    :url="`/canton/${route.params.id}`"
  />
  <div class="container mx-auto px-3 max-sm:px-4">
    <CommonBlockHeader v-if="title" :title="`Canton: ${title}`" />
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
const title = ref(route.query.title as string);

const { data, pending: isLoading } = useHotelApiData(
  `/hotels?canton_id=${route.params.id}`,
);
</script>
