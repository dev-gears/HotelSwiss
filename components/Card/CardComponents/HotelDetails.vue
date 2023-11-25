<template>
  <div class="flex w-full">
    <div :class="`description-section ${showAmenities ? 'w-3/5' : 'w-full'}`">
      <p class="hotel-desc font-robotoRegular text-xs text-white">
        {{ description || "Description not available" }}
      </p>
    </div>

    <div
      v-if="showAmenities"
      class="amenities-section w-2/5 border-l-2 border-dashed border-white pl-3.5"
    >
      <p class="included-text mb-1 font-robotoRegular text-xs text-white">
        Included:
      </p>
      <div class="icons flex flex-wrap items-center gap-2">
        <div
          v-for="amenity in limitedAmenities"
          :key="amenity.amenity.id"
          class="mock-icon"
        >
          <img
            v-if="amenity.amenity.image && amenity.amenity.image.url"
            :src="backendUrl + amenity.amenity.image.url"
            :alt="amenity.amenity.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  description: string;
  amenities: Array<{ amenity: any }>;
  backendUrl: string;
  showAmenities: boolean;
}>();

const limitedAmenities = computed(() => props.amenities.slice(0, 4));
</script>

<style>
.hotel-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
