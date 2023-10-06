<template>
  <Dialog
    v-model="showFilters"
    header="Filters"
    :modal="true"
    :visible="showFilters"
    @hide="showFilters = false"
  >
    <Cantons />
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showFilters = ref(false);

defineProps({
  showFilters: {
    type: Boolean,
    required: false,
  },
  onShowFilters: {
    type: Function,
    required: false,
  },
  onHideFilters: {
    type: Function,
    required: false,
  },
});
</script>
