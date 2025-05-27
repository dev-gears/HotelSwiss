<template>
  <div
    class="container mx-auto border-b border-primary/30 px-3 pb-7 dark:border-primary-200"
  >
    <h3 class="font-robotoRegular text-xl text-primary-200 dark:text-light">
      {{ $t("Search.hotelClass.title") }}
    </h3>
    <p
      class="my-3 font-robotoRegular text-sm text-primary-200 dark:text-light/80"
    >
      {{ $t("Search.hotelClass.description") }}
    </p>
    <div class="mx-auto flex items-center justify-between gap-2 md:w-2/4">
      <div
        v-ripple
        v-for="hotelClass in classes"
        :key="hotelClass"
        class="relative flex cursor-pointer items-center justify-center rounded-lg bg-light px-4 py-2.5 text-center font-robotoRegular text-sm capitalize text-primary-200 shadow-md transition-all hover:bg-light-100 dark:bg-dark-100 dark:text-light dark:shadow-primary-200/20 dark:hover:bg-dark-200"
        :class="{
          'bg-primary !text-light hover:opacity-90 dark:bg-primary dark:shadow-primary-100/20 dark:hover:opacity-90':
            selectedClass === hotelClass,
        }"
        @click="addOrRemoveClass(hotelClass)"
      >
        {{ hotelClass === "all" ? $t("Search.hotelClass.all") : hotelClass }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

const emit = defineEmits(["update:modelValue"]);

const classes = ["all", "1", "2", "3", "4", "5"];

const { modelValue } = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const selectedClass = ref(modelValue);

const addOrRemoveClass = (hotelClass: string) => {
  if (selectedClass.value === hotelClass || hotelClass === "all") {
    selectedClass.value = "";
  } else {
    selectedClass.value = hotelClass;
  }
};

watchEffect(() => {
  emit("update:modelValue", selectedClass.value);
});
</script>

<style scoped></style>
