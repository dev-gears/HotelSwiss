<template>
  <CommonHead
    :title="`Canton: ${title}`"
    :description="`Hotels in ${title} canton, Switzerland`"
    :url="`/canton/${route.params.id}`"
  />
  <div class="container mx-auto px-3 max-sm:px-4">
    <CommonBlockHeader v-if="title" :title="`Canton: ${title}`" />
    <SkeletonLoadersGridSkeleton v-if="isLoading" />
    <CommonGridSection
      v-else
      :hotels="results"
      :nextUrl="next"
      :initialRequestUrl="requestUrl"
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
const isLoading = ref(true);
const results = ref([]);
const next = ref("");
const requestUrl = `/hotels?canton_id=${route.params.id}`;

try {
  const response = (await useHotelApiData(requestUrl)) as any;
  results.value = response.data.value.results;
  next.value = response.data.value.next;
} catch (error) {
  console.warn(error);
} finally {
  isLoading.value = false;
}
</script>
