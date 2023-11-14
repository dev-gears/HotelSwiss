<template>
  <div class="max-md:px-6">
    <TabView :scrollable="true" @update:activeIndex="onTabChange">
      <TabPanel>
        <template #header>
          <div class="whitespace-nowrap">All hotels</div>
        </template>
        <CategoryTabsTabContent
          :id="0"
          :name="`All hotels`"
          :categorizedHotels="firstTabContent"
          :isLoading="false"
        />
      </TabPanel>
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
import { Category } from "types/hotel";

const { categories, firstTabContent } = defineProps({
  categories: {
    type: Array<Category>,
    required: true,
  },
  firstTabContent: {
    type: Array,
    required: true,
  },
});

let isLoading = ref(false);

const { fetchHotelsByCategory, categorizedHotels } = useHotelService();
const selectedTabIndex = ref(0 as any);

const onTabChange = async (newIndex: number) => {
  selectedTabIndex.value = newIndex;
  if (newIndex !== 0) {
    isLoading.value = true;
    try {
      const data = await fetchHotelsByCategory(
        categories[newIndex - 1].id.toString(),
      );
      categorizedHotels.value = data;
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<style>
.p-tabview-nav-btn {
  @apply shadow-none max-md:hidden;
}

.p-tabview-ink-bar {
  @apply hidden;
}

.p-highlight a {
  @apply bg-indigo-100;
}

.p-tabview-nav-container {
  @apply sticky top-0 drop-shadow-sm;
}

.p-tabview-nav {
  @apply bg-transparent;
}

.p-tabview-nav-next {
  background: linear-gradient(90deg, transparent 0%, #f2f2f2 30%, #f2f2f2 100%);
}

.p-tabview-nav-prev {
  background: linear-gradient(90deg, #f2f2f2 0%, #f2f2f2 70%, transparent 100%);
}

.p-tabview-panels {
  @apply bg-backgroundColor;
}

ul[role="tablist"] {
  @apply flex gap-4 bg-backgroundColor;

  li,
  a {
    @apply rounded-xl bg-primary text-secondary-500;
  }
}
</style>
