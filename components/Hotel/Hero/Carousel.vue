<template>
  <Swiper
    :slidesPerView="1"
    :modules="[SwiperAutoplay]"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: true,
    }"
  >
    <SwiperSlide v-for="(image, index) in images" :key="index">
      <NuxtLink
        :to="{
          name: 'gallery',
          query: {
            images: JSON.stringify(images),
            index,
          },
        }"
      >
        <img
          :src="image.image.url"
          :srcset="`${image.image.renditions.thumbnail} 100w, ${image.image.renditions.medium} 300w, ${image.image.renditions.large} 800w, ${image.image.url} 2560w`"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          alt="image"
          class="hero-image h-96 w-full object-cover [&_img]:lg:h-[500px]"
        />
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { HotelImage } from "@/types/hotel";
defineProps({
  images: {
    type: Array<HotelImage>,
    required: true,
  },
});
</script>
