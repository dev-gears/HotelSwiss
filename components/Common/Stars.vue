<template>
  <div class="flex items-center justify-center">
    <img
      v-for="index in stars"
      src="~/assets/icons/star.svg"
      :key="index"
      alt="hotel star"
      class="h-4 w-4 !opacity-100 transition-all duration-300 dark:brightness-[1.15] dark:contrast-125 dark:hue-rotate-[-10deg]"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stars: number;
}>();
</script>

<style>
img {
  filter: brightness(1) contrast(1);
  transition: filter 0.3s ease-in-out;
}
</style>
