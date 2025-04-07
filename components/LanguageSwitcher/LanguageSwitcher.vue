<template>
  <div class="relative z-10 inline-block text-left" ref="languageSwitcherRef">
    <button
      v-ripple
      ref="button"
      @click="toggleOverlayPanel"
      :style="buttonStyle"
      class="flex items-center justify-center rounded-[10px] rounded-bl-none rounded-br-none px-3 py-1"
    >
      <img :src="currentIcon" class="h-8 w-9" :alt="currentLanguage" />
    </button>

    <Popover
      ref="overlayPanel"
      :dismissable="true"
      :showCloseIcon="false"
      :pt="{
        root: {
          class:
            '!mt-[2px] !w-[330px] !rounded-[10px] !rounded-tr-none !bg-primary-100 !text-light !p-3',
        },
        content: {
          class: 'p-0',
        },
        header: {
          class: 'hidden',
        },
      }"
      @hide="onOverlayHide"
      class="mt-[2px] w-[330px] rounded-[10px] rounded-tr-none bg-primary-100 text-light"
    >
      <div class="m-0 list-none p-0 font-robotoRegular">
        <h2 class="bottom-border-item mb-2 border-b px-2 py-2 text-xl">
          {{ t("LanguageButton.selectLanguage") }}
        </h2>
        <button
          v-ripple
          v-for="(name, code) in languageNames"
          :key="code"
          @click="() => changeLanguage(code)"
          :class="[
            'flex w-full cursor-pointer items-center justify-between rounded-[10px] px-2 py-1 text-lg hover:bg-opacity-90',
            currentLanguage === code ? 'bg-primary-200' : '',
          ]"
        >
          {{ name }}
          <img :src="icons[code]" class="ml-2 h-9 w-9" :alt="name" />
        </button>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import OverlayPanel from "primevue/overlaypanel";
import { useLanguageStore } from "@/store/language";

import engIcon from "@/assets/images/language/eng.svg";
import gerIcon from "@/assets/images/language/ger.svg";
import itaIcon from "@/assets/images/language/ita.svg";
import freIcon from "@/assets/images/language/fre.svg";

type LanguageCode = "en" | "de" | "it" | "fr";

const { t, locale } = useI18n();
const languageStore = useLanguageStore();
const overlayPanel = ref<InstanceType<typeof OverlayPanel> | null>(null);
const languageSwitcherRef = ref<HTMLElement | null>(null);
const isOverlayPanelOpen = ref(false);

const languageNames: Record<LanguageCode, string> = {
  de: "Deutsch",
  en: "English",
  it: "Italiano",
  fr: "Français",
};

const icons: Record<LanguageCode, string> = {
  en: engIcon,
  de: gerIcon,
  it: itaIcon,
  fr: freIcon,
};

const currentLanguage = computed(() => locale.value as LanguageCode);
const currentIcon = computed(() => icons[currentLanguage.value]);

/**
 * Toggle the overlay panel visibility
 */
const toggleOverlayPanel = (event: MouseEvent) => {
  isOverlayPanelOpen.value = !isOverlayPanelOpen.value;
  overlayPanel.value?.toggle(event);
  if (languageSwitcherRef.value) {
    observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });
    observer.observe(languageSwitcherRef.value);
  }
};

/**
 * Change the language and save it to the store
 */
const changeLanguage = (code: LanguageCode) => {
  locale.value = code;
  languageStore.setLanguage(code);
  isOverlayPanelOpen.value = false;
  overlayPanel.value?.hide();
};

let observer: IntersectionObserver | null = null;

/**
 * Hide the overlay panel when it is closed
 * and stop observing the language switcher element
 */
const onOverlayHide = () => {
  isOverlayPanelOpen.value = false;
  if (observer && languageSwitcherRef.value) {
    observer.unobserve(languageSwitcherRef.value);
  }
};

/**
 * Handle the intersection observer callback
 * to close the overlay panel when the user scrolls
 */
const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      isOverlayPanelOpen.value = false;
      overlayPanel.value?.hide();
    }
  });
};

/**
 * Stop observing the language switcher element
 * when the component is unmounted
 */
onUnmounted(() => {
  if (observer && languageSwitcherRef.value) {
    observer.unobserve(languageSwitcherRef.value);
  }
});

/**
 * Style the button based on the overlay panel visibility
 */
const buttonStyle = computed(() => ({
  backgroundColor: isOverlayPanelOpen.value ? "#26393B" : "#354F52",
}));
</script>

<style>
.p-overlaypanel-content {
  padding: 1rem;
}

.bottom-border-item {
  border-color: rgba(255, 255, 255, 0.5);
}
</style>
