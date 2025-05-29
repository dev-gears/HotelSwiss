<template>
  <FilterSection>
    <div class="container mx-auto">
      <FilterHeader :title="$t('Search.amenities.title')">
        <template #counter>
          <SelectionCounter
            :count="selectedCount"
            :label="$t('Search.amenities.selected') || 'selected'"
          />
        </template>
      </FilterHeader>

      <div class="mt-4 grid grid-cols-2 gap-2">
        <label
          v-for="amenity in limitedAmenities"
          :key="amenity.id"
          :for="amenity.id.toString()"
          class="group relative cursor-pointer rounded-xl border border-transparent bg-light transition-all duration-200 hover:border-primary/20 hover:bg-light-100 hover:shadow-md dark:bg-dark-200 dark:hover:border-primary-200/30 dark:hover:bg-dark-300 dark:hover:shadow-primary-200/10"
          :class="{
            'border-primary/40 bg-primary/5 shadow-sm hover:!bg-primary dark:border-primary-200/50 dark:bg-primary':
              selectedAmenities[amenity.id],
          }"
        >
          <div class="flex items-center gap-3 p-3" v-ripple>
            <Checkbox
              binary
              :inputId="amenity.id.toString()"
              :modelValue="Boolean(selectedAmenities[amenity.id])"
              @update:modelValue="
                (value) => {
                  if (typeof value === 'boolean') {
                    selectedAmenities[amenity.id] = value;
                  }
                }
              "
              :pt="{
                icon: 'text-light',
              }"
            />
            <span
              class="flex-1 font-robotoRegular text-sm text-primary-200 transition-colors group-hover:text-primary dark:text-light dark:group-hover:text-light/90"
            >
              {{ amenity.name }}
            </span>
          </div>
        </label>
      </div>
      <FilterActions v-if="props.amenities.length > 8">
        <ViewAllButton
          @click="showAllAmenitiesModal = true"
          :label="$t('Search.amenities.viewAll') || 'View All Amenities'"
        />
      </FilterActions>
    </div>
  </FilterSection>

  <Dialog
    v-model:visible="showAllAmenitiesModal"
    :header="$t('Search.amenities.allAmenities') || 'All Amenities'"
    :modal="true"
    :dismissableMask="true"
    :closeOnEscape="true"
    class="w-full max-w-2xl"
    :pt="{
      root: 'bg-light dark:bg-dark-100 rounded-xl shadow-xl border border-primary/20 dark:border-primary-200/20',
      header:
        'bg-light dark:bg-dark-200 border-b border-primary/20 dark:border-primary-200/20 px-6 py-4 rounded-t-xl',
      headerTitle:
        'font-robotoRegular text-xl text-primary-200 dark:text-light',
      content: 'bg-light dark:bg-dark-100 px-6 py-4 max-h-96 overflow-y-auto',
      closeButton:
        'text-primary-200 dark:text-light hover:opacity-70 transition-opacity',
      mask: 'bg-primary/50 dark:bg-dark/70 backdrop-blur-sm',
      footer:
        'bg-light dark:bg-dark-200 px-6 py-4 border-t border-primary/20 dark:border-primary-200/20',
    }"
  >
    <div class="mb-4">
      <div class="relative">
        <InputText
          v-model="searchTerm"
          :placeholder="
            $t('Search.amenities.searchPlaceholder') || 'Search amenities...'
          "
          class="w-full pl-10 font-robotoRegular"
          :pt="{
            root: 'w-full px-4 py-3 pl-10 rounded-xl bg-light-100 dark:bg-dark-200 text-primary-200 dark:text-light placeholder:text-primary-200/70 dark:placeholder:text-light/70 focus:shadow-md dark:focus:shadow-primary-200/20 transition-all border border-primary/20 dark:border-primary-200/20 focus:border-primary dark:focus:border-primary-200 outline-0',
          }"
        />
        <i
          class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-primary-200/70 dark:text-light/70"
        ></i>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <label
        v-for="amenity in filteredAmenities"
        :key="amenity.id"
        :for="`modal-${amenity.id.toString()}`"
        class="group relative cursor-pointer rounded-xl border border-transparent bg-light transition-all duration-200 hover:border-primary/20 hover:bg-light-100 hover:shadow-md dark:bg-dark-200 dark:hover:border-primary-200/30 dark:hover:bg-dark-300 dark:hover:shadow-primary-200/10"
        :class="{
          'border-primary/40 bg-primary/5 shadow-sm dark:border-primary-200/50 dark:bg-primary':
            selectedAmenities[amenity.id],
        }"
      >
        <div class="flex items-center gap-3 p-3" v-ripple>
          <Checkbox
            v-ripple
            binary
            :inputId="`modal-${amenity.id.toString()}`"
            :modelValue="Boolean(selectedAmenities[amenity.id])"
            @update:modelValue="
              (value) => {
                if (typeof value === 'boolean') {
                  selectedAmenities[amenity.id] = value;
                }
              }
            "
            :pt="{
              icon: 'text-light',
            }"
          />
          <span
            class="flex-1 font-robotoRegular text-primary-200 transition-colors group-hover:text-primary dark:text-light dark:group-hover:text-light/90"
          >
            {{ amenity.name }}
          </span>
        </div>
      </label>
    </div>

    <div
      v-if="filteredAmenities.length === 0 && searchTerm"
      class="py-8 text-center"
    >
      <p class="font-robotoRegular text-primary-200/70 dark:text-light/70">
        {{
          $t("Search.amenities.noResults") ||
          "No amenities found matching your search."
        }}
      </p>
    </div>
    <template #footer>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 dark:bg-dark-200"
          >
            <span class="text-sm font-semibold text-primary dark:text-light">
              {{ selectedCount }}
            </span>
          </div>
          <span
            class="font-robotoRegular text-sm text-primary-200/70 dark:text-light/70"
          >
            {{ $t("Search.amenities.selected") || "selected" }}
          </span>
        </div>
        <div class="flex gap-2">
          <Button
            @click="clearAllSelections"
            variant="text"
            :label="$t('Common.clearAll') || 'Clear All'"
            class="rounded-lg p-3 text-primary-200 transition-all hover:bg-primary/5 hover:opacity-70 dark:text-light dark:hover:bg-primary-200/5"
          />
          <Button
            @click="showAllAmenitiesModal = false"
            variant="primary"
            :label="$t('Common.done') || 'Done'"
            class="rounded-lg bg-gradient-to-r from-primary to-primary-200 p-3 text-light shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
          />
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import type { Amenity } from "~/types/hotel";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import FilterSection from "./Common/FilterSection.vue";
import FilterHeader from "./Common/FilterHeader.vue";
import SelectionCounter from "./Common/SelectionCounter.vue";
import FilterActions from "./Common/FilterActions.vue";
import ViewAllButton from "./Common/ViewAllButton.vue";

const props = defineProps<{
  modelValue: number[];
  amenities: Amenity[];
}>();

const emit = defineEmits(["update:modelValue"]);

const selectedAmenities = ref<Record<number, boolean>>({});
const showAllAmenitiesModal = ref(false);
const searchTerm = ref("");

const limitedAmenities = computed(() => props.amenities.slice(0, 8));

const filteredAmenities = computed(() => {
  if (!searchTerm.value.trim()) {
    return props.amenities;
  }

  return props.amenities.filter((amenity) =>
    amenity.name.toLowerCase().includes(searchTerm.value.toLowerCase()),
  );
});

const selectedCount = computed(() => {
  return Object.values(selectedAmenities.value).filter(Boolean).length;
});

const clearAllSelections = () => {
  selectedAmenities.value = {};
};

watchEffect(() => {
  const selectedIds = Object.entries(selectedAmenities.value)
    .filter(([id, selected]) => selected)
    .map(([id]) => Number(id));
  emit("update:modelValue", selectedIds);
});

props.modelValue.forEach((id) => {
  if (!id) return;
  selectedAmenities.value[id] = true;
});
</script>
