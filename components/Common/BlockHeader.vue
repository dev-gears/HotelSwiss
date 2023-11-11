<template>
  <h2 class="bold font-arial mb-3 w-full pb-3 text-2xl text-primary">
    {{ title }}
  </h2>
</template>

<script setup lang="ts">
defineProps({
  title: String,
});
</script>
