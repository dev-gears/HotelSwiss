<template>
  <Drawer
    dismissableMask
    position="bottom"
    closable
    v-model:visible="formVisible"
    modal
    blockScroll
    :ptOptions="{ mergeSections: false }"
    :pt="{
      root: 'bg-primary h-full w-full fixed bottom-0 left-0 !rounded-t-3xl transition-all !h-[90%]',
      header:
        'bg-light z-50 border-b border-primary/30 rounded-t-3xl fixed w-full flex !justify-end items-center !py-2 !px-6',
      content:
        'bg-light !pt-14 rounded-t-3xl overflow-y-scroll flex flex-col gap-6',
      footer:
        'bg-light bottom-0 border-t border-primary/30 !py-2 !px-6 flex justify-between',
      mask: 'bg-primary/50 !transition-all',
    }"
  >
    <ContactForm class="px-3 py-6" />
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const formVisible = ref(false);
</script>

<style scoped></style>
