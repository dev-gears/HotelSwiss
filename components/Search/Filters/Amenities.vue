<template>
  <div
    class="flex flex-col gap-2 border-b border-primary/30 px-3 pb-6 dark:border-primary-200/20"
  >
    <div class="container mx-auto">
      <h3 class="font-robotoRegular text-xl text-primary-200 dark:text-light">
        {{ $t("Search.amenities.title") }}
      </h3>

      <div class="mt-4 grid gap-3">
        <div
          v-for="amenity in visibleAmenities"
          :key="amenity.id"
          class="group relative rounded-lg transition-all hover:bg-light-100 dark:hover:bg-dark-200"
        >
          <div class="flex items-center gap-3 p-2">
            <Checkbox
              binary
              :pt="{
                root: 'text-primary-200 dark:text-light w-6 h-6',
                input:
                  'w-full h-full border-2 border-primary/50 dark:border-primary-200/30 rounded-lg bg-light dark:bg-dark-100 shadow-sm dark:shadow-primary-200/20 hover:border-primary dark:hover:border-primary-200/50 transition-all',
                icon: 'bg-primary dark:bg-primary w-full h-full rounded-lg p-1.5 transition-colors',
              }"
              :inputId="amenity.id.toString()"
              v-model="selectedAmenities[amenity.id]"
            />
            <label
              class="flex-1 cursor-pointer font-robotoRegular text-primary-200 transition-colors group-hover:text-primary dark:text-light dark:group-hover:text-light/90"
              :for="amenity.id.toString()"
            >
              {{ amenity.name }}
            </label>
          </div>
        </div>
      </div>

      <div v-if="shouldShowLoadMoreButton" class="mt-4 flex justify-center">
        <Button
          @click="loadMore"
          severity="secondary"
          :pt="{
            root: 'bg-white dark:bg-dark-100 shadow-sm dark:shadow-primary-200/20 transition-all hover:shadow-md',
            label: 'text-primary-200 dark:text-light underline px-4 py-2',
          }"
          :label="$t('Common.viewAll')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watchEffect } from "vue";
import type { Amenity } from "@/types/hotel";
import { useLoadMore } from "@/composables/useLoadMore";

const props = defineProps<{
  modelValue: number[];
  amenities: Amenity[];
}>();

const emit = defineEmits(["update:modelValue"]);

const {
  loadMore,
  visibleItems: visibleAmenities,
  shouldShowLoadMoreButton,
} = useLoadMore(props.amenities, 5);

const selectedAmenities = ref<Record<number, boolean>>({});

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
