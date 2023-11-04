<template>
  <div class="rounded-md shadow">
    <NuxtLink :to="`/hotel/${hotel.id}`">
      <img
        class="aspect-video w-full rounded-md object-cover"
        :src="`http://46.101.106.134:8080${hotel.images[0].image.url}`"
        height="200px"
      />
    </NuxtLink>
    <div class="p-2">
      <NuxtLink :to="`/hotel/${hotel.id}`">
        <h3 class="text-xl font-semibold">{{ hotel.title }}</h3>
      </NuxtLink>
      <NuxtLink :to="`/category/${hotel.categories[0].category.id}`">
        <p class="text-sm text-gray-500">
          {{ hotel.categories[0].category.name }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Hotel } from "@/types/hotel";

const baseUrl = process.env.NUXT_ENV_BASE_URL;
const { hotel } = defineProps<{ hotel: Hotel }>();
</script>
