<template>
  <div class="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
    <CardGridCard v-for="hotel in hotels" :hotel="hotel" />
  </div>
</template>

<script setup lang="ts">
import { Hotel } from "types/hotel";
const { hotels } = defineProps({
  hotels: {
    type: Array<Hotel>,
  },
});
</script>