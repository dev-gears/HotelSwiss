<template>
  <FilterSection>
    <div class="container mx-auto">
      <FilterHeader
        :title="$t('Search.priceRange.title')"
        :description="$t('Search.priceRange.description')"
      />

      <div v-if="minPriceInput || maxPriceInput" class="mb-6">
        <div
          class="rounded-lg bg-primary/5 px-4 py-3 dark:border-primary-200 dark:bg-primary-200"
        >
          <div class="flex items-center justify-between">
            <span
              class="font-robotoRegular text-sm text-primary-200/70 dark:text-light/60"
            >
              {{ $t("Search.priceRange.selectedRange") || "Selected range:" }}
            </span>
            <span
              class="font-robotoRegular text-lg font-medium text-primary-200 dark:text-light"
            >
              {{ formatRangeDisplay() }}
            </span>
          </div>
        </div>
      </div>

      <div class="mb-6">
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            v-ripple
            v-for="preset in pricePresets"
            :key="preset.label"
            @click="selectPreset(preset)"
            :class="[
              'rounded-lg border-2 px-3 py-2 text-center font-robotoRegular text-sm transition-all duration-200',
              isPresetSelected(preset)
                ? 'border-primary bg-primary text-white dark:border-primary-200 dark:bg-primary-200'
                : 'border-primary/20 bg-light text-primary-200 hover:border-primary/40 dark:border-primary-200/20 dark:bg-dark-300 dark:text-light dark:hover:border-primary-200/40',
            ]"
          >
            <div class="font-medium">{{ preset.label }}</div>
            <div class="text-xs opacity-80">
              {{ formatPresetRange(preset) }}
            </div>
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span
            class="font-robotoRegular text-sm text-primary-200/70 dark:text-light/60"
          >
            {{ $t("Search.priceRange.customRange") || "Custom range" }}
          </span>
          <button
            v-ripple
            @click="toggleCustomRange"
            :class="[
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
              showCustomInputs
                ? 'bg-primary dark:bg-primary-200'
                : 'bg-gray-200 dark:bg-dark-300',
            ]"
          >
            <span
              :class="[
                'inline-block h-4 w-4 transform rounded-full bg-white transition duration-200',
                showCustomInputs ? 'translate-x-6' : 'translate-x-1',
              ]"
            />
          </button>
        </div>

        <div
          v-if="showCustomInputs"
          class="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div class="space-y-2">
            <label
              class="font-robotoRegular text-sm text-primary-200/70 dark:text-light/60"
            >
              {{ $t("Search.priceRange.min") }}
            </label>
            <div class="relative">
              <InputNumber
                v-model="minPriceInput"
                inputId="min"
                :placeholder="$t('Search.priceRange.min')"
                :currency="currency"
                mode="currency"
                :min="0"
                :step="10"
                :minFractionDigits="0"
                :maxFractionDigits="0"
                fluid
                :class="[
                  'w-full transition-all duration-200',
                  inputValidation.minValid ? 'ring-2 ring-green-500/20' : '',
                  !inputValidation.minValid && minPriceInput
                    ? 'ring-2 ring-red-500/20'
                    : '',
                ]"
                :pt="{
                  root: 'w-full rounded-xl bg-light border border-primary/10 hover:border-primary/20 focus-within:border-primary/30 dark:bg-dark-300 dark:border-primary-200/10 dark:hover:border-primary-200/20 dark:focus-within:border-primary-200/30 transition-all duration-200',
                  input:
                    'w-full !px-4 !py-3 text-primary-200 dark:text-light placeholder:text-primary-200/50 dark:placeholder:text-light/50 bg-transparent border-0 focus:ring-0 focus:outline-none',
                }"
                @update:modelValue="updatePriceRange"
                @blur="validateInputs"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label
              class="font-robotoRegular text-sm text-primary-200/70 dark:text-light/60"
            >
              {{ $t("Search.priceRange.max") }}
            </label>
            <div class="relative">
              <InputNumber
                v-model="maxPriceInput"
                inputId="max"
                :placeholder="$t('Search.priceRange.max')"
                :currency="currency"
                mode="currency"
                :min="0"
                :step="10"
                :minFractionDigits="0"
                :maxFractionDigits="0"
                fluid
                :class="[
                  'w-full transition-all duration-200',
                  inputValidation.maxValid ? 'ring-2 ring-green-500/20' : '',
                  !inputValidation.maxValid && maxPriceInput
                    ? 'ring-2 ring-red-500/20'
                    : '',
                ]"
                :pt="{
                  root: 'w-full rounded-xl bg-light border border-primary/10 hover:border-primary/20 focus-within:border-primary/30 dark:bg-dark-300 dark:!border-primary-200/10 dark:hover:border-primary-200/20 dark:focus-within:border-primary-200/30 transition-all duration-200',
                }"
                @update:modelValue="updatePriceRange"
                @blur="validateInputs"
              />
            </div>
          </div>
        </div>

        <div
          v-if="
            showCustomInputs &&
            !inputValidation.isValid &&
            (minPriceInput || maxPriceInput)
          "
          class="mt-2 text-sm text-red-500 opacity-80 dark:text-red-400"
        >
          {{ validationMessage }}
        </div>

        <div class="flex items-center justify-between pt-2">
          <button
            v-if="minPriceInput || maxPriceInput"
            @click="clearRange"
            class="font-robotoRegular text-sm text-primary-200/60 transition-colors duration-200 hover:text-primary-200 dark:text-light/60 dark:hover:text-light"
          >
            {{ $t("Common.clear") || "Clear" }}
          </button>
          <div
            class="font-robotoRegular text-xs text-primary-200/40 dark:text-light/40"
          >
            {{ $t("Search.priceRange.perNight") || "Per night" }}
          </div>
        </div>
      </div>
    </div>
  </FilterSection>
