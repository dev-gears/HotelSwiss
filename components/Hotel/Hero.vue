<template>
  <div>
    <img :src="'/' + imageUrl" layout="fill" objectFit="cover" />
  </div>
  <div class="p-4">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps({
  imageUrl: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
