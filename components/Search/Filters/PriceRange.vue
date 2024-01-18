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
        @update="updatePriceRange"
        :min="minPrice"
        :max="maxPrice"
      />
      <hr class="w-1/4 border-primary/20" />
      <InputNumber
        :pt="{
          root: 'w-1/3',
          input: 'w-full rounded-md p-2 bg-light-100 border border-primary/20',
        }"
        v-model="maxPriceInput"
        @update="updatePriceRange"
        inputId="max"
        :min="minPrice"
        :max="maxPrice"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["update:modelValue"]);

const { minPrice, maxPrice } = defineProps({
  minPrice: Number,
  maxPrice: Number,
});

const minPriceInput: Ref<number | undefined> = ref(minPrice);
const maxPriceInput: Ref<number | undefined> = ref(maxPrice);

const updatePriceRange = () => {
  emit("update:modelValue", {
    from: minPriceInput.value,
    to: maxPriceInput.value,
  });
};
</script>
