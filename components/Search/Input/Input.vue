<template>
  <div @submit.prevent="handleSubmit" class="p-inputgroup p-input-icon-right">
    <InputText
      :id="id"
      :placeholder="$t('Search.searchForSpecificHotel')"
      v-model="localSearchText"
      @keyup.enter="handleSubmit"
      :class="customClassInput"
    />
    <i
      @click="handleSubmit"
      class="pi pi-search right-0 top-2 !flex h-12 w-12 cursor-pointer items-center justify-center text-xl"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

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

const emit = defineEmits(["handleSubmit"]);
const localSearchText = ref("");
const router = useRouter();

const handleSubmit = async () => {
  await router.push({
    path: "/search",
    query: { value: localSearchText.value, filters: [""] },
  });
  emit("handleSubmit");
};
</script>
