<template>
  <div class="relative my-8 flex w-full items-center gap-2">
    <div @submit.prevent="handleSubmit" class="p-inputgroup p-input-icon-right">
      <InputText
        id="search-input"
        :placeholder="$t('Search.searchForSpecificHotel')"
        v-model="localSearchText"
        @keyup.enter="handleSubmit"
        class="h-12 w-full rounded-l-xl bg-light px-2 text-primary-200 shadow focus:shadow"
      />
      <i
        @click="handleSubmit"
        class="pi pi-search right-0 top-2 !flex h-12 w-12 cursor-pointer items-center justify-center text-xl"
      ></i>
    </div>
    <Button
      icon="pi pi-sliders-h"
      class="flex h-12 rounded-none rounded-br-xl bg-light px-6 shadow [&_span]:text-2xl [&_span]:!text-primary"
      @click="showFilters = true"
    />
  </div>
  <Dialog
    class="h-screen w-[90%]"
    v-model:visible="showFilters"
    modal
    closable
    dismissableMask
    blockScroll
    showHeader
  >
    <template #header>
      <h3 class="text-primary-200">{{ $t("Search.filters") }}</h3>
    </template>
    <template #default>
      <SearchFiltersCantons />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const localSearchText = ref("");
const showFilters = ref(false);
const router = useRouter();

const handleSubmit = async () => {
  await router.push({
    path: "/search",
    query: { value: localSearchText.value, filters: [""] },
  });
};
</script>
