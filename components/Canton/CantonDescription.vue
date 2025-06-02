<template>
  <div v-if="canton" class="rounded-lg bg-light p-6 shadow-md dark:bg-dark-300">
    <h2 class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light">
      {{ $t("Canton.about.title") }}
    </h2>

    <!-- Description (will be available when API is expanded) -->
    <div v-if="canton.description" class="prose prose-gray dark:prose-invert">
      <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
        {{ canton.description }}
      </p>
    </div>

    <!-- Placeholder content until API is expanded -->
    <div v-else class="space-y-4">
      <p class="font-robotoRegular text-gray-600 dark:text-gray-400">
        {{ $t("Canton.about.placeholder", { name: canton.name }) }}
      </p>

      <!-- Key Facts -->
      <div class="mt-6">
        <h3
          class="mb-3 font-robotoRegular text-lg font-semibold text-dark dark:text-light"
        >
          {{ $t("Canton.about.keyFacts") }}
        </h3>
        <ul
          class="space-y-2 font-robotoRegular text-gray-600 dark:text-gray-400"
        >
          <li class="flex items-center">
            <i class="pi pi-map-marker mr-2 text-primary" />
            {{ $t("Canton.about.location") }}: {{ canton.name }}
          </li>
          <li class="flex items-center">
            <i class="pi pi-flag mr-2 text-primary" />
            {{ $t("Canton.about.country") }}: {{ $t("Common.switzerland") }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Canton } from "@/types/hotel";

defineProps<{
  canton?: Canton;
}>();
</script>
