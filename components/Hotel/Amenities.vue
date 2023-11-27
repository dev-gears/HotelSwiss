<template>
  <div class="container mx-auto mt-3 bg-primary p-7">
    <h2 class="font-robotoRegular text-xl">{{ $t("Amenities.title") }}</h2>

    <div class="mt-5 flex flex-col flex-wrap gap-3">
      <div
        class="flex items-center justify-start"
        v-for="(data, index) in visibleAmenities"
        :key="data.amenity.id"
      >
        <div class="mr-3 h-14 w-14 rounded-md bg-primary-500 p-2">
          <img
            :src="backendUrl + data.amenity?.image?.renditions.thumbnail"
            :alt="data.amenity?.name"
            class="h-full"
          />
        </div>
        <div class="w-full">
          <p class="font-robotoRegular text-base">
            {{ data.amenity?.name }}
          </p>
        </div>
      </div>
      <button
        v-if="shouldShowLoadMoreButton"
        @click="loadMore"
        class="mt-3 rounded-lg border-2 border-primary-300 bg-lightBackground py-2 text-primary-300"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Amenity } from "types/hotel";

const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;

const props = defineProps<{
  amenities: Array<{
    amenity: Amenity;
  }>;
}>();

// Display only 5 amenities initially
const visibleAmenities = ref<Array<{ amenity: Amenity }>>(
  props.amenities.slice(0, 5),
);

const shouldShowLoadMoreButton = ref<boolean>(props.amenities.length > 5);

const loadMore = () => {
  // Increase the number of visible amenities by 5
  const endIndex = props.amenities.length;
  visibleAmenities.value = props.amenities.slice(0, endIndex);

  // Update the visibility of the "Load More" button
  shouldShowLoadMoreButton.value = false;
};
</script>

<!-- {{ $t("Amenities.title") }} -->
