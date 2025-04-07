<template>
  <div class="mb-3 flex w-full items-center justify-between">
    <h2 class="w-full font-patuaOne text-2xl text-primary-200 dark:text-light">
      {{ title }}
    </h2>
    <div v-if="link">
      <NuxtLink
        :to="{
          path: link,
          query: {
            title: title,
          },
        }"
        class="whitespace-nowrap font-robotoRegular text-sm text-primary-200 underline hover:text-primary hover:opacity-80 dark:text-light/80 dark:hover:text-light"
      >
        {{ t("BlockHeader.viewAll") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  title: String,
  link: [String],
});
</script>
