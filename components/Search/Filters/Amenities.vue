<template>
  <div class="flex flex-col gap-2">
    <h3 class="font-robotoRegular text-xl text-primary-200">Amenities</h3>
    <div v-for="amenity in visibleAmenities" :key="amenity.id">
      <div class="flex items-center gap-3">
        <Checkbox
          binary
          :pt="{
            root: 'text-primary-200 w-6 h-6',
            input: 'w-full h-full border border-primary/30 rounded-sm',
            icon: 'bg-primary w-full h-full rounded-sm p-1',
          }"
          :inputId="amenity.id.toString()"
          v-model="selectedAmenities[amenity.id]"
        />
        <label :for="amenity.id.toString()">{{ amenity.name }}</label>
      </div>
    </div>

    <Button
      v-if="shouldShowLoadMoreButton"
      @click="loadMore"
      class="bg-white p-2 text-primary-200 underline"
      :label="$t('Common.viewAll')"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watchEffect } from "vue";
import type { Amenity } from "@/types/hotel";
import { useLoadMore } from "@/composables/useLoadMore";

const props = defineProps({
  modelValue: Array,
  amenities: Array<Amenity>,
});

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

props?.modelValue?.forEach((id) => {
  if (!id) return;
  selectedAmenities.value[id] = true;
});
</script>
