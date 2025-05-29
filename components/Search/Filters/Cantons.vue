<template>
  <FilterSection>
    <div class="container mx-auto">
      <FilterHeader
        :title="$t('Search.cantons.title')"
        :description="$t('Search.cantons.description')"
      />
      <div class="flex flex-wrap items-start justify-center gap-2.5 pt-3">
        <div
          v-for="canton in visibleCantons"
          :key="'canton' + canton?.id"
          v-ripple
          class="ripple-box relative flex h-20 min-w-[80px] max-w-[80px] cursor-pointer items-center justify-center rounded-2xl bg-light text-center font-robotoRegular text-sm text-primary-200 shadow-md transition-all duration-500 hover:bg-light-100 dark:border dark:border-primary-200/20 dark:bg-dark-200 dark:text-light dark:shadow-primary"
          :class="{
            'bg-primary !text-light shadow-primary/20 hover:opacity-90 dark:bg-primary':
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
      <FilterActions>
        <ViewAllButton
          v-if="shouldShowLoadMoreButton"
          @click="loadMore"
          :label="$t('Common.viewAll')"
        />
      </FilterActions>
    </div>
  </FilterSection>
</template>

<script setup lang="ts">
import type { Canton } from "@/types/hotel";
import { ref, watchEffect } from "vue";
import { useLoadMore } from "@/composables/useLoadMore";
import Button from "primevue/button";
import FilterSection from "./Common/FilterSection.vue";
import FilterHeader from "./Common/FilterHeader.vue";
import FilterActions from "./Common/FilterActions.vue";
import ViewAllButton from "./Common/ViewAllButton.vue";

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
