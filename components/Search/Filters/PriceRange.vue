<template>
  <div class="border-b border-primary/30 px-3 pb-6 dark:border-primary-100/30">
    <div class="container mx-auto">
      <h3 class="font-robotoRegular text-xl text-primary-200 dark:text-light">
        {{ $t("Search.priceRange.title") }}
      </h3>
      <p class="font-robotoRegular text-sm text-primary-200 dark:text-light/80">
        {{ $t("Search.priceRange.description") }}
      </p>
      <div
        class="grid w-full grid-cols-3 items-center justify-between gap-3 pt-3"
      >
        <InputNumber
          v-ripple
          :pt="{
            root: '!w-full [&_input]:!w-full rounded-md p-2 !bg-light-100 dark:!bg-dark-200 border border-primary/20 dark:border-primary-100/20 text-primary-200 dark:text-light [&_input]:text-primary-200 dark:[&_input]:text-light',
          }"
          v-model="minPriceInput"
          inputId="min"
          :placeholder="$t('Search.priceRange.min')"
          @update:modelValue="updatePriceRange"
        />
        <hr class="border-primary/20 dark:border-primary-100/20" />
        <InputNumber
          v-ripple
          :pt="{
            root: '!w-full [&_input]:!w-full rounded-md p-2 bg-light-100 dark:bg-dark-200 border border-primary/20 dark:border-primary-100/20 text-primary-200 dark:text-light [&_input]:text-primary-200 dark:[&_input]:text-light',
          }"
          v-model="maxPriceInput"
          inputId="max"
          :placeholder="$t('Search.priceRange.max')"
          @update:modelValue="updatePriceRange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, type Ref, ref } from "vue";
import { useFiltersStore } from "@/store/filters";

const emit = defineEmits(["update:modelValue"]);
const filtersStore = useFiltersStore();

defineProps({
  minPrice: {
    type: Number as PropType<number | undefined>,
    required: true,
  },
  maxPrice: {
    type: Number as PropType<number | undefined>,
    required: true,
  },
});

const minPriceInput = ref(filtersStore.filters.price_range.from);
const maxPriceInput = ref(filtersStore.filters.price_range.to);

const updatePriceRange = () => {
  emit("update:modelValue", {
    from: minPriceInput.value ?? 0,
    to: maxPriceInput.value,
  });
};
</script>
