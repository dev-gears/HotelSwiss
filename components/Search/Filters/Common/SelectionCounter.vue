<template>
  <div v-if="count > 0" class="flex items-center gap-2">
    <div
      class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-light dark:bg-primary-200"
    >
      {{ count }}
    </div>
    <span class="text-sm text-primary-200/70 dark:text-light/70">
      {{ label }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  count: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    default: "selected",
  },
});
</script>
