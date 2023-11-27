<template>
  <div
    v-if="hotel"
    class="card relative mb-3 w-full overflow-hidden rounded-[10px] bg-primary shadow-card"
  >
    <div :class="getAspectRatioClass(aspect)" class="relative w-full">
      <PriceTag :startPrice="hotel.start_price" :endPrice="hotel.end_price" />
      <ImageLink
        :hotelId="hotel.id"
        :imageUrl="hotel?.images[0]?.image?.renditions[400]"
        :title="hotel.title"
        :backendUrl="backendUrl"
      />
    </div>
    <CommonBackdrop class="p-2">
      <HotelTitle :hotelId="hotel.id" :title="hotel.title" />
      <RatingStars :stars="hotel.stars" />
      <Location
        :hotelId="hotel.id"
        :address="hotel.address"
        :city="hotel.city"
      />
      <HotelDetails
        :description="hotel.description"
        :amenities="hotel.amenities"
        :backendUrl="backendUrl"
        :showAmenities="showAmenities"
      />
    </CommonBackdrop>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Hotel } from "@/types/hotel";
import PriceTag from "./CardComponents/PriceTag.vue";
import ImageLink from "./CardComponents/ImageLink.vue";
import HotelTitle from "./CardComponents/HotelTitle.vue";
import RatingStars from "./CardComponents/RatingStars.vue";
import Location from "./CardComponents/Location.vue";
import HotelDetails from "./CardComponents/HotelDetails.vue";
import CommonBackdrop from "./CardComponents/CommonBackdrop.vue";

const props = defineProps<{
  hotel: Hotel;
  aspect?: string;
  showAmenities: boolean;
}>();

const { hotel, aspect = "default", showAmenities } = props;
const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;

const getAspectRatioClass = (aspect: string): string => {
  const aspectClassMap: Record<string, string> = {
    default: "aspect-default",
    square: "aspect-square",
  };

  return aspectClassMap[aspect] || aspectClassMap["default"];
};
</script>
