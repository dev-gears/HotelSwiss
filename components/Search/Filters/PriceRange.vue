<template>
  <div class="border-b border-primary/30 pb-6">
    <h3 class="font-robotoRegular text-xl text-primary-200">Price Range</h3>
    <p class="font-robotoRegular text-sm text-primary-200">
      Adjust the price range to suit your budget. You can set both a minimum and
      maximum price.
    </p>
    <div class="flex w-full items-center justify-between pt-3">
      <InputNumber
        :pt="{
          root: 'w-1/3',
          input: 'w-full rounded-md p-2 bg-light-100 border border-primary/20',
        }"
        v-model="minPriceInput"
        inputId="min"
        @update:modelValue="updatePriceRange"
      />
      <hr class="w-1/4 border-primary/20" />
      <InputNumber
        :pt="{
          root: 'w-1/3',
          input: 'w-full rounded-md p-2 bg-light-100 border border-primary/20',
        }"
        v-model="maxPriceInput"
        @update:modelValue="updatePriceRange"
        inputId="max"
      />
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
