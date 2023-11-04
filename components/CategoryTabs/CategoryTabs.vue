<template>
  <div class="">
    <TabView :scrollable="true">
      <TabPanel v-for="tab in categories" :key="tab.id" :header="tab.name">
        <CategoryTabsTabContent :id="tab.id" :name="tab.name" />
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { useHotelService } from "@/services/useHotelService";
import { useFetchData } from "@/composables/useFetchData";

const { fetchCategories, categories } = useHotelService();

useFetchData(fetchCategories, categories);
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
</style>
