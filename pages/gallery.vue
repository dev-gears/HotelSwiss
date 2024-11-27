<template>
  <CommonHead
    :title="validatedHotelTitle ?? 'Default Hotel Title'"
    :description="`Every info you need if staying at ${validatedHotelTitle}`"
    :imageUrl="parsedImages[0]?.url ?? 'default-image-url.jpg'"
    :url="`https://hotelswiss.ch/hotel/${hotelId}`"
  />
  <div class="relative bg-light-100 p-4 pt-2">
    <CommonBackButton class="!sticky top-2 mb-4" />
    <div class="container mx-auto">
      <div
        class="grid grid-cols-1 justify-center gap-3 rounded-md bg-primary-100/10 p-3 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="(image, index) in parsedImages"
          :key="index"
          class="flex justify-center"
        >
          <Image
            v-ripple
            @click="openImageModal(index)"
            :pt="{
              root: 'flex items-center justify-center cursor-pointer hover:brightness-75',
            }"
            :src="image.renditions.thumbnail ?? image.url"
          />
        </div>
      </div>
    </div>
  </div>

  <Dialog
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
    closable
    :dismissableMask="true"
    :modal="true"
    :showHeader="false"
    v-model:visible="showImageModal"
    :pt="{
      root: 'bg-primary-100/90 w-[90%] max-md:w-full max-md:h-full flex items-center justify-center',
      content: 'p-6 max-md:px-0',
    }"
  >
    <div class="flex h-full w-full items-center justify-center">
      <button @click="closeImageModal" class="absolute right-6 top-6">
        <i class="pi pi-times text-light"></i>
      </button>
      <div
        class="transition-all"
        ref="imageWrapper"
        @dblclick="handleDoubleTap"
      >
        <Image
          ref="imageWrapper"
          :src="parsedImages[activeImageIndex].url"
          :class="['max-h-[60vh] max-w-full object-contain', fadeInClass]"
          :key="activeImageIndex"
          :pt="{
            root: 'h-[60vh] w-full flex items-center justify-center overflow-hidden',
            image: 'max-h-[60vh] max-w-full object-contain animate-fade-in',
          }"
        />
      </div>

      <button
        class="absolute left-4 hidden md:block"
        @click="showPreviousImage"
        v-if="parsedImages.length > 1"
      >
        <i
          class="pi pi-angle-left light-ripple rounded-full bg-primary p-2 text-light shadow-md"
          v-ripple
        ></i>
      </button>
      <button
        class="absolute right-4 hidden md:block"
        @click="showNextImage"
        v-if="parsedImages.length > 1"
      >
        <i
          class="pi pi-angle-right rounded-full bg-primary p-2 text-light shadow-md"
          v-ripple
        ></i>
      </button>
    </div>
    <div class="w-full">
      <p
        class="absolute bottom-6 left-6 rounded-full bg-primary p-2 text-center text-sm text-light shadow-md"
      >
        {{ activeImageIndex + 1 }} / {{ parsedImages.length }}
      </p>

      <button class="absolute bottom-6 right-6 md:block" @click="rotateLeft">
        <i
          class="pi pi-replay rounded-full bg-primary p-2 text-light shadow-md"
          v-ripple
        ></i>
      </button>
      <button class="absolute bottom-6 right-20 md:block" @click="rotateRight">
        <i
          class="pi pi-refresh rounded-full bg-primary p-2 text-light shadow-md"
          v-ripple
        ></i>
      </button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

definePageMeta({
  layout: "single",
});

const router = useRoute();
const { images, hotelId, hotelTitle } = router.query;
const validatedHotelTitle = (hotelTitle + " images") as string;

const parsedImages = JSON.parse(images as string);

const activeImageIndex = ref(0);
const showImageModal = ref(false);
const imageWrapper = ref(null) as Ref<HTMLImageElement | null>;
const activeImageRotation = ref(0);
const imageZoomedIn = ref(false);

/**
 * Opens the image modal and sets the active image index.
 * @param index - The index of the image to display in the modal.
 */
