<template>
  <div v-if="canton" class="bg-primary py-20 text-light dark:bg-dark-300">
    <div class="container mx-auto px-3">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="font-patuaOne text-5xl font-bold">
            {{ canton.name }}
          </h1>
          <p class="mt-4 font-robotoRegular text-xl text-light/90">
            {{ $t("Canton.hero.subtitle", { count: hotelCount }) }}
          </p>
        </div>

        <!-- Canton Image -->
        <div v-if="canton.image" class="ml-8 hidden md:block">
          <img
            :src="String(canton.image.url) || String(canton.image.original)"
            :alt="canton.name"
            class="h-32 w-32 rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Canton } from "@/types/hotel";

defineProps<{
  canton?: Canton;
  hotelCount: number;
}>();
</script>
