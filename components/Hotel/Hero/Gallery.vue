<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm transition-all duration-300"
    @click="closeGallery"
  >
    <div
      class="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-4"
    >
      <h3 class="text-lg font-medium text-white opacity-90">Hotel Gallery</h3>
      <button
        @click="closeGallery"
        class="flex h-10 w-10 touch-manipulation items-center justify-center rounded-full bg-black/30 text-white transition-all hover:scale-110 hover:bg-black/50"
        aria-label="Close gallery"
      >
        <i class="pi pi-times text-lg"></i>
      </button>
    </div>

    <div class="flex h-full flex-col" @click.stop>
      <div class="flex-shrink-0 p-4 pt-20" @click.stop>
        <div class="container mx-auto">
          <div class="mb-4 text-center">
            <p class="text-sm text-white/70">
              {{ galleryImages.length }}
              {{ galleryImages.length === 1 ? "photo" : "photos" }}
            </p>
          </div>

          <div class="thumbnail-scroll overflow-x-auto pb-2">
            <div class="flex min-w-max justify-center gap-2 px-4 sm:gap-3">
              <div
                v-for="(image, index) in galleryImages"
                :key="index"
                class="group relative flex-shrink-0 cursor-pointer"
                @click="openImageModal(index)"
              >
                <div
                  class="relative h-16 w-16 overflow-hidden rounded-lg border-2 transition-all sm:h-20 sm:w-20"
                  :class="[
                    selectedImageIndex === index
                      ? 'border-primary ring-2 ring-primary/50'
                      : 'border-white/20 hover:border-white/40',
                  ]"
                >
                  <Image
                    :src="String(image.renditions?.thumbnail ?? image.url)"
                    class="h-full w-full object-cover transition-all group-hover:scale-110"
                    :pt="{
                      root: 'h-full w-full',
                      image: 'h-full w-full object-cover',
                    }"
                  />
                  <div
                    v-if="selectedImageIndex === index"
                    class="absolute inset-0 bg-primary/20"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-1 items-center justify-center p-4">
        <div
          class="relative flex h-full w-full max-w-6xl items-center justify-center"
        >
          <button
            v-if="galleryImages.length > 1"
            @click="showPreviousImage"
            class="absolute left-2 z-10 flex h-12 w-12 touch-manipulation items-center justify-center rounded-full bg-black/40 text-white transition-all hover:scale-110 hover:bg-black/60 sm:left-4"
            aria-label="Previous image"
          >
            <i class="pi pi-angle-left text-xl"></i>
          </button>

          <button
            v-if="galleryImages.length > 1"
            @click="showNextImage"
            class="absolute right-2 z-10 flex h-12 w-12 touch-manipulation items-center justify-center rounded-full bg-black/40 text-white transition-all hover:scale-110 hover:bg-black/60 sm:right-4"
            aria-label="Next image"
          >
            <i class="pi pi-angle-right text-xl"></i>
          </button>

          <div
            class="relative flex h-full w-full items-center justify-center"
            v-gesture="{
              onSwipeLeft: showNextImage,
              onSwipeRight: showPreviousImage,
              onSwipeDown: closeGallery,
            }"
          >
            <Image
              v-if="selectedImageIndex !== null"
              :src="String(galleryImages[selectedImageIndex].url)"
              :key="selectedImageIndex"
              class="max-h-full max-w-full object-contain transition-all duration-300"
              :class="[isImageLoading ? 'opacity-0' : 'opacity-100']"
              @load="isImageLoading = false"
              @loadstart="isImageLoading = true"
              :pt="{
                root: 'flex items-center justify-center h-full',
                image:
                  'max-h-full max-w-full object-contain shadow-2xl rounded-lg',
              }"
            />

            <div
              v-if="isImageLoading"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div
                class="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-shrink-0 p-4" @click.stop>
        <div class="flex items-center justify-center">
          <div
            class="rounded-full bg-black/40 px-4 py-2 text-sm text-white backdrop-blur-sm"
          >
            {{ (selectedImageIndex ?? 0) + 1 }} of {{ galleryImages.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import type { Image } from "@/types/hotel";
import { useGallery } from "@/composables/useGallery";

const props = defineProps<{
  images: Array<Image> | null;
  visible: boolean;
}>();

const emit = defineEmits(["update:visible"]);

const images = computed(() => props.images ?? []);
const visible = toRef(props, "visible");

const {
  selectedImageIndex,
  isImageLoading,
  galleryImages,
  openImageModal,
  closeGallery: closeGalleryComposable,
  showNextImage,
  showPreviousImage,
} = useGallery({
  images,
  visible,
  onClose: () => emit("update:visible", false),
});

const closeGallery = closeGalleryComposable;
</script>

<style scoped>
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover .object-cover {
  transform: scale(1.1);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.thumbnail-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  scroll-behavior: smooth;
}

.thumbnail-scroll::-webkit-scrollbar {
  height: 6px;
}

.thumbnail-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.thumbnail-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.thumbnail-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .thumbnail-scroll {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .thumbnail-scroll::-webkit-scrollbar {
    display: none;
  }

  .thumbnail-scroll::before,
  .thumbnail-scroll::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 20px;
    pointer-events: none;
    z-index: 1;
  }

  .thumbnail-scroll::before {
    left: 0;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.3), transparent);
  }

  .thumbnail-scroll::after {
    right: 0;
    background: linear-gradient(to left, rgba(0, 0, 0, 0.3), transparent);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

button:focus-visible {
  outline: 2px solid #354f52;
  outline-offset: 2px;
}

@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

.touch-manipulation {
  touch-action: manipulation;
}

.gallery-controls {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

@media (max-width: 768px) {
  .fixed.inset-0 {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
  }
}
</style>
