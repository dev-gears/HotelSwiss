<template>
  <div class="min-h-screen bg-light-100 p-4">
    <CommonBackButton class="sticky top-2 mb-4" />
    <div class="container relative mx-auto">
      <div class="card flex justify-center">
        <Galleria
          v-model:activeIndex="activeIndex"
          v-model:visible="displayCustom"
          :value="parsedImages"
          :responsiveOptions="responsiveOptions"
          :fullScreen="true"
          :showThumbnails="true"
          :showThumbnailNavigators="true"
          @update:visible="resetImageStyle"
          :pt="{
            root: 'h-full w-full',
            mask: 'onClose',
            thumbnail: 'pointer-events-none',
            closeIcon:
              'fill-current text-light z-50 bg-primary-100/90 w-10 h-10 p-2 rounded-md top-4 absolute right-4',
            thumbnailContainer:
              'fixed h-1/6 md:h-auto flex justify-end bottom-0 right-0 left-0 w-full p-4 max-md:bg-[transparent] max-md:absolute',
            nextThumbnailButton: 'bg-primary-100/90 text-light',
            previousThumbnailButton: 'bg-primary-100/90 text-light',
            itemWrapper: 'h-full w-full',
            content: 'h-full',
          }"
        >
          <template #header>
            <div class="absolute top-4 flex justify-center gap-4 px-4">
              <Button
                @click="onRotateLeft"
                size="large"
                class="z-50 h-10 w-10 -rotate-90 rounded-md bg-primary-100/90 text-light"
                icon="pi pi-replay"
              />
              <Button
                @click="onRotateRight"
                size="large"
                class="z-50 h-10 w-10 rotate-90 rounded-md bg-primary-100/90 text-light"
                icon="pi pi-refresh"
              />
              <Button
                @click="onZoomIn"
                size="large"
                class="z-50 h-10 w-10 rounded-md bg-primary-100/90 text-light"
                icon="pi pi-search-plus"
              />
              <Button
                @click="onZoomOut"
                size="large"
                class="z-50 h-10 w-10 rounded-md bg-primary-100/90 text-light"
                icon="pi pi-search-minus"
              />
            </div>
          </template>
          <template #item="slotProps">
            <div class="h-4/5 overflow-scroll px-1">
              <img
                loading="lazy"
                ref="image"
                class="h-full object-contain transition-all"
                :src="backendUrl + slotProps.item.original"
                :alt="slotProps.item.alt"
                :style="imageStyle"
              />
            </div>
          </template>
          <template #thumbnail="slotProps">
            <img
              loading="lazy"
              class="mx-3 hidden md:visible"
              :src="backendUrl + slotProps.item.url"
              :alt="slotProps.item.alt"
            />
          </template>
        </Galleria>

        <div v-if="parsedImages" class="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div v-for="(image, index) of parsedImages" :key="index">
            <img
              loading="lazy"
              :src="backendUrl + image.url"
              :alt="image.alt"
              style="cursor: pointer"
              @click="imageClick(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "single",
});
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useRuntimeConfig } from "nuxt/app";
import Galleria from "primevue/galleria";
import Button from "primevue/button";

const router = useRoute();
const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;
const { images } = router.query;
const parsedImages = JSON.parse(images as string);

const activeIndex = ref(0);
const displayCustom = ref(false);

const responsiveOptions = ref([
  { breakpoint: "1024px", numVisible: 5 },
  { breakpoint: "768px", numVisible: 2 },
]);

const image = ref<null | HTMLImageElement>(null);
const rotation = ref(0);
const scale = ref(1);

/**
 * Image style
 * @returns object
 */
const imageStyle = computed(() => ({
  transform: `rotate(${rotation.value}deg) scale(${scale.value})`,
  transition: "transform 0.5s",
}));

/**
 * Reset image style
 * @returns void
 */
const resetImageStyle = () => {
  if (image.value) {
    rotation.value = 0;
    scale.value = 1;
  }
};

/**
 * Rotate image to right
 * @returns void
 */
const onRotateRight = () => {
  rotation.value = rotation.value + 90;
};

/**
 * Rotate image to left
 * @returns void
 */
const onRotateLeft = () => {
  rotation.value = rotation.value - 90;
};

/**
 * Zoom in image
 * @returns void
 */
const onZoomIn = () => {
  scale.value += 0.4;
};

/**
 * Zoom out image
 * @returns void
 */
const onZoomOut = () => {
  scale.value = Math.max(0.4, 1);
};

/**
 * Image click
 * @param index number
 * @returns void
 */
const imageClick = (index: number) => {
  activeIndex.value = index;
  displayCustom.value = true;
};
</script>
