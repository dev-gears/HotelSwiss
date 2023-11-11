<template>
  <div>
    {{ route.params }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

definePageMeta({
  layout: "base",
});
</script>
