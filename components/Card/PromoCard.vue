<template>
  <div
    class="card relative aspect-[2/3] w-full rounded-md shadow shadow-primary-500 max-md:h-[350px]"
  >
    <NuxtLink :to="`/hotel/${hotel.id}`">
      <img
        class="h-full w-full rounded-md object-cover"
        :src="`http://192.168.0.29:3000${hotel.images[0].image.url}`"
        height="100%"
      />
    </NuxtLink>
    <CommonBackdrop class="absolute bottom-0 w-full">
      <NuxtLink :to="`/hotel/${hotel.id}`">
        <h3 class="rounded border border-white p-2 text-2xl">
          {{ hotel.title }}
        </h3>
      </NuxtLink>
      <NuxtLink :to="`/category/${hotel.id}`">
        <p class="border-b border-white p-2 text-sm">
          {{ hotel.address }}
        </p>
      </NuxtLink>
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
</style>
