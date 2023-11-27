<template>
  <div>
    <TabView :scrollable="true" @update:activeIndex="onTabChange">
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

<style lang="pcss">
.p-tabview-nav-btn {
  @apply shadow-none max-md:hidden;
}

.p-tabview-ink-bar {
  @apply hidden;
}

.p-tabview-nav-container {
  @apply border-light-100 !bg-light-100 sticky top-0 z-50 border-b;
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
  @apply bg-light-100 flex gap-3;

  li {
    @apply rounded-[10px] font-robotoRegular;
  }

  a {
    @apply text-light  rounded-[10px] bg-primary shadow-cardImage;
  }

  a[aria-selected="true"] {
    @apply bg-light text-primary;
  }

  a {
    @apply h-full;
  }
}
</style>
