<template>
  <div class="mb-4 flex items-center justify-between">
    <div>
      <h3 class="font-robotoRegular text-xl text-primary-200 dark:text-light">
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="my-3 font-robotoRegular text-sm text-primary-200 dark:text-light/80"
      >
        {{ description }}
      </p>
    </div>
    <slot name="counter"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
});
</script>
