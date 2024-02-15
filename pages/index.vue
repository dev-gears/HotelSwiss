<template>
  <Head>
    <Title>HotelSwiss: Hotel promoting platform</Title>
    <Meta
      name="description"
      :content="`HotelSwiss: Promoting and connecting you with the best hotels Switzerland has to offer.`"
    />
    <Meta property="og:url" :content="`https://hotelswiss.ch`" />
    <Meta
      property="og:title"
      :content="`HotelSwiss: Hotel promoting platform`"
    />
    <Meta
      property="og:description"
      :content="`HotelSwiss: Promoting and connecting you with the best hotels Switzerland has to offer.`"
    />
    <Meta property="og:image" :content="``" />
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta
      name="twitter:title"
      :content="`HotelSwiss: Hotel promoting platform`"
    />
    <Meta
      name="twitter:description"
      :content="`HotelSwiss: Promoting and connecting you with the best hotels Switzerland has to offer.`"
    />
    <Meta name="twitter:image" :content="``" />
  </Head>

  <SkeletonLoadersLandingSkeleton v-if="isLoading" />
  <div v-else>
    <PromoBlock
      v-if="firstScreenData?.promo_hotels"
      :hotels="firstScreenData.promo_hotels"
    />
    <CategoryTabs
      v-if="firstScreenData?.categories"
      :categories="firstScreenData.categories"
    />
  </div>
</template>

<script setup lang="ts">
import { FirstScreen } from "types/hotel";

definePageMeta({
  layout: "base",
});

let firstScreenData = reactive({} as any);
const isLoading = ref(true);

onBeforeMount(async () => {
  const result = await useHotelApiData("/first-screen");
  firstScreenData = result.data;
  isLoading.value = false;
});

// const { data: firstScreenData, pending: isLoading } =
//   await useHotelApiData("/first-screen");
</script>
