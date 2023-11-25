<template>
  <div
    class="absolute left-2.5 top-2.5 rounded-[10px] bg-primary-500 px-3 py-1.5 shadow-cardImage"
  >
    <p class="font-patuaOne text-sm text-white">
      {{ startPrice || "-" }}$ / {{ endPrice || "-" }}$
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  startPrice: string;
  endPrice: string;
}>();
</script>
