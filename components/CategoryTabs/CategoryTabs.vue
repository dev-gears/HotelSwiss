<template>
  <div>
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
          :category="`all`"
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
          :category="tab.id.toString()"
        />
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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
let categorizedHotels = ref([]);

const onTabChange = async (newIndex: number) => {
  if (newIndex !== 0) {
    const { data: hotels, pending } = useHotelApiData(
      `/hotels?category_id=${categories[newIndex - 1].id.toString()}`,
    );
    categorizedHotels = hotels;
    isLoading = pending;
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

.p-tabview-nav-container {
  @apply sticky top-0;
}

.p-tabview-nav {
  @apply !bg-transparent px-4;
}

.p-tabview-nav-next {
  background: linear-gradient(90deg, transparent 0%, #f2f2f2 30%, #f2f2f2 100%);
  @apply shadow-none;
}

.p-tabview-nav-prev {
  background: linear-gradient(90deg, #f2f2f2 0%, #f2f2f2 70%, transparent 100%);
  @apply shadow-none;
}

.p-tabview-panels {
  @apply bg-backgroundColor px-4;
}

ul[role="tablist"] {
  @apply flex gap-3 bg-backgroundColor;

  li,
  a {
    @apply rounded-[10px] bg-primary text-secondary-500;
  }

  a {
    @apply h-full;
  }

  .p-highlight,
  .p-highlight a {
    @apply bg-tertiary;
  }
}
</style>
