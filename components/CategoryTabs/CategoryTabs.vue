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
          v-for="(tab, index) in mockCategories"
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
          <CategoryTabsTabContent
            :id="0"
            :name="$t('CategoryTabs.allHotels')"
            :categorizedHotels="firstTabContent"
            :nextUrl="nextUrl"
            :initialRequestUrl="`/hotels`"
            :isLoading="isLoading"
            :category="`all`"
            :activeTab="activeTab === 0"
          />
        </TabPanel>
        <TabPanel
          v-for="(tab, index) in categories"
          :key="index"
          :value="tab.id.toString()"
        >
          <CategoryTabsTabContent
            :id="tab.id"
            :name="tab.name"
            :categorizedHotels="categorizedHotels"
            :nextUrl="nextUrl"
            :initialRequestUrl="requestUrlForTab"
            :isLoading="isLoading"
            :category="tab.id.toString()"
            :activeTab="activeTab === index"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Category } from "@/types/hotel";

const mockCategories: Category[] = [
  {
    id: 1,
    name: "Category 1",
  },
  {
    id: 2,
    name: "Category 2",
  },
  {
    id: 3,
    name: "Category 3",
  },
  {
    id: 4,
    name: "Category 4",
  },
  {
    id: 5,
    name: "Category 5",
  },
  {
    id: 6,
    name: "Category 6",
  },
  {
    id: 7,
    name: "Category 7",
  },
  {
    id: 8,
    name: "Category 8",
  },
  {
    id: 9,
    name: "Category 9",
  },
  {
    id: 10,
    name: "Category 10",
  },
  {
    id: 11,
    name: "Category 11",
  },
  {
    id: 12,
    name: "Category 12",
  },
  {
    id: 13,
    name: "Category 13",
  },
  {
    id: 14,
    name: "Category 14",
  },
  {
    id: 15,
    name: "Category 15",
  },
  {
    id: 16,
    name: "Category 16",
  },
  {
    id: 17,
    name: "Category 17",
  },
  {
    id: 18,
    name: "Category 18",
  },
  {
    id: 19,
    name: "Category 19",
  },
  {
    id: 20,
    name: "Category 20",
  },
  {
    id: 21,
    name: "Category 21",
  },
  {
    id: 22,
    name: "Category 22",
  },
  {
    id: 23,
    name: "Category 23",
  },
  {
    id: 24,
    name: "Category 24",
  },
  {
    id: 25,
    name: "Category 25",
  },
  {
    id: 26,
    name: "Category 26",
  },
  {
    id: 27,
    name: "Category 27",
  },
  {
    id: 28,
    name: "Category 28",
  },
  {
    id: 29,
    name: "Category 29",
  },
  {
    id: 30,
    name: "Category 30",
  },
  {
    id: 31,
    name: "Category 31",
  },
  {
    id: 32,
    name: "Category 32",
  },
  {
    id: 33,
    name: "Category 33",
  },
  {
    id: 34,
    name: "Category 34",
  },
  {
    id: 35,
    name: "Category 35",
  },
  {
    id: 36,
    name: "Category 36",
  },
  {
    id: 37,
    name: "Category 37",
  },
  {
    id: 38,
    name: "Category 38",
  },
];

const { categories } = defineProps({
  categories: {
    type: Array<Category>,
    required: true,
  },
});

const firstTabContent = ref([]);
const isLoading = ref(true);
const categorizedHotels = ref([]);
const nextUrl = ref("");
const activeTab = ref(0);
const tabWrapper = useTemplateRef("tabWrapper");
const requestUrlForTab = ref("");

/**
 * On tab change, fetch hotels based on the category
 * @param {string | number} value - New tab value
 * @returns {Promise<void>}
 */
const onTabChange = async (value: string | number): Promise<void> => {
  const newIndex = typeof value === "string" ? parseInt(value, 10) : value;
  scrollToTabs();
  if (newIndex !== 0) {
    try {
      const requestUrl = `/hotels?category_id=${categories[newIndex - 1].id.toString()}`;
      requestUrlForTab.value = requestUrl;
      isLoading.value = true;
      const response = (await $hotelApi(requestUrl)) as any;
      categorizedHotels.value = response.results;
      nextUrl.value = response.next;
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  activeTab.value = newIndex;
};

const scrollToTabs = () => {
  tabWrapper?.value?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/**
 * Fetch hotels for the first tab
 * @returns {Promise<void>}
 */
const getFirstTabContent = async (): Promise<void> => {
  try {
    isLoading.value = true;
    const response = (await $hotelApi("/hotels")) as any;
    firstTabContent.value = response.results;
    nextUrl.value = response.next;
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

getFirstTabContent();
</script>

<style lang="pcss">
.p-tab-active {
  @apply !bg-primary !text-light !transition-all !duration-500 dark:!bg-primary-100;
}
</style>
