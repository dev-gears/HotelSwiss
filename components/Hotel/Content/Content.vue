<template>
  <div
    class="flex flex-col gap-3 rounded-2xl bg-primary text-light dark:bg-dark-100 max-md:px-5 max-md:py-6 md:bg-light-100 md:text-dark dark:md:text-light"
  >
    <h1 class="container mx-auto block font-patuaOne text-2xl md:hidden">
      {{ hotel?.title }}
    </h1>
    <div class="p-3">
      <p v-if="displayDescription !== 'nan'" class="font-robotoRegular text-sm">
        {{ displayDescription }}
      </p>
      <Button
        v-if="isLongDescription && !showFullDescription"
        class="mt-3 font-robotoRegular text-sm font-semibold underline hover:text-primary-200"
        @click="toggleFullDescription"
        :label="$t('Content.readMore')"
      />
    </div>
    <Card>
      <template #content>
        <div
          class="relative flex w-full items-center justify-center rounded-[10px] border border-light px-3 py-4 md:border-dark/10 dark:md:border-light/10"
        >
          <NuxtLink
            :to="{
              path: `/canton/${hotel?.canton?.id}`,
              query: { title: hotel?.canton?.name },
            }"
            class="relative flex h-14 w-1/3 cursor-pointer items-center justify-center border-r border-dark/20 dark:border-light/10"
          >
            <img
              class="absolute inset-0 h-full w-full p-2 dark:brightness-75 md:brightness-50"
              :src="backendUrl + hotel?.canton?.image?.url"
              alt="canton image"
            />
            <p
              class="font-robotoRegular text-lg text-light md:text-dark dark:md:text-light"
            >
              {{ hotel?.canton.name }}
            </p>
          </NuxtLink>

          <div
            class="flex h-full w-1/3 cursor-pointer flex-col items-center justify-center px-2 font-patuaOne text-xl"
          >
            <p class="text-light md:text-dark dark:md:text-light">
              {{ $t("Content.class") }}
            </p>
            <CommonStars
              class="[&_img]:invert md:[&_img]:invert dark:md:[&_img]:invert-0"
              :stars="hotel?.stars"
            />
          </div>

          <NuxtLink
            :to="{
              path: `/category/${hotel?.categories[0]?.category?.id}`,
              query: { title: hotel?.categories[0]?.category?.name },
            }"
            class="flex h-14 w-1/3 cursor-pointer items-center justify-center border-l border-dark/20 text-center font-robotoRegular text-lg font-normal text-light dark:border-light/10 md:text-dark dark:md:text-light"
            v-if="hotel?.categories[0]"
          >
            {{ hotel?.categories[0]?.category?.name }}
          </NuxtLink>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Hotel } from "@/types/hotel";
import { useLocalizedDescription } from "@/composables/useLocalizedDescription";

const runtimeConfig = useRuntimeConfig();
const NUMBER_OF_CHARACTERS = 500;
const props = defineProps<{
  hotel: Hotel;
}>();

const backendUrl = runtimeConfig.public.backendUrl;
const showFullDescription = ref(false);

// Get localized description
const { getHotelDescription } = useLocalizedDescription();
const localizedDescription = getHotelDescription(props.hotel);

/**
 * Toggle full description
 */
const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
};

/**
 * Display description
 * If the description is longer than 500 characters, show only the first 500 characters
 * @returns {string} Description
 */
const displayDescription = computed(() => {
  const description = localizedDescription.value;
  return showFullDescription.value || description.length <= NUMBER_OF_CHARACTERS
    ? description
    : `${description.substring(0, NUMBER_OF_CHARACTERS)}...`;
});

/**
 * Check if the description is longer than a set number of characters
 * @returns {boolean} Is long description
 */
const isLongDescription = computed(
  () => localizedDescription.value.length > NUMBER_OF_CHARACTERS,
);
</script>
