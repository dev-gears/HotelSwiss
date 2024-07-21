<template>
  <div>
    <TabView
      :scrollable="true"
      @update:activeIndex="onTabChange"
      :pt="{
        navContainer: 'border-b-2 border-primary-100/40',
      }"
    >
      <TabPanel>
        <template #header>
          <div class="whitespace-nowrap">
            {{ $t("CategoryTabs.allHotels") }}
          </div>
        </template>
        <CategoryTabsTabContent
          :id="0"
          :name="$t('CategoryTabs.allHotels')"
          :categorizedHotels="firstTabContent"
          :nextUrl="nextUrl"
          :isLoading="isLoading"
          :category="`all`"
          :activeTab="activeTab === 0"
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
          :nextUrl="nextUrl"
          :isLoading="isLoading"
          :category="tab.id.toString()"
          :activeTab="activeTab === index"
        />
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Category } from "@/types/hotel";

const { categories } = defineProps({
  categories: {
    type: Array<Category>,
    required: true,
  },
});

const firstTabContent = ref([]);
const isLoading = ref(true);
const categorizedHotels = ref([]);
const nextUrl = ref(null);
const activeTab = ref(0);

/**
 * On tab change, fetch hotels based on the category i
 * @param {number} newIndex - New tab index
 * @returns {Promise<void>}
 */
const onTabChange = async (newIndex: number): Promise<void> => {
  if (newIndex !== 0) {
    try {
      isLoading.value = true;
      const { data: hotels } = await useHotelApiData(
        `/hotels?category_id=${categories[newIndex - 1].id.toString()}`,
      );
      categorizedHotels.value = hotels.value.results;
      nextUrl.value = hotels.value.next;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
  activeTab.value = newIndex;
};

/**
 * Fetch hotels for the first tab
 * @returns {Promise<void>}
 */
const getFirstTabContent = async (): Promise<void> => {
  try {
    const { data: hotels, pending } = await useHotelApiData("/hotels");
    firstTabContent.value = hotels.value.results;
    nextUrl.value = hotels.value.next;
    isLoading.value = pending.value;
  } catch (error) {
    console.log(error);
  }
};

getFirstTabContent();
</script>

<style lang="pcss">
.p-tabview-nav-btn {
  @apply shadow-none max-md:hidden;
}

.p-tabview-ink-bar {
  @apply hidden;
}

.p-tabview-nav-container {
  @apply sticky top-0 z-50 border-b border-light-100 !bg-light-100;
}

.p-tabview-nav-content {
  @apply py-3;
}

.p-tabview-nav {
  @apply container mx-auto px-3;
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
  @apply bg-light-100 px-0;
}

ul[role="tablist"] {
  @apply flex gap-3 bg-light-100;

  li {
    @apply rounded-[10px] font-robotoRegular;
  }

  a {
    @apply rounded-[10px]  bg-primary text-light shadow-cardImage;
  }

  a[aria-selected="true"] {
    @apply bg-light text-primary;
  }

  a {
    @apply h-full;
  }
}
</style>
