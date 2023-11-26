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

  <SkeletonLoadersLandingSkeleton v-if="pending" />
  <div v-else>
    <PromoBlock
      v-if="firstScreenData?.promo_hotels"
      class="promo-block"
      :hotels="firstScreenData.promo_hotels"
    />
    <CategoryTabs
      v-if="firstScreenData?.categories"
      :categories="firstScreenData.categories"
      :firstTabContent="firstScreenData.all_hotels"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "base",
});
const { data: firstScreenData, pending } =
  await useHotelApiData("/first-screen");
</script>

<style>
.container {
  @apply max-w-full px-0 md:max-w-screen-md md:px-3 lg:max-w-screen-lg lg:px-3 xl:max-w-screen-xl;
}
</style>
