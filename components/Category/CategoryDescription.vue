<template>
  <div
    v-if="category"
    class="rounded-lg bg-light p-6 shadow-md dark:bg-dark-300"
  >
    <h2 class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light">
      {{ $t("Category.about.title") }}
    </h2>
    <!-- Placeholder content for category information -->
    <div class="space-y-4">
      <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
        {{ $t("Category.about.placeholder", { name: category.name }) }}
      </p>

      <!-- Key Facts -->
      <div class="mt-6">
        <h3
          class="mb-3 font-robotoRegular text-lg font-semibold text-dark dark:text-light"
        >
          {{ $t("Category.about.keyFacts") }}
        </h3>
        <ul
          class="space-y-2 font-robotoRegular text-gray-600 dark:text-gray-400"
        >
          <li class="flex items-center">
            <i class="pi pi-th-large mr-2 text-primary" />
            {{ $t("Category.about.type") }}: {{ category.name }}
          </li>
          <li class="flex items-center">
            <i class="pi pi-map-marker mr-2 text-primary" />
            {{ $t("Category.about.location") }}: {{ $t("Common.switzerland") }}
          </li>
          <li class="flex items-center">
            <i class="pi pi-star mr-2 text-primary" />
            {{ $t("Category.about.quality") }}:
            {{ $t("Category.about.premium") }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from "@/types/hotel";

defineProps<{
  category?: Category;
}>();
</script>
