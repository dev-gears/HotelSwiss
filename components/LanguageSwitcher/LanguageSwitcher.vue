<template>
  <div class="relative z-10 inline-block text-left" ref="languageSwitcherRef">
    <button
      ref="button"
      @click="toggleOverlayPanel"
      :style="buttonStyle"
      class="flex items-center justify-center rounded-[10px] rounded-bl-none rounded-br-none px-3 py-1"
    >
      <img :src="currentIcon" class="h-8 w-9" :alt="currentLanguage" />
    </button>

    <OverlayPanel
      ref="overlayPanel"
      :dismissable="true"
      :showCloseIcon="false"
      @hide="onOverlayHide"
      class="text-light mt-[2px] w-[330px] rounded-[10px] rounded-tr-none bg-primary-100"
    >
      <ul class="m-0 list-none p-0 font-robotoRegular">
        <li class="bottom-border-item mb-2 border-b px-2 py-2 text-xl">
          {{ $t("LanguageButton.selectLanguage") }}
        </li>
        <li
          v-for="(name, code) in languageNames"
          :key="code"
          @click="() => changeLanguage(code)"
          :class="[
            'flex cursor-pointer items-center justify-between rounded-[10px] px-2 py-1 text-lg hover:bg-opacity-90',
            currentLanguage === code ? 'bg-primary-200' : '',
          ]"
        >
          {{ name }}
          <img :src="icons[code]" class="ml-2 h-9 w-9" :alt="name" />
        </li>
      </ul>
    </OverlayPanel>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "@/store/language";
import OverlayPanel from "primevue/overlaypanel";

import engIcon from "@/assets/images/language/eng.svg";
import gerIcon from "@/assets/images/language/ger.svg";
import itaIcon from "@/assets/images/language/ita.svg";
import freIcon from "@/assets/images/language/fre.svg";

type LanguageCode = "en" | "de" | "it" | "fr";

const { locale } = useI18n();
const languageStore = useLanguageStore();
const overlayPanel = ref<InstanceType<typeof OverlayPanel> | null>(null);
const languageSwitcherRef = ref<HTMLElement | null>(null);
const currentLanguage = ref<LanguageCode>("en");
const languageNames: Record<LanguageCode, string> = {
  en: "English",
  de: "Deutsch",
  it: "Italiano",
  fr: "Français",
};
const icons: Record<LanguageCode, string> = {
  en: engIcon,
  de: gerIcon,
  it: itaIcon,
  fr: freIcon,
};
const currentIcon = computed(() => icons[currentLanguage.value]);
const isOverlayPanelOpen = ref(false);

const toggleOverlayPanel = (event: MouseEvent) => {
  isOverlayPanelOpen.value = !isOverlayPanelOpen.value;
  overlayPanel.value?.toggle(event);
};

const changeLanguage = (code: LanguageCode) => {
  locale.value = code;
  languageStore.setLanguage(code);
  currentLanguage.value = code;
  isOverlayPanelOpen.value = false;
  overlayPanel.value?.hide();
};

const onOverlayHide = () => {
  isOverlayPanelOpen.value = false;
};

const handleScroll = () => {
  if (
    overlayPanel.value &&
    languageSwitcherRef.value &&
    !isElementVisible(languageSwitcherRef.value)
  ) {
    isOverlayPanelOpen.value = false;
    overlayPanel.value.hide();
  }
};

const isElementVisible = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

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
