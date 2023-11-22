<template>
  <div
    class="card relative mb-3 w-full overflow-hidden rounded-[10px] bg-primary-500 shadow-card"
  >
    <div :class="aspect || 'aspect-[3/2]'" class="relative w-full">
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
          :src="`http://192.168.0.29:3000${hotel.images[0].image.renditions[400]}`"
          :srcset="generateSrcset(hotel.images[0].image.renditions)"
          sizes="(min-width: 800px) 800px, 100vw"
          height="100%"
        />
      </NuxtLink>
    </div>
    <CommonBackdrop class="w-full">
      <h3 class="mb-2.5 font-patuaOne text-lg leading-4 text-white">
        <NuxtLink :to="`/hotel/${hotel.id}`">{{ hotel.title }}</NuxtLink>
      </h3>
      <p class="mb-1.5 flex font-patuaOne text-lg text-white">
        <span class="mr-1.5">{{ hotel.stars }}</span>
        <img
          v-for="index in hotel.stars"
          :key="index"
          src="~/assets/icons/star.svg"
          alt="star"
          class="star-icon mr-1"
        />
      </p>
      <p class="mb-1.5 font-robotoRegular text-sm text-lightBackground/60">
        <NuxtLink :to="`/category/${hotel.id}`" class="flex">
          <img
            class="mr-1.5"
            src="../../assets/icons/location-pin.svg"
            alt="hotel location"
          />{{ hotel.address }}, {{ hotel.city }}
        </NuxtLink>
      </p>
      <div class="grid grid-cols-[7fr,3fr] items-baseline gap-3.5">
        <p class="hotel-desc font-robotoRegular text-xs text-white">
          {{ hotel.description }}
        </p>
        <div class="amenities border-l-2 border-dashed border-white pl-3.5">
          <p class="included-text mb-1 font-robotoRegular text-xs text-white">
            Included:
          </p>
          <div class="icons flex flex-wrap items-center gap-2">
            <div
              v-for="(amenity, index) in hotel.amenities"
              :key="amenity.amenity.name"
              class="mock-icon"
            >
              <span v-if="index < 4">
                <img
                  :src="amenity.amenity.image?.url"
                  :alt="amenity.amenity.name"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </CommonBackdrop>
  </div>
</template>

<script setup lang="ts">
import { Hotel } from "@/types/hotel";

defineProps<{ hotel: Hotel; aspect: string }>();

const stars: number = 4;

const generateSrcset = (renditions: Record<string, string>): string => {
  return Object.entries(renditions)
    .map(([size, url]) => `${`http://192.168.0.29:3000${url}`} ${size}`)
    .join(", ");
};
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
