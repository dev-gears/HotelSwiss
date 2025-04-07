<template>
  <div class="flex items-center justify-center">
    <img
      v-for="index in stars"
      src="~/assets/icons/star.svg"
      :key="index"
      alt="hotel star"
      class="dark:brightness-90"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stars: number;
}>();
</script>