const openImageModal = (index: number): void => {
  activeImageIndex.value = index;
  showImageModal.value = true;
};

/**
 * Closes the image modal.
 */
const closeImageModal = (): void => {
  showImageModal.value = false;
};

/**
 * Shows the next image in the gallery. Loops to the first image if at the end.
 */
const showNextImage = (): void => {
  activeImageIndex.value = (activeImageIndex.value + 1) % parsedImages.length;
};

/**
 * Shows the previous image in the gallery. Loops to the last image if at the beginning.
 */
const showPreviousImage = (): void => {
  activeImageIndex.value =
    (activeImageIndex.value - 1 + parsedImages.length) % parsedImages.length;
};

/**
 * Rotates the image left by 90 degrees.
 */
const rotateLeft = (): void => {
  if (imageWrapper.value) {
    activeImageRotation.value = (activeImageRotation.value - 90) % 360;
    imageWrapper.value.style.transform = `rotate(${activeImageRotation.value}deg)`;
  }
};

/**
 * Rotates the image right by 90 degrees.
 */
const rotateRight = (): void => {
  if (imageWrapper.value) {
    activeImageRotation.value = (activeImageRotation.value + 90) % 360;
    imageWrapper.value.style.transform = `rotate(${activeImageRotation.value}deg)`;
  }
};

const fadeInClass = ref("animate-fade-in");

/**
 * Watches for changes in the active image index and applies a fade-in animation.
 */
watch(activeImageIndex, () => {
  activeImageRotation.value = 0; // Reset rotation for the new image
  if (imageWrapper.value) {
    imageWrapper.value.style.transform = "rotate(0deg)";
  }
  fadeInClass.value = "";
  nextTick(() => {
    fadeInClass.value = "animate-fade-in";
  });
});

let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
let isPinching = false;

/**
 * Handles the start of a touch event. Tracks initial touch coordinates and detects pinch gestures.
 * @param e - The touch event.
 */
const handleTouchStart = (e: TouchEvent): void => {
  if (e.touches.length > 1) {
    isPinching = true;
    return;
  }

  isPinching = false;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
};

/**
 * Handles the end of a touch event. Tracks final touch coordinates and triggers swipe detection.
 * @param e - The touch event.
 */
const handleTouchEnd = (e: TouchEvent): void => {
  if (isPinching) {
    return;
  }

  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;
  handleSwipe();
};

const handleDoubleTap = (): void => {
  if (imageWrapper.value) {
    imageZoomedIn.value = !imageZoomedIn.value;
    imageWrapper.value.style.transform = imageZoomedIn.value
      ? "scale(2)"
      : "scale(1)";
  }
};

/**
 * Determines the direction of a swipe gesture and triggers the appropriate action.
 */
const handleSwipe = (): void => {
  if (imageZoomedIn.value) return;
  const swipeThreshold = 50;
  const horizontalSwipeDistance = touchStartX - touchEndX;
  const verticalSwipeDistance = touchStartY - touchEndY;

  if (Math.abs(horizontalSwipeDistance) > Math.abs(verticalSwipeDistance)) {
    if (horizontalSwipeDistance > swipeThreshold) {
      showNextImage();
    } else if (horizontalSwipeDistance < -swipeThreshold) {
      showPreviousImage();
    }
  } else if (verticalSwipeDistance > swipeThreshold) {
    // Optional: Handle upward swipe if needed
  } else if (verticalSwipeDistance < -swipeThreshold) {
    closeImageModal();
  }
};

/**
 * Adds a keydown event listener to navigate images using arrow keys when the modal is open.
 */
onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (showImageModal.value) {
      if (e.key === "ArrowLeft") {
        showPreviousImage();
      } else if (e.key === "ArrowRight") {
        showNextImage();
      }
    }
  });
});

/**
 * Removes the keydown event listener when the component is unmounted.
 */
onUnmounted(() => {
  window.removeEventListener("keydown", () => {});
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
