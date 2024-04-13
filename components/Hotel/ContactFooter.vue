<template>
  <div
    class="fixed bottom-0 flex w-full items-center justify-between border-t-2 border-primary-100/40 bg-light px-7 py-3 sm:container sm:static"
  >
    <div v-if="startPrice" class="flex flex-col justify-start">
      <p class="font-patuaOne text-xl text-primary-200">
        {{ $t("ContactFooter.from") }}: <span>{{ startPrice }}</span
        >$
      </p>
      <p class="font-robotoRegular text-base text-primary-200/50">
        {{ $t("ContactFooter.to") }}: <span>{{ endPrice }}$</span>
      </p>
    </div>
    <div v-else>
      <p>{{ $t("ContactFooter.priceNotAvailable") }}</p>
    </div>
    <div>
      <Button
        class="rounded-xl bg-primary px-4 py-2 text-xl text-light"
        @click="formVisible = true"
      >
        {{ $t("ContactFooter.contactHotel") }}
      </Button>
    </div>
  </div>
  <ContactForm v-model:visible="formVisible" />
</template>

<script setup lang="ts">
defineProps({
  startPrice: String,
  endPrice: String,
});

const formVisible = ref(false);
</script>
