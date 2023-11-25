<template>
  <div class="amenities border-l-2 border-dashed border-white pl-3.5">
    <p class="included-text mb-1 font-robotoRegular text-xs text-white">
      Included:
    </p>
    <div class="icons flex flex-wrap items-center gap-2">
      <div
        v-if="limitedAmenities.length"
        v-for="amenity in limitedAmenities"
        :key="amenity.amenity.name"
        class="mock-icon"
      >
        <img
          :src="backendUrl + amenity.amenity?.image?.url"
          :alt="amenity.amenity.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Amenity } from "@/types/hotel";

const props = defineProps<{
  amenities: Array<{ amenity: Amenity }>;
  backendUrl: string;
}>();

const limitedAmenities = computed(() => props.amenities.slice(0, 4));
</script>
