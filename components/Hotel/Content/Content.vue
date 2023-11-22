<template>
  <div
    class="flex w-full flex-col gap-3 bg-primary p-7 text-secondary-800 lg:mt-5"
  >
    <h2 class="font-patuaOne text-2xl">
      {{ hotel?.title }}
    </h2>
    <p class="text-justify font-robotoRegular text-sm">
      {{ hotel?.description }}
    </p>

    <div
      class="relative flex w-full items-center justify-around rounded-[10px] border border-secondary px-3 py-4"
    >
      <div class="flex flex-1 items-center justify-center border-r">
        <p
          :style="`background-image: url(${backendUrl}${hotel?.canton?.image?.renditions?.thumbnail});`"
          class="bg-contain bg-center bg-no-repeat py-3"
        >
          {{ hotel?.canton.name }}
        </p>
      </div>
      <div
        class="flex flex-1 flex-col items-center justify-center font-patuaOne text-xl"
      >
        Class
        <CommonStars :stars="hotel?.stars" />
      </div>
      <div
        class="flex flex-1 items-center justify-center border-l py-3"
        v-if="hotel?.categories[0]"
      >
        {{ hotel?.categories[0]?.category?.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Hotel } from "@/types/hotel";
const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;
defineProps<{
  hotel: Hotel;
}>();
</script>