</template>

<script setup lang="ts">
import { type PropType, type Ref, ref, toRefs, watch, computed } from "vue";
import InputNumber from "primevue/inputnumber";
import { useI18n } from "vue-i18n";
import FilterSection from "./Common/FilterSection.vue";
import FilterHeader from "./Common/FilterHeader.vue";

const { t: $t } = useI18n();

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
    default: "CHF",
  },
  locale: {
    type: String as PropType<string>,
    default: "de-CH",
  },
  modelValue: {
    type: Object as PropType<{ from: number | null; to: number | null }>,
    required: true,
  },
});

const minPriceInput = ref(props.modelValue.from);
const maxPriceInput = ref(props.modelValue.to);
const showCustomInputs = ref(false);

type PricePreset = {
  label: string;
  key: string;
  min: number;
  max: number | null;
};

const pricePresets = computed((): PricePreset[] => [
  {
    label: $t("Search.priceRange.presets.budget"),
    key: "budget",
    min: 0,
    max: 150,
  },
  {
    label: $t("Search.priceRange.presets.midRange"),
    key: "midRange",
    min: 150,
    max: 300,
  },
  {
    label: $t("Search.priceRange.presets.luxury"),
    key: "luxury",
    min: 300,
    max: 500,
  },
  {
    label: $t("Search.priceRange.presets.premium"),
    key: "premium",
    min: 500,
    max: null,
  },
]);

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

const inputValidation = computed(() => {
  const min = minPriceInput.value;
  const max = maxPriceInput.value;

  const minValid = !min || (min >= 0 && (!max || min <= max));
  const maxValid = !max || (max >= 0 && (!min || max >= min));
  const isValid = minValid && maxValid;

  return { minValid, maxValid, isValid };
});

const validationMessage = computed(() => {
  const min = minPriceInput.value;
  const max = maxPriceInput.value;

  if (min && max && min > max) {
    return $t("Search.priceRange.validation.minGreaterThanMax");
  }
  if (min && min < 0) {
    return $t("Search.priceRange.validation.priceNegative");
  }
  if (max && max < 0) {
    return $t("Search.priceRange.validation.priceNegative");
  }
  return "";
});

const formatPrice = (price: number): string => {
  try {
    return new Intl.NumberFormat(props.locale, {
      style: "currency",
      currency: props.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } catch (error) {
    return `${props.currency} ${price}`;
  }
};

const selectPreset = (preset: PricePreset) => {
  minPriceInput.value = preset.min;
  maxPriceInput.value = preset.max;
  showCustomInputs.value = false;
  updatePriceRange();
};

const isPresetSelected = (preset: PricePreset) => {
  return (
    minPriceInput.value === preset.min && maxPriceInput.value === preset.max
  );
};

const formatPresetRange = (preset: PricePreset) => {
  const min = formatPrice(preset.min);
  const max = preset.max ? formatPrice(preset.max) : "+";
  return `${min} - ${max}`;
};

const formatRangeDisplay = () => {
  const min = minPriceInput.value ? formatPrice(minPriceInput.value) : "-";
  const max = maxPriceInput.value ? formatPrice(maxPriceInput.value) : "-";
  return `${min} - ${max}`;
};

const toggleCustomRange = () => {
  showCustomInputs.value = !showCustomInputs.value;
};

const validateInputs = () => {};

const clearRange = () => {
  minPriceInput.value = null;
  maxPriceInput.value = null;
  updatePriceRange();
};

const updatePriceRange = () => {
  emit("update:modelValue", {
    from: minPriceInput.value ?? 0,
    to: maxPriceInput.value,
  });
};
</script>

<style>
.p-inputnumber input {
  font-size: 1rem;
  padding: 0.5rem 1rem;
}
</style>
