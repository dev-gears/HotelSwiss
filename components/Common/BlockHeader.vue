<template>
  <div class="mb-3 flex w-full items-center justify-between">
    <h2 class="text-title-primary w-full font-patuaOne text-2xl">
      {{ title }}
    </h2>
    <div v-if="link">
      <NuxtLink
        :to="`${link}`"
        class="whitespace-nowrap text-primary underline hover:text-primary hover:no-underline"
      >
        View all
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  link: [String, Number],
});
</script>
