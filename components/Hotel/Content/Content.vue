<template>
  <div
    class="container mx-auto flex w-full flex-col gap-3 bg-primary px-7 text-light"
  >
    <h2 class="mt-5 font-patuaOne text-2xl text-light">
      {{ hotel?.title }}
    </h2>
    <div>
      <p class="font-robotoRegular text-sm text-light">
        {{ shortDescription }}
        <span v-if="showFullDescription">{{ remainingDescription }}</span>
      </p>
      <Button
        v-if="!showFullDescription && isLongDescription"
        class="mt-3 font-robotoRegular text-sm font-semibold text-light underline"
        @click="showFullDescription = true"
        :label="$t('Content.readMore')"
      />
    </div>

    <div
      class="relative mb-5 flex w-full items-center justify-around rounded-[10px] border border-light px-3 py-4"
    >
      <!-- MORA DA SE LINKUJE KA STRANICI SA CANTONIMA -->
      <NuxtLink
        :to="``"
        class="flex h-14 w-1/3 items-center justify-center bg-contain bg-center bg-no-repeat"
        :style="`background-image: url(${backendUrl}${hotel?.canton?.image?.renditions?.thumbnail});`"
      >
        <p class="font-robotoRegular text-lg text-light">
          {{ hotel?.canton.name }}
        </p>
      </NuxtLink>

      <!-- TREBA DA SE VODI NA SEARCH PAGE SA ISKORISCENIM FILTEROM ZA KLASU HOTELA  -->
      <NuxtLink
        class="flex h-full w-1/3 flex-col items-center justify-center border-x px-2 font-patuaOne text-xl"
      >
        <p>
          {{ $t("Content.class") }}
        </p>
        <CommonStars :stars="hotel?.stars" />
      </NuxtLink>

      <NuxtLink
        :to="`/category/${hotel.categories[0]?.category?.id}`"
        class="h-full w-1/3 text-center font-robotoRegular text-lg font-normal text-light"
        v-if="hotel?.categories[0]"
      >
        {{ hotel?.categories[0]?.category?.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Hotel } from "@/types/hotel";
const runtimeConfig = useRuntimeConfig();
const backendUrl = runtimeConfig.public.backendUrl;
const props = defineProps<{
  hotel: Hotel;
}>();

const showFullDescription = ref(false);

const shortDescription = computed(() => {
  if (!showFullDescription.value && props.hotel.description.length > 200) {
    return props.hotel.description.substring(0, 200) + "...";
  } else {
    return props.hotel.description;
  }
});

const remainingDescription = computed(() => {
  if (props.hotel.description.length > 200) {
    return props.hotel.description.substring(200);
  } else {
    return "";
  }
});

const isLongDescription = computed(() => props.hotel.description.length > 200);
</script>
