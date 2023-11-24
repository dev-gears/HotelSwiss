<template>
  <p class="hotel-desc font-robotoRegular text-xs text-white">
    {{ description }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  description: string;
}>();
</script>

<style>
.hotel-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
