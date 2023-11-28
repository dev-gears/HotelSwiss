<template>
  <div class="flex flex-col items-center">
    <div class="container mx-auto px-3">
      <CommonBlockHeader :title="name" :link="`category/${category}`" />
      <SkeletonLoadersTabContentSkeleton v-if="isLoading" />
      <div
        class="flex grid-cols-2 flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4"
        v-else-if="categorizedHotels.length"
      >
        <Card
          v-for="hotel in categorizedHotels"
          :key="hotel.id"
          :hotel="hotel"
          :showAmenities="true"
        />
      </div>
      <div v-else class="flex h-[400px] items-center justify-center">
        {{ $t("TabContent.noHotelsFound") }}
      </div>
    </div>
    <Button
      icon="pi pi-refresh"
      class="mx-auto mt-3 border bg-primary px-3 py-2 font-robotoRegular text-sm text-light"
      :label="$t('common.loadMore')"
    />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  id: number;
  name: string;
  category: string;
  categorizedHotels: any;
  isLoading: boolean;
}>();
</script>
