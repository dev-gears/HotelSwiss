<template>
  <div class="border-b border-primary/30 px-3 pb-6 dark:border-primary-200">
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
          v-model="minPriceInput"
          inputId="min"
          :placeholder="$t('Search.priceRange.min')"
          :currency="currency"
          :locale="locale"
          :pt="{
            root: {
              class:
                'w-full !rounded-xl bg-light px-2 !pl-3 text-primary-200 transition-all placeholder:text-primary-200/70 hover:text-primary focus:shadow-md dark:bg-dark-300 dark:text-light dark:placeholder:text-light/70 dark:hover:text-light/90 dark:focus:shadow-primary-200/20',
            },
          }"
          @update:modelValue="updatePriceRange"
        />
        <hr class="border-primary/20 dark:border-primary-200" />
        <InputNumber
          v-ripple
          v-model="maxPriceInput"
          inputId="max"
          :placeholder="$t('Search.priceRange.max')"
          :currency="currency"
          :locale="locale"
          :pt="{
            root: 'w-full rounded-md border border-primary/20 bg-light-100 p-2 text-primary-200 dark:border-primary-100/20 dark:!bg-dark-300 dark:text-light',
            inputText: { class: 'w-full text-primary-200 dark:text-light' },
          }"
          @update:modelValue="updatePriceRange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, type Ref, ref, toRefs, watch } from "vue";
import InputNumber from "primevue/inputnumber";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  minPrice: {
    type: Number as PropType<number | null>,
    required: true,
  },
  maxPrice: {
    type: Number as PropType<number | null>,
    required: true,
  },
  currency: {
    type: String as PropType<string>,
    default: "USD",
  },
  locale: {
    type: String as PropType<string>,
    default: "en-US",
  },
  modelValue: {
    type: Object as PropType<{ from: number | null; to: number | null }>,
    required: true,
  },
});

// Use values from props.modelValue or fallback to minPrice/maxPrice
const minPriceInput = ref(props.modelValue.from);
const maxPriceInput = ref(props.modelValue.to);

// When modelValue prop changes, update local inputs
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      minPriceInput.value = newValue.from;
      maxPriceInput.value = newValue.to;
    }
  },
  { immediate: true },
);

const updatePriceRange = () => {
  emit("update:modelValue", {
    from: minPriceInput.value ?? 0,
    to: maxPriceInput.value,
  });
};
</script>
