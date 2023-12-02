<template>
  <div>
    <div class="container mx-auto">
      <CommonBlockHeader
        :title="`Search results for: ${route.query.value}`"
        class="mb-5 border-b border-primary py-3 font-robotoRegular"
      />
      <ClientOnly>
        <SkeletonLoadersSearchSkeleton v-if="isLoading" />
        <div>
          <CommonGridSection
            v-if="searchedHotels?.value.length"
            :hotels="searchedHotels.value"
          />
          <div v-else class="flex h-[50vh] items-center justify-center">
            <h1 class="text-2xl text-primary-100">No results found</h1>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { Hotel } from "types/hotel";

definePageMeta({
  layout: "base",
});

const route = useRoute();
const searchedHotels = reactive({ value: [] as Hotel[] });
const isLoading = ref(false);

/**
 * Fetches hotels from the API by search query params
 */
const handleSearch = async () => {
  if (!route.query.value) return;

  try {
    isLoading.value = true;
    searchedHotels.value = [];
    const data = await useHotelApiData(`/hotels?search=${route.query.value}`);
    searchedHotels.value = toRef(data.data.value);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

watch(() => route.query.value, handleSearch, { immediate: true });
</script>
