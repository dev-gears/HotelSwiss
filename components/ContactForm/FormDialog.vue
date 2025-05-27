<template>
  <Drawer
    dismissableMask
    position="bottom"
    closable
    v-model:modelValue="formVisible"
    modal
    blockScroll
    size="large"
    class="h-[90%] rounded-t-3xl"
    :pt="{
      root: 'bg-light dark:bg-dark-200 transition-colors',
      header:
        'bg-light dark:bg-dark-200 border-b border-primary/30 dark:border-light/10',
      content: 'bg-light dark:bg-dark-200',
      mask: 'bg-primary/50 dark:bg-dark/70 backdrop-blur-[2px]',
    }"
  >
    <ContactForm class="px-3 py-6" />
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Drawer from "primevue/drawer";

const formVisible = ref(false);
</script>

<style scoped></style>
