<template>
  <div class="md:hidden">
    <ClientOnly>
      <Carousel
        :value="images"
        :numVisible="1"
        :numScroll="1"
        :circular="true"
        :showIndicators="false"
        :showNavigators="false"
        :pt="{
          root: 'h-96 overflow-hidden bg-light-100 dark:bg-dark-100 transition-colors',
          itemlist: 'h-full',
          viewport: 'h-full',
          contentcontainer: 'h-full',
          content: 'h-full',
        }"
        @click="emit('openImageModal')"
      >
        <template #item="slotProps">
          <Image
            :pt="{
              root: 'h-full flex items-center justify-center overflow-hidden',
              image: 'w-full object-cover h-full',
            }"
            :alt="`Hotel image ${slotProps.index + 1}`"
            :src="slotProps.data.renditions.thumbnail ?? slotProps.data.url"
          />
        </template>
      </Carousel>
      <template #fallback>
        <Image
          :pt="{
            root: 'h-full flex items-center justify-center overflow-hidden',
            image: 'w-full object-cover h-full',
          }"
          :alt="`Hotel image 1`"
          :src="images[0]?.renditions.thumbnail ?? images[0]?.url"
        />
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
const emit = defineEmits(["openImageModal"]);

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
