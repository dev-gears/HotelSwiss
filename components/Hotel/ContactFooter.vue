<template>
  <div
    class="bg-light container fixed bottom-0 flex w-full items-center justify-between border-t-2 border-primary-100/40 px-7 py-4"
  >
    <div v-if="startPrice" class="flex flex-col justify-start">
      <p class="font-patuaOne text-base text-primary-200">
        {{ $t("ContactFooter.from") }}: <span>{{ startPrice }}</span
        >$
      </p>
      <p class="font-patuaOne text-base text-primary-200">
        {{ $t("ContactFooter.to") }}: <span>{{ endPrice }}$</span>
      </p>
    </div>
    <div v-else>
      <p>{{ $t("ContactFooter.priceNotAvailable") }}</p>
    </div>
    <div>
      <Button class="text-light rounded-md bg-primary px-2 py-1 text-2xl">{{
        $t("ContactFooter.contactHotel")
      }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  startPrice: String,
  endPrice: String,
});
</script>
