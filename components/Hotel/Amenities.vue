<template>
  <div class="container mx-auto mb-10 mt-8 bg-light-100 px-7">
    <h2 class="font-robotoRegular text-xl text-primary-200">
      {{ $t("Amenities.title") }}
    </h2>

    <div class="mt-5 flex flex-col flex-wrap gap-3">
      <div
        class="flex items-center justify-center"
        v-for="data in visibleAmenities"
        :key="data.amenity.id"
      >
        <div class="mr-3 rounded-md bg-primary p-1">
          <img
            :src="backendUrl + data.amenity?.image?.renditions.thumbnail"
            :alt="data.amenity?.name"
            class="h-8 w-8"
          />
        </div>
        <div class="w-full">
          <p class="font-robotoRegular text-sm text-primary-200">
            {{ data.amenity?.name }}
          </p>
        </div>
      </div>
      <Button
        v-if="shouldShowLoadMoreButton"
        @click="loadMore"
        class="mt-6 rounded border border-primary-200 bg-light-100 py-3.5 text-primary-200"
        :label="$t('common.viewAll')"
      />
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
