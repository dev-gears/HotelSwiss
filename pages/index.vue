<template>
  <Head>
    <Title>HotelSwiss: Hotel promoting platform</Title>
    <Meta
      name="description"
      :content="`HotelSwiss: Promoting and connecting you with the best hotels Switzerland has to offer.`"
    />
    <!-- Open Graph -->
    <Meta
      property="og:url"
      :content="`https://hotelswiss.ch`"
    />
    <Meta property="og:title" :content="`HotelSwiss: Hotel promoting platform`" />
    <Meta
      property="og:description"
      :content="`HotelSwiss: Promoting and connecting you with the best hotels Switzerland has to offer.`"
    />
    <Meta property="og:image" :content="``" />
    <!-- Twitter Card -->
    <Meta name="twitter:card" content="summary_large_image" />
    <Meta name="twitter:title" :content="`HotelSwiss: Hotel promoting platform`" />
    <Meta
      name="twitter:description"
      :content="`HotelSwiss: Promoting and connecting you with the best hotels Switzerland has to offer.`"
    />
    <Meta name="twitter:image" :content="``" />
  </Head>
  <div class="container mx-auto w-full">
    <PromoBlock class="promo-block" />
    <CategoryTabs />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "base",
});
</script>
