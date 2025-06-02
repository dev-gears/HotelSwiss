<template>
  <div v-if="category" class="bg-primary py-20 text-light dark:bg-dark-300">
    <div class="container mx-auto px-3">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="font-patuaOne text-5xl font-bold">
            {{ category.name }}
          </h1>
          <p class="mt-4 font-robotoRegular text-xl text-light/90">
            {{ $t("Category.hero.subtitle", { count: hotelCount }) }}
          </p>
        </div>

        <!-- Category Image -->
        <div v-if="category.image" class="ml-8 hidden md:block">
          <img
            :src="String(category.image.url) || String(category.image.original)"
            :alt="category.name"
            class="h-32 w-32 rounded-lg object-cover shadow-lg"
          />
        </div>

        <!-- Default Icon when no image -->
        <div v-else class="ml-8 hidden md:block">
          <div
            class="flex h-32 w-32 items-center justify-center rounded-lg bg-light/10 shadow-lg"
          >
            <i class="pi pi-th-large text-4xl text-light/70" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from "@/types/hotel";

defineProps<{
  category?: Category;
  hotelCount: number;
}>();
</script>
