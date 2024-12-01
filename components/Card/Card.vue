<template>
  <div
    v-if="hotel"
    class="card relative h-full w-full overflow-hidden rounded-2xl bg-primary shadow-card group-[.promo-block]:min-h-[350px]"
  >
    <div :class="getAspectRatioClass(aspect)" class="relative w-full">
      <CardComponentsPriceTag
        :startPrice="hotel.start_price"
        :endPrice="hotel.end_price"
      />
      <CardComponentsImageLink
        :hotelId="hotel.id"
        :imageUrl="hotel?.images[0]?.renditions?.thumbnail"
        :title="hotel.title"
        :backendUrl="backendUrl"
      />
    </div>
    <CardComponentsCommonBackdrop class="p-2">
      <CardComponentsHotelTitle :hotelId="hotel.id" :title="hotel.title" />
      <CardComponentsRatingStars :stars="hotel.stars" />
      <CardComponentsLocation
        :hotelId="hotel.id"
        :address="hotel.address"
        :city="hotel.city"
      />
    </CardComponentsCommonBackdrop>
  </div>
</template>

<script setup lang="ts">
import type { Hotel } from "@/types/hotel";

const props = defineProps<{
  hotel: Hotel;
  aspect?: string;
  showAmenities: boolean;
}>();

const { hotel, aspect = "default", showAmenities } = props;
const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;

/**
 * Get aspect ratio class based on the aspect prop
 * @param {string} aspect - Aspect ratio
 * @returns {string} Aspect ratio class
 */
const getAspectRatioClass = (aspect: string): string => {
  const aspectClassMap: Record<string, string> = {
    default: "aspect-default",
    square: "aspect-square",
  };

  return aspectClassMap[aspect] || aspectClassMap["default"];
};
</script>
