<template>
  <div class="container mx-auto mt-3 bg-primary p-7">
    <h2 class="font-robotoRegular text-xl">What we offer</h2>

    <div class="mt-5 flex flex-col flex-wrap gap-3">
      <div
        class="flexitems-center justify-center"
        v-for="data in amenities"
        :key="data.amenity.id"
      >
        <img
          :src="data.amenity?.image?.renditions.thumbnail"
          :alt="data.amenity?.name"
          class="h-16 w-16"
        />
        <p class="font-robotoRegular text-sm">{{ data.amenity?.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Amenity } from "types/hotel";

defineProps<{
  amenities: Array<{
    amenity: Amenity;
  }>;
}>();
</script>
