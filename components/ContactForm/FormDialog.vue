<template>
  <Drawer
    dismissableMask
    position="bottom"
    closable
    v-model:visible="localVisible"
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
    <ContactForm
      class="px-3 py-6"
      :hotelId="hotelId"
      :hotelTitle="hotelTitle"
      :hotelEmail="hotelEmail"
    />
  </Drawer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Drawer from "primevue/drawer";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  hotelId: {
    type: [String, Number],
    default: null,
  },
  hotelTitle: {
    type: String,
    default: "",
  },
  hotelEmail: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:visible"]);

const localVisible = ref(props.visible);

watch(
  () => props.visible,
  (newValue) => {
    localVisible.value = newValue;
  },
);

watch(localVisible, (newValue) => {
  emit("update:visible", newValue);
});
</script>

<style scoped></style>
