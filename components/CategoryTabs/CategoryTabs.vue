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
          activeBar: '!bg-primary dark:!bg-primary-100',
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
            activeBar: '!bg-primary dark:!bg-primary-100',
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
                :loading="loading || !initialized"
                :loadingMore="loadingMore"
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
                :loading="loading || !initialized"
                :loadingMore="loadingMore"
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
import type { Category, Hotel, HotelListWithPagination } from "@/types/hotel";
import { fetchHotels } from "~/utils/api";

const props = defineProps<{
  categories: Category[];
}>();

const hotels = ref<Hotel[]>([]);
const loading = ref(true);
const loadingMore = ref(false);
const nextUrl = ref<string | null>(null);
const activeTab = ref(0);
const tabWrapper = useTemplateRef("tabWrapper");
const initialized = ref(false);

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
 * Fetch hotels with optional params
 */
const fetchHotelsForTab = async (
  tabValue: number | string = activeTab.value,
  sortParams = {},
  append = false,
) => {
  try {
    if (!append) {
      loading.value = true;
    } else {
      loadingMore.value = true;
    }

    const params = {
      ...getQueryParams(tabValue),
      ...sortParams,
    } as Record<string, string | number>;

    const data = await fetchHotels(params, {
      key: `category-tab-${tabValue}-${JSON.stringify(sortParams)}`,
      cache: true,
    });

    if (append) {
      hotels.value.push(...data.results);
    } else {
      hotels.value = data.results;
    }
    nextUrl.value = data.next;
  } catch (error) {
    console.error("Error fetching hotels:", error);
  } finally {
    loading.value = false;
    loadingMore.value = false;
    initialized.value = true;
  }
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
 * Handle load more event
 */
const handleLoadMore = async () => {
  if (!nextUrl.value || loadingMore.value) return;

  try {
    loadingMore.value = true;

    const data = (await $hotelApi(nextUrl.value)) as HotelListWithPagination;
    hotels.value = [...hotels.value, ...data.results];
    nextUrl.value = data.next;
  } catch (error) {
    console.error("Error loading more hotels:", error);
  } finally {
    loadingMore.value = false;
  }
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
  @apply !bg-primary !text-light !transition-all !duration-500 dark:!bg-primary-100;
}
</style>
