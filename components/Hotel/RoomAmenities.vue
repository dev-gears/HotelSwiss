<template>
  <div class="container px-3">
    <div
      class="border-b border-primary-100/40 bg-light-100 pb-8 pt-3 dark:border-light/10 dark:bg-dark-100"
    >
      <div class="flex flex-col flex-wrap gap-3">
        <h2 class="font-robotoRegular text-xl text-primary-200">
          {{ $t("Amenities.title") }}:
        </h2>
        <div
          class="flex items-center justify-center px-3"
          v-for="data in visibleAmenities"
          :key="data.amenity.id"
        >
          <div class="mr-3 rounded-md bg-primary p-1 dark:bg-primary-200">
            <img
              :src="backendUrl + data.amenity?.image?.url"
              :alt="data.amenity?.name"
              class="h-8 w-8"
            />
          </div>
          <div class="w-full">
            <h3 class="font-robotoRegular text-lg font-bold text-primary-200">
              {{ data.amenity?.name }}
            </h3>
          </div>
        </div>
        <Button
          v-if="shouldShowLoadMoreButton"
          @click="loadMore"
          class="hover:bg-light-200 mt-6 rounded border border-primary-200 bg-light-100 py-3.5 text-primary-200 transition-colors dark:bg-dark-200 dark:hover:bg-dark-100"
          :label="$t('Common.viewAll')"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Amenity } from "@/types/hotel";
import { useLoadMore } from "@/composables/useLoadMore";

const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;

const props = defineProps<{
  amenities: Array<{
    amenity: Amenity;
  }>;
}>();

const {
  visibleItems: visibleAmenities,
  shouldShowLoadMoreButton,
  loadMore,
} = useLoadMore(props.amenities, 5);
</script>
