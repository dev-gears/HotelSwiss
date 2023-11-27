<template>
  <div class="text-light flex w-full flex-col gap-3 bg-primary p-7 lg:mt-5">
    <h2 class="font-patuaOne text-3xl">
      {{ hotel?.title }}
    </h2>
    <p class="font-robotoRegular text-base">
      {{ hotel?.description }}
    </p>

    <div
      class="border-light relative flex w-full items-center justify-around rounded-[10px] border px-3 py-4"
    >
      <div
        class="flex h-14 w-1/3 items-center justify-center bg-contain bg-center bg-no-repeat"
        :style="`background-image: url(${backendUrl}${hotel?.canton?.image?.renditions?.thumbnail});`"
      >
        <p>
          {{ hotel?.canton.name }}
        </p>
      </div>
      <div
        class="flex h-full w-1/3 flex-col items-center justify-center border-x px-2 font-patuaOne text-xl"
      >
        {{ $t("Content.class") }}
        <CommonStars :stars="hotel?.stars" />
      </div>
      <div class="w-1/3 px-2 text-center" v-if="hotel?.categories[0]">
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
