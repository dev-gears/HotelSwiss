<template>
  <div class="rounded-md shadow shadow-primary-500">
    <NuxtLink :to="`/hotel/${hotel.id}`">
      <img class="rounded-md" :src="`/${hotel.image}`" height="200px" />
    </NuxtLink>
    <div class="p-2">
      <NuxtLink :to="`/hotel/${hotel.id}`">
        <h3 class="text-xl font-semibold">{{ hotel.name }}</h3>
      </NuxtLink>
      <NuxtLink :to="`/category/${hotel.category.id}`">
        <p class="text-sm text-gray-500">{{ hotel.category.name }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Hotel } from "@/types/hotel";

const { hotel } = defineProps<{ hotel: Hotel }>();
</script>
