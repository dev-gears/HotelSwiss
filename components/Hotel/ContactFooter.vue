<template>
  <div
    class="fixed bottom-0 w-full border-t-2 border-primary-100/40 bg-light sm:static"
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
          v-if="paid"
          class="rounded-xl bg-primary px-4 py-2 text-xl text-light"
          @click="formVisible = true"
          :label="$t('ContactFooter.contactHotel')"
        />
        <div v-else>
          <Toast
            :pt="{
              root: 'max-md:w-9/12',
              text: 'flex align-center',
              content: 'max-md:p-4 flex items-center',
              detail: 'max-md:m-0',
              icon: 'max-md:w-6 max-md:h-6',
            }"
          />
          <Button
            class="rounded-xl bg-primary/30 px-4 py-2 text-xl text-primary"
            :label="$t('ContactFooter.contactHotel')"
            @click="onShowToast"
          />
        </div>
      </div>
    </div>
  </div>
  <ContactForm v-model:visible="formVisible" />
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";

const toast = useToast();
const { t } = useI18n();

/**
 * Show toast message
 * @returns void
 */
const onShowToast = () => {
  toast.add({
    severity: "info",
    summary: t("ContactFooter.info"),
    life: 3000,
  });
};

defineProps({
  startPrice: String,
  endPrice: String,
  paid: Boolean,
});

const formVisible = ref(false);
</script>
