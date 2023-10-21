<template>
  <div
    class="card relative aspect-[2/3] w-full rounded-md shadow shadow-primary-500 transition-[scale] ease-in-out max-md:max-h-60"
  >
    <NuxtLink :to="`/hotel/${hotel.id}`">
      <img
        class="h-full w-full rounded-md object-cover"
        :src="`/${hotel.image}`"
        height="100%"
      />
    </NuxtLink>
    <CommonBackdrop class="absolute bottom-0 w-full">
      <NuxtLink :to="`/hotel/${hotel.id}`">
        <h3 class="rounded border border-white p-2 text-2xl">
          {{ hotel.name }}
        </h3>
      </NuxtLink>
      <NuxtLink :to="`/category/${hotel.category.id}`">
        <p class="border-b border-white p-2 text-sm">
          {{ hotel.category.name }}
        </p>
      </NuxtLink>
    </CommonBackdrop>
  </div>
</template>

<script setup lang="ts">
import { Hotel } from "@/types/hotel";

defineProps<{ hotel: Hotel }>();
</script>
