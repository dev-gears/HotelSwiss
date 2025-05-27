<template>
  <div class="border-b border-primary/30 px-3 pb-5 dark:border-primary-200">
    <InputGroup
      :pt="{
        root: '!h-12 w-full container mx-auto w-full !rounded-xl border border-primary/30 dark:border-primary-200/20 bg-light dark:bg-dark-100 text-primary-200 dark:text-light shadow-md dark:shadow-primary-200/20 transition-colors',
      }"
    >
      <Input
        :id="id"
        :class="customClassInput"
        :placeholder="$t('Search.searchForSpecificHotel')"
        v-model="localSearchText"
        :pt="{
          root: 'w-full !pl-3 !rounded-xl bg-light dark:bg-dark-300 px-2 text-primary-200 dark:text-light hover:text-primary dark:hover:text-light/90 placeholder:text-primary-200/70 dark:placeholder:text-light/70 focus:shadow-md dark:focus:shadow-primary-200/20 transition-all',
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
          icon: 'text-lg',
        }"
      />
    </InputGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Input from "primevue/inputtext";
import InputGroup from "primevue/inputgroup";
import Button from "primevue/button";

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
const router = useRouter();

// Initialize from URL on mount
onMounted(() => {
  if (route.query.q) {
    localSearchText.value = route.query.q as string;
  }
});

/**
 * Update the search value
 * @param event
 */
const onInput = (event: Event) => {
  emit("update:modelValue", (event?.target as HTMLInputElement)?.value);
};

/**
 * Handle the form submission by navigating to the search page with query parameter
 * @returns {Promise<void>}
 */
const handleSubmit = async (): Promise<void> => {
  if (!localSearchText.value.trim()) return;

  // Preserve existing query parameters and update the search term
  const query = { ...route.query, q: localSearchText.value };

  if (route.name !== "search") {
    // Navigate to search page with query parameter
    await navigateTo({
      path: "/search",
      query,
    });
  } else {
    // Already on search page, just update the query
    await router.replace({
      query,
    });
  }

  emit("handleSubmit");
};
</script>
