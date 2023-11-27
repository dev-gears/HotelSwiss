<template>
  <div class="flex w-full gap-2">
    <div :class="`${showAmenities ? 'flex-1' : 'w-full'}`">
      <p class="hotel-desc text-light font-robotoRegular text-xs">
        {{ description || "Description not available" }}
      </p>
    </div>

    <div
      v-if="showAmenities"
      class="border-light w-[92px] border-l-2 border-dashed pl-2"
    >
      <p class="text-light mb-1 font-robotoRegular text-xs">
        {{ $t("HotelDetails.includedAmenities") + ":" }}
      </p>
      <div class="flex items-center gap-1.5">
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
