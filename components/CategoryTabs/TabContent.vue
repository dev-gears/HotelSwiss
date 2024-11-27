<template>
  <div class="flex flex-col items-center">
    <div class="container mx-auto px-3">
      <CommonBlockHeader :title="name" :link="`category/${category}`" />
      <SkeletonLoadersTabContentSkeleton
        v-if="isLoading && !categorizedHotels.length"
      />
      <CommonGridSection
        v-else-if="categorizedHotels?.length"
        :hotels="categorizedHotels"
        :nextUrl="nextUrl"
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
defineProps<{
  id: number;
  name: string;
  category: string;
  categorizedHotels: Array<Hotel>;
  nextUrl: string | null;
  isLoading: boolean;
  activeTab: boolean;
}>();
</script>
