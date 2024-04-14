<template>
  <div @submit.prevent="handleSubmit" class="p-inputgroup p-input-icon-right">
    <InputText
      :id="id"
      :placeholder="$t('Search.searchForSpecificHotel')"
      v-model="localSearchText"
      @input="onInput"
      @keyup.enter="handleSubmit"
      :class="customClassInput"
    />
    <i
      @click="handleSubmit"
      class="pi pi-search right-0 top-2 z-[2] !flex h-12 w-12 cursor-pointer items-center justify-center text-xl"
    ></i>
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

const onInput = (event: Event) => {
  emit("update:modelValue", (event?.target as HTMLInputElement)?.value);
};

const handleSubmit = async () => {
  filtersStore.setSearchValue(localSearchText.value);
  if (route.name !== "search") {
    await navigateTo({ path: "/search" });
  }
  emit("handleSubmit");
};
</script>
