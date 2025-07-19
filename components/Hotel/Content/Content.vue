<template>
  <div
    class="flex flex-col gap-4 rounded-2xl bg-primary text-light shadow-lg dark:bg-dark-200 max-md:px-6 max-md:py-8 md:bg-light md:text-dark dark:md:bg-dark-200 dark:md:text-light"
  >
    <h1
      class="container mx-auto block font-patuaOne text-3xl font-bold md:hidden"
    >
      {{ hotel?.title }}
    </h1>
    <div class="px-4 py-2">
      <p
        v-if="displayDescription !== 'nan'"
        class="font-robotoRegular text-base leading-relaxed"
      >
        {{ displayDescription }}
      </p>
      <Button
        v-if="isLongDescription && !showFullDescription"
        class="mt-4 font-robotoRegular text-sm font-semibold underline transition-colors duration-200 hover:text-primary-200 dark:hover:text-primary-200"
        @click="toggleFullDescription"
        :label="$t('Content.readMore')"
      />
    </div>
    <Card class="overflow-hidden shadow-md">
      <template #content>
        <div
          class="relative flex w-full items-center justify-center rounded-xl border border-light/50 bg-white/50 px-4 py-5 backdrop-blur-sm dark:bg-dark-100/50 md:border-dark/10 dark:md:border-light/20"
        >
          <NuxtLink
            :to="{
              path: `/canton/${hotel?.canton?.id}`,
              query: { title: hotel?.canton?.name },
            }"
            class="relative flex h-16 w-1/3 cursor-pointer items-center justify-center border-r border-dark/20 transition-all duration-200 hover:bg-black/5 dark:border-light/20 dark:hover:bg-white/5"
          >
            <img
              class="absolute inset-0 h-full w-full object-contain p-3 dark:brightness-90 md:brightness-50 dark:md:brightness-75"
              :src="backendUrl + hotel?.canton?.image?.url"
              alt="canton image"
            />
            <p
              class="relative z-10 font-robotoRegular text-lg font-medium text-light drop-shadow-lg md:text-dark dark:md:text-light"
            >
              {{ hotel?.canton.name }}
            </p>
          </NuxtLink>

          <div
            class="flex h-16 w-1/3 cursor-pointer flex-col items-center justify-center px-3 font-patuaOne text-xl transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
          >
            <p
              class="mb-1 font-medium text-light md:text-dark dark:md:text-light"
            >
              {{ $t("Content.class") }}
            </p>
            <CommonStars
              class="scale-110 [&_img]:invert md:[&_img]:invert-0 dark:md:[&_img]:invert"
              :stars="hotel?.stars"
            />
          </div>

          <NuxtLink
            :to="{
              path: `/category/${hotel?.categories[0]?.category?.id}`,
              query: { title: hotel?.categories[0]?.category?.name },
            }"
            class="flex h-16 w-1/3 cursor-pointer items-center justify-center border-l border-dark/20 px-3 text-center font-robotoRegular text-lg font-medium text-light transition-all duration-200 hover:bg-black/5 dark:border-light/20 dark:hover:bg-white/5 md:text-dark dark:md:text-light"
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
