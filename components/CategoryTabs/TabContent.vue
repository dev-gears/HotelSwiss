<template>
  <div class="flex flex-col items-center">
    <div class="container mx-auto px-3">
      <CommonBlockHeader :title="name" :link="`category/${category}`" />
      <GridSkeleton v-if="isLoading && !categorizedHotels?.length" />
      <CommonGridSection
        v-else-if="categorizedHotels?.length"
        :hotels="categorizedHotels"
        :nextUrl="nextUrl"
        :initialRequestUrl="initialRequestUrl"
        :bindIntersection="activeTab"
      />
      <div v-else class="flex h-[400px] items-center justify-center">
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
