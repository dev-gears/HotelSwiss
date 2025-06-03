<template>
  <div ref="tabWrapper" class="bg-light-100 dark:bg-dark-100">
    <Tabs
      scrollable
      :value="0"
      @update:value="onTabChange"
      :pt="{
        root: 'container mx-auto !bg-light-100 dark:!bg-dark-100 !border-none',
        tabList: '',
      }"
    >
      <TabList
        :pt="{
          root: 'container mx-auto !border-none !sticky !top-0 z-10 pr-3',
          tabList:
            '!border-none flex gap-3 py-2 px-3 !bg-light-100 dark:!bg-dark-100',
          content: '!bg-light-100 dark:!bg-dark-100',
          activeBar: '!bg-primary dark:!bg-primary',
          prevButton:
            '!bg-previous-gradient dark:!bg-dark-previous-gradient !border-none rounded-l-md overflow-hidden shadow-none text-primary-200 dark:text-light',
          nextButton:
            '!bg-next-gradient dark:!bg-dark-next-gradient !border-none rounded-r-md overflow-hidden shadow-none text-primary-200 dark:text-light',
        }"
      >
        <Tab
          :key="0"
          :pt="{
            root: '!border-none !rounded-xl !px-4 !py-2 shadow-cardImage !bg-light dark:!bg-dark-400 text-primary-200 dark:text-light',
          }"
          :value="0"
        >
          <div class="whitespace-nowrap">
            {{ $t("CategoryTabs.allHotels") }}
          </div>
        </Tab>
        <Tab
          v-for="(tab, index) in categories"
          :key="index + 1"
          :pt="{
            root: '!border-none !rounded-xl !px-4 !py-2 shadow-cardImage !bg-light dark:!bg-dark-400 text-primary-200 dark:text-light',
            activeBar: '!bg-primary dark:!bg-primary',
          }"
          :value="tab.id.toString()"
        >
          <div class="whitespace-nowrap">
            {{ tab.name }}
          </div>
        </Tab>
      </TabList>
      <TabPanels
        :pt="{
          root: '!bg-light-100 dark:!bg-dark-100',
        }"
      >
        <TabPanel :value="0">
          <div class="flex flex-col items-center bg-light-100 dark:bg-dark-100">
            <div class="container mx-auto max-md:px-3">
              <CommonBlockHeader
                :title="$t('CategoryTabs.allHotels')"
                link="category/all"
              />
              <CommonGridSection
                :hotels="hotels"
                :loading="loading"
                :loadingMore="loadingMore"
                :hasMore="hasMore"
                @sort="handleSort"
                @loadMore="handleLoadMore"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel
          v-for="(tab, index) in categories"
          :key="index"
          :value="tab.id.toString()"
        >
          <div class="flex flex-col items-center bg-light-100 dark:bg-dark-100">
            <div class="container mx-auto max-md:px-3">
              <CommonBlockHeader
                :title="tab.name"
                :link="`category/${tab.id}`"
              />
              <CommonGridSection
                :hotels="hotels"
                :loading="loading"
                :loadingMore="loadingMore"
                :hasMore="hasMore"
                @sort="handleSort"
                @loadMore="handleLoadMore"
              />
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Category } from "@/types/hotel";
import { useHotelList } from "~/composables/useHotelList";

const props = defineProps<{
  categories: Category[];
}>();

const activeTab = ref(0);
const tabWrapper = useTemplateRef("tabWrapper");

// Use the hotel list composable for consistent behavior
const hotelList = useHotelList({
  autoFetch: false, // We'll manually control fetching per tab
});

const {
  hotels,
  isLoading: loading,
  loadingMore,
  hasMore,
  fetchHotelList,
  loadMore,
  handleSort: baseHandleSort,
} = hotelList;

/**
 * Get the query parameters for the current tab
 */
const getQueryParams = (tabValue: number | string = activeTab.value) => {
  const tabIndex =
    typeof tabValue === "string" ? parseInt(tabValue, 10) : tabValue;
  return tabIndex === 0
    ? {}
    : { category_id: props.categories[tabIndex - 1].id };
};

/**
 * Fetch hotels for the current tab
 */
const fetchHotelsForTab = async (
  tabValue: number | string = activeTab.value,
  sortParams = {},
) => {
  const params = {
    ...getQueryParams(tabValue),
    ...sortParams,
  };

  await fetchHotelList(params);
};

/**
 * Handle tab change
 */
const onTabChange = async (value: string | number): Promise<void> => {
  const newIndex = typeof value === "string" ? parseInt(value, 10) : value;
  scrollToTabs();
  activeTab.value = newIndex;
  await fetchHotelsForTab(newIndex);
};

/**
 * Handle sort event
 */
const handleSort = async ({ key, value }: { key: string; value: string }) => {
  await fetchHotelsForTab(activeTab.value, { [key]: value });
};

/**
 * Handle load more event - delegate to composable
 */
const handleLoadMore = async () => {
  await loadMore();
};

const scrollToTabs = () => {
  tabWrapper?.value?.scrollIntoView({ behavior: "smooth", block: "start" });
};

onMounted(() => {
  fetchHotelsForTab();
});
</script>

<style lang="pcss">
.p-tab-active {
  @apply !bg-primary !text-light !transition-all !duration-500 dark:!bg-primary;
}
</style>
