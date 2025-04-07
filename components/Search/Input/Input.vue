<template>
  <div class="border-b border-primary/30 px-3 pb-5 dark:border-primary-200/20">
    <InputGroup
      :pt="{
        root: '!h-12 w-full container mx-auto w-full !rounded-xl border border-primary/30 dark:border-primary-200/20 bg-light dark:bg-dark-100 text-primary-200 dark:text-light shadow-md dark:shadow-primary-200/20 transition-colors',
      }"
    >
      <InputText
        :id="id"
        v-ripple
        :class="customClassInput"
        :placeholder="$t('Search.searchForSpecificHotel')"
        v-model="localSearchText"
        :pt="{
          root: 'w-full !pl-3 !rounded-xl bg-light dark:bg-dark-100 px-2 text-primary-200 dark:text-light hover:text-primary dark:hover:text-light/90 placeholder:text-primary-200/70 dark:placeholder:text-light/70 focus:shadow-md dark:focus:shadow-primary-200/20 transition-all',
        }"
        @input="onInput"
        @keyup.enter="handleSubmit"
      />
      <Button
        v-ripple
        @click="handleSubmit"
        icon="pi pi-search"
        :pt="{
          root: 'h-12 items-center justify-center !px-4 text-primary-200 dark:text-light hover:text-primary dark:hover:text-light/90 transition-colors',
          icon: 'text-lg transition-transform hover:scale-110',
        }"
      />
    </InputGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFiltersStore } from "@/store/filters";

defineProps({
  id: {
    type: String,
    default: "",
  },
  customClassInput: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["handleSubmit", "update:modelValue"]);
const localSearchText = ref("");
const route = useRoute();

const filtersStore = useFiltersStore();

onMounted(() => {
  localSearchText.value = filtersStore.searchValue;
});

/**
 * Update the search value
 * @param event
 */
const onInput = (event: Event) => {
  emit("update:modelValue", (event?.target as HTMLInputElement)?.value);
};

/**
 * Handle the form submission
 * @returns {Promise<void>}
 */
const handleSubmit = async (): Promise<void> => {
  filtersStore.setSearchValue(localSearchText.value);
  if (route.name !== "search") {
    await navigateTo({ path: "/search" });
  }
  emit("handleSubmit");
};
</script>
