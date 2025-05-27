<template>
  <Drawer
    :visible="visible"
    @update:visible="updateVisible"
    position="bottom"
    :blockScroll="true"
    :pt="{
      root: 'bg-primary h-full w-full fixed bottom-0 left-0 rounded-t-3xl transition-all !h-[90%]',
      header:
        'bg-light dark:bg-dark-100 z-50 border-b border-primary/30 dark:border-light/10 rounded-t-3xl fixed w-full flex !justify-end items-center !py-2 !px-6',
      content:
        'bg-light dark:bg-dark-100 !pt-20 rounded-t-3xl overflow-y-scroll flex flex-col gap-6',
      footer:
        'bg-light dark:bg-dark-100 bottom-0 border-t border-primary/30 dark:border-light/10 !py-2 !px-6 flex justify-between',
      mask: 'bg-primary/50 !transition-all',
    }"
  >
    <template #default>
      <div class="container mx-auto">
        <div
          class="grid grid-cols-1 justify-center gap-3 rounded-md bg-primary/10 p-3 dark:bg-dark-200/50 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="(image, index) in images"
            :key="index"
            class="flex justify-center"
          >
            <Image
              v-ripple
              @click="openImageModal(index)"
              :pt="{
                root: 'flex items-center justify-center cursor-pointer hover:brightness-75 transition-all',
              }"
              :src="String(image.renditions.thumbnail ?? image.url)"
            />
          </div>
        </div>
      </div>

      <Dialog
        closable
        :dismissableMask="true"
        :modal="true"
        :showHeader="false"
        v-model:visible="showImageModal"
        :pt="{
          root: 'bg-light-100/90 dark:bg-dark-100/90 w-[90%] max-md:w-full max-md:h-full flex items-center justify-center',
          content: 'p-6 max-md:px-0',
        }"
      >
        <div
          class="flex h-full w-full items-center justify-center"
          v-gesture="{
            onSwipeLeft: showNextImage,
            onSwipeRight: showPreviousImage,
            onSwipeDown: closeImageModal,
            onPinchIn: handlePinchIn,
            onPinchOut: handlePinchOut,
          }"
        >
          <button @click="closeImageModal" class="absolute right-6 top-6">
            <i class="pi pi-times text-dark dark:text-light"></i>
          </button>
          <div
            class="transition-all"
            ref="imageWrapper"
            @dblclick="handleDoubleTap"
          >
            <Image
              ref="imageWrapper"
              :src="String(images[activeImageIndex].url)"
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
            v-if="images.length > 1"
          >
            <i
              class="pi pi-angle-left light-ripple rounded-full bg-primary p-2 text-light shadow-md dark:bg-primary-200"
              v-ripple
            ></i>
          </button>
          <button
            class="absolute right-4 hidden md:block"
            @click="showNextImage"
            v-if="images.length > 1"
          >
            <i
              class="pi pi-angle-right rounded-full bg-primary p-2 text-light shadow-md dark:bg-primary-200"
              v-ripple
            ></i>
          </button>
        </div>
        <div class="w-full">
          <p
            class="absolute bottom-6 left-6 rounded-full bg-primary p-2 text-center text-sm text-light shadow-md dark:bg-primary-200"
          >
            {{ activeImageIndex + 1 }} / {{ images.length }}
          </p>

          <button
            class="absolute bottom-6 right-6 md:block"
            @click="rotateLeft"
          >
            <i
              class="pi pi-replay rounded-full bg-primary p-2 text-light shadow-md dark:bg-primary-200"
              v-ripple
            ></i>
          </button>
          <button
            class="absolute bottom-6 right-20 md:block"
            @click="rotateRight"
          >
            <i
              class="pi pi-refresh rounded-full bg-primary p-2 text-light shadow-md dark:bg-primary-200"
              v-ripple
            ></i>
          </button>
        </div>
      </Dialog>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import type { Image } from "@/types/hotel";

const props = defineProps<{
  images: Array<Image> | null;
  visible: boolean;
}>();

const emit = defineEmits(["update:visible"]);

const showImageModal = ref(false);
const activeImageIndex = ref(0);
const imageWrapper = ref(null) as Ref<HTMLImageElement | null>;
const activeImageRotation = ref(0);
const imageZoomedIn = ref(false);

const images = props.images ?? [];

const openImageModal = (index: number): void => {
  activeImageIndex.value = index;
  showImageModal.value = true;
};

const closeImageModal = (): void => {
  showImageModal.value = false;
};

const showNextImage = (): void => {
  activeImageIndex.value = (activeImageIndex.value + 1) % images.length;
};

const showPreviousImage = (): void => {
  activeImageIndex.value =
    (activeImageIndex.value - 1 + images.length) % images.length;
};

const rotateLeft = (): void => {
  if (imageWrapper.value) {
    activeImageRotation.value = (activeImageRotation.value - 90) % 360;
    imageWrapper.value.style.transform = `rotate(${activeImageRotation.value}deg)`;
  }
};

const rotateRight = (): void => {
  if (imageWrapper.value) {
    activeImageRotation.value = (activeImageRotation.value + 90) % 360;
    imageWrapper.value.style.transform = `rotate(${activeImageRotation.value}deg)`;
  }
};

const handlePinchIn = (): void => {
  if (imageWrapper.value) {
    imageWrapper.value.style.transform = `scale(1) rotate(${activeImageRotation.value}deg)`;
  }
};

const handlePinchOut = (): void => {
  if (imageWrapper.value) {
    imageWrapper.value.style.transform = `scale(2) rotate(${activeImageRotation.value}deg)`;
  }
};

const handleDoubleTap = (): void => {
  if (imageWrapper.value) {
    imageZoomedIn.value = !imageZoomedIn.value;
    imageWrapper.value.style.transform = imageZoomedIn.value
      ? `scale(2) rotate(${activeImageRotation.value}deg)`
      : `scale(1) rotate(${activeImageRotation.value}deg)`;
  }
};

const fadeInClass = ref("animate-fade-in");

watch(activeImageIndex, () => {
  activeImageRotation.value = 0;
  if (imageWrapper.value) {
    imageWrapper.value.style.transform = "rotate(0deg)";
  }
  fadeInClass.value = "";
  nextTick(() => {
    fadeInClass.value = "animate-fade-in";
  });
});

const updateVisible = (value: boolean) => {
  emit("update:visible", value);
};

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
