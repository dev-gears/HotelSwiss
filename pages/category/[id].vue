<template>
  <CommonHead
    :title="`Category: ${title}`"
    :description="`Hotels in ${title} category, Switzerland`"
    :url="`/category/${route.params.id}`"
  />
  <div class="container mx-auto px-3 max-sm:px-4">
    <CommonBlockHeader v-if="title" :title="`Category: ${title}`" />

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

/**
 * Fetch hotels based on the category id
 * If the id is "all", fetch all hotels
 * Otherwise, fetch hotels based on the category id
 */
const fetchUrl = () => {
  if (route.params.id === "all") {
    return `/hotels`;
  } else {
    return `/hotels?category_id=${route.params.id}`;
  }
};
const { data, pending: isLoading } = useHotelApiData(fetchUrl);
</script>
