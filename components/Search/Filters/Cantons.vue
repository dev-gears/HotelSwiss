<template>
  <div class="grid border-b border-primary/30 pb-6">
    <h3 class="font-robotoRegular text-xl text-primary-200">Cantons</h3>
    <p class="font-robotoRegular text-sm text-primary-200">
      Select one or more cantons from the list below.
    </p>
    <div class="flex flex-wrap items-start justify-center gap-2.5 pt-3">
      <div
        v-for="canton in visibleCantons"
        :key="'canton' + canton?.id"
        class="relative flex h-20 min-w-[80px] max-w-[80px] cursor-pointer items-center justify-center rounded-2xl bg-light text-center font-robotoRegular text-sm text-primary-200 shadow-filters"
        :class="{ selected: isSelected(canton) }"
        @click="addOrRemoveCanton(canton)"
      >
        <div
          v-if="canton?.image?.renditions?.thumbnail"
          class="absolute h-12 w-12 rounded-full bg-cover bg-center bg-no-repeat"
          :style="`background-image: url('${backendUrl}${canton?.image?.renditions?.thumbnail}');`"
        ></div>
        {{ canton?.name }}
      </div>
    </div>
    <div class="flex items-center justify-center">
      <Button
        v-if="shouldShowLoadMoreButton"
        @click="loadMore"
        class="bg-white p-2 text-primary-200 underline"
        :label="$t('Common.viewAll')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Canton } from "@/types/hotel";
import { ref, watchEffect } from "vue";
import { useLoadMore } from "@/composables/useLoadMore";

const emit = defineEmits(["update:modelValue"]);
const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;

const { cantons, modelValue } = defineProps<{
  cantons: Array<Canton>;
  modelValue: Array<Canton>;
}>();

const selectedCantons = ref(modelValue);

/**
 * Check if a canton is selected
 * @param canton
 * @returns boolean
 */
const isSelected = (canton: Canton) => {
  return selectedCantons.value.includes(canton);
};

/**
 * Add or remove a canton from the selected cantons
 * @param canton
 */
const addOrRemoveCanton = (canton: Canton) => {
  if (isSelected(canton)) {
    selectedCantons.value = selectedCantons.value.filter((c) => c !== canton);
  } else {
    selectedCantons.value = [...selectedCantons.value, canton];
  }
};

const {
  visibleItems: visibleCantons,
  shouldShowLoadMoreButton,
  loadMore,
} = useLoadMore(cantons, 9);

watchEffect(() => {
  emit("update:modelValue", selectedCantons.value);
});
</script>

<style>
.selected {
  @apply bg-primary text-light;
}
</style>
