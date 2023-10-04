<template>
  <div class="rounded-md border">
    <img class="rounded-md" :src="`/${hotel.image}`" height="200px" />
    <div class="p-2">
      <h3>{{ hotel.name }}</h3>
      <p>{{ hotel.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Hotel } from "@/types/hotel";

defineProps<{ hotel: Hotel }>();
</script>
