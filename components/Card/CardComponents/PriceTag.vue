<template>
  <div
    class="absolute left-2.5 top-2.5 rounded-[10px] bg-primary px-3 py-1.5 shadow-cardImage"
  >
    <p class="text-light font-patuaOne text-sm">
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
