<template>
  <div class="mb-10">
    <h3 class="font-robotoRegular text-xl text-primary-200">Price Range</h3>
    <p class="font-robotoRegular text-sm text-primary-200">
      Lorem ipsum dolor sit amet consectetur. Id non pellentesque pellentesque.
    </p>
    <div class="mb-10 pt-5">
      <img src="~/assets/images/PriceRangeChart.svg" alt="" />
      <Slider
        inputId="slider"
        @change="changedPriceRange"
        range
        v-model="sliderPrice"
        class="w-14rem"
      />
    </div>
    <div class="flex justify-between bg-primary-100">
      <InputNumber
        v-model="minPriceInput"
        inputId="min"
        :min="minPrice"
        :max="maxPrice"
      />
      <div><hr class="w-10" /></div>
      <InputNumber
        v-model="maxPriceInput"
        inputId="max"
        :min="minPrice"
        :max="maxPrice"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  minPrice: Number,
  maxPrice: Number,
});

const { minPrice, maxPrice } = props;
let minPriceInput = ref(minPrice);
let maxPriceInput = ref(maxPrice);
let sliderPrice = ref([minPrice, maxPrice]);

console.log(minPrice, maxPrice);

const changedPriceRange = () => {
  console.log(sliderPrice.value);
};
</script>

<style scoped></style>
