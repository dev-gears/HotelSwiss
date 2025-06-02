<template>
  <div
    class="group relative cursor-pointer overflow-hidden rounded-lg bg-light shadow-md transition-all duration-300 hover:shadow-lg dark:bg-dark-300"
    @click="handleClick"
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <div
        class="flex h-full w-full items-center justify-center bg-light-200 dark:bg-dark-200"
      >
        <img
          v-if="image"
          :src="getImageUrl(image)"
          :alt="title"
          class="h-full w-full object-contain p-3 invert transition-transform duration-200 group-hover:scale-105 dark:invert-0"
        />
        <i
          v-else
          :class="fallbackIcon"
          class="text-4xl text-gray-400 dark:text-gray-500"
        />
      </div>

      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
      />

      <!-- Count Badge -->
      <div
        v-if="count !== undefined"
        class="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-sm font-medium text-light"
      >
        {{ count }} {{ $t("Common.hotels") }}
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3
        class="font-robotoRegular text-lg font-semibold text-dark dark:text-light"
      >
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="mt-2 font-robotoRegular text-sm text-gray-600 dark:text-gray-400"
      >
        {{ description }}
      </p>
    </div>

    <!-- Hover Arrow -->
    <div
      class="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    >
      <i class="pi pi-arrow-right text-primary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHotelImage } from "#imports";

interface Props {
  id: number;
  title: string;
  description?: string;
  image?: string;
  count?: number;
  type: "canton" | "category";
  fallbackIcon?: string;
}

const { getImageUrl } = useHotelImage();

const props = withDefaults(defineProps<Props>(), {
  fallbackIcon: "pi pi-image",
});

const emit = defineEmits<{
  click: [id: number, type: "canton" | "category"];
}>();

const handleClick = () => {
  emit("click", props.id, props.type);
};
</script>
