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
          :src="backendUrl + (image.renditions.thumbnail || image.url)"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          alt="image"
          class="hero-image h-96 w-full object-cover [&_img]:lg:h-[500px]"
        />
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import type { Image } from "@/types/hotel";
defineProps({
  images: {
    type: Array<Image>,
    required: true,
  },
});

const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;
</script>
