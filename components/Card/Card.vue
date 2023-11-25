<template>
  <div
    v-if="hotel"
    class="card relative mb-3 w-full overflow-hidden rounded-[10px] bg-primary-500 shadow-card"
  >
    <div :class="aspect || 'aspect-[3/2]'" class="relative w-full">
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
      <div class="flex">
        <Description :description="hotel.description" />
        <Amenities
          v-if="showAmenities"
          :amenities="hotel.amenities"
          :backendUrl="backendUrl"
        />
      </div>
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
import Description from "./CardComponents/Description.vue";
import Amenities from "./CardComponents/Amenities.vue";
import CommonBackdrop from "./CardComponents/CommonBackdrop.vue";

const props = defineProps<{
  hotel: Hotel;
  aspect: Object | String;
  showAmenities: Boolean;
}>();

const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;

const { hotel, aspect, showAmenities } = props;
</script>
