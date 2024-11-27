<template>
  <div class="border-b border-primary/30 px-3 pb-5">
    <InputGroup
      :pt="{
        root: '!h-12 w-full container mx-auto w-full !rounded-xl border border-primary/30 bg-light-100 text-primary-200 shadow-sm',
      }"
    >
      <InputText
        :id="id"
        v-ripple
        :class="customClassInput"
        :placeholder="$t('Search.searchForSpecificHotel')"
        v-model="localSearchText"
        :pt="{
          root: 'w-full !rounded-xl bg-light-100 px-2 text-primary-200',
        }"
        @input="onInput"
        @keyup.enter="handleSubmit"
      />
      <Button
        v-ripple
        @click="handleSubmit"
        icon="pi pi-search"
        severity="warn"
        :pt="{
          root: 'h-12 items-center justify-center !px-4',
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
