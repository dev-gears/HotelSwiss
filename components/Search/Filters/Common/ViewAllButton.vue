<template>
  <Button
    v-if="visible"
    @click="$emit('click')"
    variant="text"
    class="bg-white p-2 text-primary-200 underline shadow-sm transition-all hover:bg-light-100 hover:shadow-md dark:bg-dark-100 dark:text-light dark:shadow-primary-200/20 dark:hover:bg-dark-200"
    :label="label"
  />
</template>

<script setup lang="ts">
import Button from "primevue/button";

defineProps({
  visible: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: "View All",
  },
});

defineEmits(["click"]);
</script>
