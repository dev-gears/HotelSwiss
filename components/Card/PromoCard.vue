<template>
  <div
    class="card relative mb-3 w-full overflow-hidden rounded-[10px] bg-primary-500 shadow shadow-primary-500"
  >
    <div class="relative aspect-square">
      <div
        class="absolute left-2.5 top-2.5 rounded-bl-[10px] rounded-br-[10px] rounded-tl-[10px] bg-primary-500 px-3 py-1.5 shadow-cardImage"
      >
        <p class="font-patuaOne text-sm text-white">
          {{ hotel.start_price }}$ / {{ hotel.end_price }}$
        </p>
      </div>
      <NuxtLink :to="`/hotel/${hotel.id}`">
        <img
          class="h-full w-full rounded-br-[60px] object-cover shadow-cardImage"
          :src="`http://192.168.0.29:3000${hotel.images[0].image.url}`"
          height="100%"
        />
      </NuxtLink>
    </div>
    <CommonBackdrop class="w-full">
      <h3 class="mb-2.5 font-patuaOne text-lg leading-4 text-white">
        <NuxtLink :to="`/hotel/${hotel.id}`">{{ hotel.title }}</NuxtLink>
      </h3>
      <p class="mb-1.5 font-patuaOne text-lg text-white">4 stars</p>
      <p class="mb-1.5 font-robotoRegular text-sm text-lightBackground/60">
        <NuxtLink :to="`/category/${hotel.id}`"
          >{{ hotel.address }}, {{ hotel.city }}</NuxtLink
        >
      </p>
      <p class="hotel-desc font-robotoRegular text-xs text-white">
        {{ hotel.description }}
      </p>
    </CommonBackdrop>
  </div>
</template>

<script setup lang="ts">
import { Hotel } from "@/types/hotel";

defineProps<{ hotel: Hotel }>();
</script>

<style>
.promo-block {
  .swiper-slide-prev,
  .swiper-slide-next {
    @apply h-[80%];
  }
}
.hotel-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
