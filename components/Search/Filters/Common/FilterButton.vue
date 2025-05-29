<template>
  <div
    v-ripple
    class="relative flex cursor-pointer items-center justify-center rounded-lg bg-light px-4 py-2.5 text-center font-robotoRegular text-sm capitalize text-primary-200 shadow-md transition-all hover:bg-light-100 dark:bg-dark-100 dark:text-light dark:shadow-primary-200/20 dark:hover:bg-dark-200"
    :class="{
      'bg-primary !text-light hover:opacity-90 dark:bg-primary dark:shadow-primary-100/20 dark:hover:opacity-90':
        isSelected,
    }"
    @click="$emit('click')"
  >
    <slot></slot>
    <div
      v-if="isSelected && showCheckmark"
      class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-200 shadow-sm dark:bg-primary"
    >
      <i class="pi pi-check text-xs text-light"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isSelected: {
    type: Boolean,
    default: false,
  },
  showCheckmark: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["click"]);
</script>
