<template>
  <div class="mb-10">
    <h3 class="font-robotoRegular text-xl text-primary-200">Price Range</h3>
    <p class="font-robotoRegular text-sm text-primary-200">
      Lorem ipsum dolor sit amet consectetur. Id non pellentesque pellentesque.
    </p>
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

const emit = defineEmits(["update:modelValue", "register-clear"]);

const { minPrice, maxPrice } = defineProps({
  minPrice: Number,
  maxPrice: Number,
});

const minPriceInput: Ref<number | undefined> = ref(minPrice);
const maxPriceInput: Ref<number | undefined> = ref(maxPrice);

onMounted(() => {
  emit("register-clear", clearInputs);
});

const clearInputs = () => {
  minPriceInput.value = minPrice;
  maxPriceInput.value = maxPrice;
};

watchEffect(() => {
  emit("update:modelValue", {
    from: minPriceInput.value,
    to: maxPriceInput.value,
  });
});
</script>
