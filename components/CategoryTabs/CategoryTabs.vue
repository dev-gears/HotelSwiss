<template>
  <div class="">
    <TabView :scrollable="true" @update:activeIndex="onTabChange">
      <TabPanel v-for="(tab, index) in categories" :key="index">
        <template #header>
          <div class="whitespace-nowrap">
            {{ tab.name }}
          </div>
        </template>
        <CategoryTabsTabContent
          :id="tab.id"
          :name="tab.name"
          :categorizedHotels="categorizedHotels"
          :isLoading="isLoading"
        />
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useHotelService } from "@/services/useHotelService";
import { useFetchData } from "@/composables/useFetchData";

const {
  fetchCategories,
  categories,
  fetchHotelsByCategory,
  categorizedHotels,
} = useHotelService();
const selectedTabIndex = ref(0);

const { isLoading } = useFetchData(fetchCategories, categories);

const onTabChange = async (newIndex: number) => {
  selectedTabIndex.value = newIndex;
  useFetchData(
    async () =>
      await fetchHotelsByCategory(categories.value[newIndex].id.toString()),
    categorizedHotels,
    false,
  );
};
</script>

<style>
.p-tabview-nav-btn {
  @apply shadow-none max-md:hidden;
}

.p-tabview-ink-bar {
  @apply bg-primary;
}

.p-highlight {
  @apply bg-indigo-100;
}

.p-tabview-nav-container {
  @apply sticky top-0 drop-shadow-sm;
}

.p-tabview-nav-next {
  background: linear-gradient(90deg, transparent 0%, #ffffff 30%, #ffffff 100%);
}

.p-tabview-nav-prev {
  background: linear-gradient(90deg, #ffffff 0%, #ffffff 70%, transparent 100%);
}

.p-tabview-panels {
  @apply bg-backgroundColor;
}

ul[role="tablist"] {
  @apply flex gap-4 bg-backgroundColor;

  li,
  a {
    @apply rounded-full bg-primary text-secondary-500;
  }
}
</style>
