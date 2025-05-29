<template>
  <FilterSection>
    <FilterHeader
      :title="$t('Search.hotelClass.title')"
      :description="$t('Search.hotelClass.description')"
    >
      <template #counter>
        <SelectionCounter
          :count="selectedCount"
          :label="$t('Search.hotelClass.selected') || 'selected'"
        />
      </template>
    </FilterHeader>

    <div class="mx-auto flex items-center justify-between gap-2 md:w-2/4">
      <FilterButton
        v-for="hotelClass in classes"
        :key="hotelClass"
        :isSelected="isSelected(hotelClass)"
        :showCheckmark="hotelClass !== 'all'"
        @click="toggleClass(hotelClass)"
      >
        {{ hotelClass === "all" ? $t("Search.hotelClass.all") : hotelClass }}
      </FilterButton>
    </div>
  </FilterSection>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, watch } from "vue";
import FilterSection from "./Common/FilterSection.vue";
import FilterHeader from "./Common/FilterHeader.vue";
import SelectionCounter from "./Common/SelectionCounter.vue";
import FilterButton from "./Common/FilterButton.vue";

const emit = defineEmits(["update:modelValue"]);

const classes = ["all", "1", "2", "3", "4", "5"];

const { modelValue } = defineProps({
  modelValue: {
    type: Array as () => string[],
    required: true,
    default: () => [],
  },
});

const selectedClasses = ref<string[]>([...modelValue]);

// Check if a class is selected
const isSelected = (hotelClass: string): boolean => {
  if (hotelClass === "all") {
    return (
      selectedClasses.value.includes("all") ||
      selectedClasses.value.length === 0
    );
  }
  return selectedClasses.value.includes(hotelClass);
};

// Toggle class selection
const toggleClass = (hotelClass: string) => {
  if (hotelClass === "all") {
    // If "all" is clicked, toggle between selecting all classes and clearing selection
    if (
      selectedClasses.value.includes("all") ||
      selectedClasses.value.length === 0
    ) {
      selectedClasses.value = [];
    } else {
      selectedClasses.value = ["all"];
    }
  } else {
    // Remove "all" if it's selected when selecting individual classes
    if (selectedClasses.value.includes("all")) {
      selectedClasses.value = selectedClasses.value.filter((c) => c !== "all");
    }

    // Toggle the specific class
    if (selectedClasses.value.includes(hotelClass)) {
      selectedClasses.value = selectedClasses.value.filter(
        (c) => c !== hotelClass,
      );
    } else {
      selectedClasses.value = [...selectedClasses.value, hotelClass];
    }
  }
};

// Count of selected classes
const selectedCount = computed(() => {
  if (selectedClasses.value.includes("all")) return 1;
  return selectedClasses.value.length;
});

watchEffect(() => {
  emit("update:modelValue", selectedClasses.value);
});

// Watch for external changes to modelValue and only update if different
watch(
  () => modelValue,
  (newValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(selectedClasses.value)) {
      selectedClasses.value = [...newValue];
    }
  },
  { immediate: true },
);
</script>

<style scoped></style>
