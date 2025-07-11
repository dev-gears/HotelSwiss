<template>
  <section id="categories" class="bg-light-100 py-16 dark:bg-dark-300">
    <div class="container mx-auto px-3">
      <!-- Section Header -->
      <div class="mb-12 text-center">
        <h2 class="font-patuaOne text-3xl font-bold text-dark dark:text-light">
          {{ $t("Discovery.categories.title") }}
        </h2>
        <p
          class="mt-4 font-robotoRegular text-lg text-gray-600 dark:text-gray-400"
        >
          {{ $t("Discovery.categories.subtitle") }}
        </p>
      </div>

      <!-- Search Input -->
      <div class="mb-8 flex justify-center">
        <div class="relative w-full max-w-md">
          <i
            class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="categorySearchQuery"
            type="text"
            :placeholder="$t('Discovery.categories.searchPlaceholder')"
            class="w-full rounded-lg border border-gray-200 bg-light py-3 pl-10 pr-4 font-robotoRegular text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-dark-100 dark:text-light dark:focus:border-primary"
          />
          <!-- Clear button -->
          <button
            v-if="categorySearchQuery"
            @click="categorySearchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-primary"
          >
            <i class="pi pi-times text-sm" />
          </button>
        </div>
      </div>
      <!-- Loading State -->
      <div
        v-if="pending"
        class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      >
        <div
          v-for="n in 16"
          :key="n"
          class="h-12 animate-pulse rounded-lg bg-light-200 dark:bg-dark-200"
        />
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="flex h-40 items-center justify-center text-danger"
      >
        <div class="text-center">
          <i class="pi pi-exclamation-triangle mb-2 text-2xl" />
          <p>{{ $t("Common.errorLoading") }}</p>
        </div>
      </div>
      <!-- Categories Grid -->
      <div v-else-if="displayedCategories?.length">
        <div
          class="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        >
          <button
            v-for="category in displayedCategories"
            :key="category.id"
            class="group relative flex items-center justify-center rounded-lg bg-light p-4 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-primary hover:text-light hover:shadow-md dark:bg-dark-100 dark:hover:bg-primary"
            @click="handleCategoryClick(category.id, 'category')"
          >
            <!-- Icon -->
            <div
              class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-all duration-200 group-hover:bg-light/20 dark:bg-primary/20"
            >
              <i
                class="pi pi-th-large text-sm text-primary transition-colors group-hover:text-light dark:text-light"
              />
            </div>

            <!-- Category Name -->
            <span
              class="flex-1 text-left font-robotoRegular text-sm font-medium text-dark transition-colors group-hover:text-light dark:text-light"
            >
              {{ category.name }}
            </span>

            <!-- Arrow Icon -->
            <i
              class="pi pi-chevron-right ml-2 text-xs text-primary/60 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-light group-hover:opacity-100 dark:text-light/60"
            />

            <!-- Subtle gradient overlay on hover -->
            <div
              class="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </button>
        </div>

        <!-- Show All Button -->
        <div
          v-if="shouldShowLoadMore && !categorySearchQuery.trim()"
          class="mt-8 flex justify-center"
        >
          <button
            @click="showAllCategories"
            class="flex items-center gap-2 rounded-lg border border-primary bg-transparent px-6 py-3 font-robotoRegular text-sm font-medium text-primary transition-all duration-200 hover:bg-primary hover:text-light dark:border-primary dark:text-primary dark:hover:bg-primary dark:hover:text-light"
          >
            <span>{{ $t("Common.viewAll") }}</span>
            <i class="pi pi-chevron-down text-xs" />
          </button>
        </div>
      </div>
      <!-- No Search Results -->
      <div
        v-else-if="categorySearchQuery && categories?.results?.length"
        class="flex h-40 items-center justify-center text-gray-600 dark:text-gray-400"
      >
        <div class="text-center">
          <i class="pi pi-search mb-2 text-2xl" />
          <p class="font-robotoRegular">
            {{
              $t("Discovery.categories.noSearchResults", {
                query: categorySearchQuery,
              })
            }}
          </p>
          <button
            @click="categorySearchQuery = ''"
            class="mt-2 text-sm text-primary hover:underline"
          >
            {{ $t("Common.clearSearch") }}
          </button>
        </div>
      </div>
      <!-- Empty State -->
      <div
        v-else
        class="flex h-40 items-center justify-center text-gray-600 dark:text-gray-400"
      >
        <div class="text-center">
          <i class="pi pi-th-large mb-2 text-2xl" />
          <p class="font-robotoRegular">
            {{ $t("Discovery.categories.noCategories") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCategories } from "~/composables/useApi";

// Fetch categories data using native caching
const { data: categories, pending, error } = await useCategories();

// Search functionality
const categorySearchQuery = ref("");

// Filtered categories based on search query
const filteredCategories = computed(() => {
  if (!categorySearchQuery.value.trim()) {
    return categories.value?.results || [];
  }

  const query = categorySearchQuery.value.toLowerCase().trim();
  return (
    categories.value?.results?.filter((category) =>
      category.name.toLowerCase().includes(query),
    ) || []
  );
});

// Use the existing useLoadMore composable for show more/less functionality
const loadMoreState = computed(() => useLoadMore(filteredCategories.value, 15));

// Extract reactive values from the composable
const displayedCategories = computed(
  () => loadMoreState.value.visibleItems.value,
);
const shouldShowLoadMore = computed(
  () => loadMoreState.value.shouldShowLoadMoreButton.value,
);
const showAllCategories = () => loadMoreState.value.loadMore();

/**
 * Handle category card click - navigate to category page
 */
const handleCategoryClick = (categoryId: number, type: string) => {
  // Find the category to get its name for the URL
  const category = categories.value?.results?.find(
    (cat) => cat.id === categoryId,
  );
  navigateTo(
    `/category/${categoryId}?title=${encodeURIComponent(category?.name || "")}`,
  );
};
</script>

<style scoped>
/* Smooth icon transitions */
.pi-chevron-right {
  transform: translateX(0);
}

/* Enhance the interactive feel */
button:active {
  transform: scale(0.98);
}

/* Gradient overlay animation */
button::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(53, 79, 82, 0.1),
    rgba(53, 79, 82, 0.2)
  );
  border-radius: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

button:hover::before {
  opacity: 1;
}

/* Subtle pulse animation */
@keyframes subtle-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}
</style>
