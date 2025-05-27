<template>
  <div
    class="grid border-b border-primary/30 px-3 pb-6 dark:border-primary-200"
  >
    <div class="container mx-auto">
      <h3 class="font-robotoRegular text-xl text-primary-200 dark:text-light">
        {{ $t("Search.cantons.title") }}
      </h3>
      <p class="font-robotoRegular text-sm text-primary-200 dark:text-light/80">
        {{ $t("Search.cantons.description") }}
      </p>
      <div class="flex flex-wrap items-start justify-center gap-2.5 pt-3">
        <div
          v-for="canton in visibleCantons"
          :key="'canton' + canton?.id"
          v-ripple
          class="ripple-box relative flex h-20 min-w-[80px] max-w-[80px] cursor-pointer items-center justify-center rounded-2xl bg-light text-center font-robotoRegular text-sm text-primary-200 shadow-md transition-all duration-500 hover:bg-light-100 dark:border dark:border-primary-200/20 dark:bg-dark-200 dark:text-light dark:shadow-primary dark:hover:bg-dark-200"
          :class="{
            'bg-primary !text-light shadow-primary/20 hover:!text-dark-100 hover:opacity-90 dark:bg-primary dark:hover:opacity-90':
              isSelected(canton),
          }"
          @click="addOrRemoveCanton(canton)"
        >
          <div
            v-if="canton?.image?.url"
            class="absolute h-12 w-12 rounded-full bg-cover bg-center bg-no-repeat shadow-sm dark:shadow-primary-200/10"
            :style="`background-image: url('${backendUrl}${canton?.image?.url}');`"
          ></div>
          {{ canton?.name }}
        </div>
      </div>
      <div class="flex items-center justify-center pt-4">
        <Button
          v-if="shouldShowLoadMoreButton"
          @click="loadMore"
          variant="text"
          class="bg-white p-2 text-primary-200 underline shadow-sm transition-all hover:bg-light-100 hover:shadow-md dark:bg-dark-100 dark:text-light dark:shadow-primary-200/20 dark:hover:bg-dark-200"
          :label="$t('Common.viewAll')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Canton } from "@/types/hotel";
import { ref, watchEffect } from "vue";
import { useLoadMore } from "@/composables/useLoadMore";
import Button from "primevue/button";

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
  @apply bg-primary text-light shadow-primary/20 dark:bg-primary dark:shadow-primary-100/20;
}
</style>
