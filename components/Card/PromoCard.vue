<template>
  <div
    class="card relative aspect-[2/3] rounded-md shadow shadow-primary-500 transition-[scale] ease-in-out"
  >
    <NuxtLink :to="`/hotel/${hotel.id}`">
      <img
        class="h-full rounded-md object-cover"
        :src="`/${hotel.image}`"
        height="100%"
      />
      <i
        class="pi pi-star-fill absolute right-2 top-2 h-7 w-7 text-yellow-300"
      ></i>
      <CommonBackdrop class="absolute bottom-0 w-full">
        <h3 class="rounded border border-white p-2 text-2xl">
          {{ hotel.name }}
        </h3>
        <p class="border-b border-white p-2 text-sm">
          {{ hotel.category.name }}
        </p>
      </CommonBackdrop>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Hotel } from "@/types/hotel";

defineProps<{ hotel: Hotel }>();
</script>
