<template>
  <div
    class="fixed bottom-0 z-[1001] w-full border-t-2 border-primary-100/40 bg-light sm:static md:mt-3 md:hidden"
  >
    <div class="container mx-auto flex items-center justify-between px-7 py-3">
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
          :pt="{
            root: '!rounded-xl !bg-primary !px-4 !py-2 !text-xl !text-light',
          }"
          @click="formVisible = true"
          :label="$t('ContactFooter.contactHotel')"
        />
      </div>
    </div>
  </div>
  <FormDialog v-model:visible="formVisible" />
</template>

<script setup lang="ts">
import FormDialog from "../ContactForm/FormDialog.vue";

defineProps({
  startPrice: String,
  endPrice: String,
});

const formVisible = ref(false);
</script>
