<template>
  <div class="flex flex-col items-center bg-light-100 dark:bg-dark-100">
    <div class="container mx-auto max-md:px-3">
      <CommonBlockHeader :title="name" :link="`category/${category}`" />
      <GridSkeleton v-if="isLoading && !categorizedHotels?.length" />
      <CommonGridSection
        v-else-if="categorizedHotels?.length"
        :hotels="categorizedHotels"
        :nextUrl="nextUrl"
        :initialRequestUrl="initialRequestUrl"
        :bindIntersection="activeTab"
      />
      <div
        v-else
        class="flex h-[400px] items-center justify-center text-primary-200 dark:text-light"
      >
        {{ $t("TabContent.noHotelsFound") }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Hotel } from "@/types/hotel";
import GridSkeleton from "../SkeletonLoaders/GridSkeleton.vue";
defineProps<{
  id: Number;
  name: string;
  categorizedHotels: Array<Hotel>;
  nextUrl: string | null;
  isLoading: Boolean;
  category: String;
  activeTab: Boolean;
  initialRequestUrl: string | null;
}>();
</script>
