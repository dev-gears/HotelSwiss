<template>
  <Carousel
    :value="images"
    :numVisible="1"
    :numScroll="1"
    :circular="true"
    :showIndicators="false"
    :showNavigators="false"
    :pt="{
      root: 'h-96 overflow-hidden',
      itemlist: 'h-full',
      viewport: 'h-full',
      contentcontainer: 'h-full',
      content: 'h-full',
    }"
  >
    <template #item="slotProps">
      <NuxtLink
        :to="{
          name: 'gallery',
          query: {
            images: JSON.stringify(images),
            index: slotProps.index,
            hotelId,
            hotelTitle,
          },
        }"
      >
        <Image
          :pt="{
            root: 'h-full flex items-center justify-center overflow-hidden',
            image: 'w-full object-cover h-full',
          }"
          :src="slotProps.data.renditions.thumbnail ?? slotProps.data.url"
        />
      </NuxtLink>
    </template>
  </Carousel>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    required: true,
  },
  hotelId: {
    type: Number,
    required: false,
  },
  hotelTitle: {
    type: String,
    required: false,
  },
});
</script>
