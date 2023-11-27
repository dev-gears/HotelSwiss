<template>
  <p class="text-light mb-1.5 flex font-patuaOne text-lg" v-if="stars">
    <span class="mr-1.5">{{ stars }}</span>
    <img
      v-for="index in stars"
      :key="index"
      src="~/assets/icons/star.svg"
      alt="star"
      class="star-icon mr-1"
    />
  </p>
</template>

<script setup lang="ts">
defineProps<{
  stars: number;
}>();
</script>
