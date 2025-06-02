<template>
  <nav class="navigation-menu">
    <!-- Desktop Navigation -->
    <div class="hidden lg:block">
      <Menubar
        :model="menuItems"
        class="border-none p-0"
        :pt="{
          root: 'border-none bg-primary dark:bg-dark-300',
          submenu: 'border-none !rounded-md p-0 gap-2 bg-primary mt-2 z-10',
          itemContent: 'bg-primary-100 hover:bg-primary-200 text-light',
        }"
      >
        <template #item="{ item, props, hasSubmenu }">
          <NuxtLink
            v-if="item.route"
            :to="localePath(item.route)"
            class="group flex items-center gap-2 rounded-md bg-primary-100 px-4 py-2.5 text-sm font-medium text-light transition-all duration-200 hover:bg-primary-200"
            v-bind="props.action"
          >
            <i
              v-if="item.icon"
              :class="item.icon"
              class="text-sm transition-transform"
            />
            <span class="transition-colors">{{ item.label }}</span>
            <i
              v-if="hasSubmenu"
              class="pi pi-chevron-down ml-1 text-xs transition-transform hover:rotate-180"
            />
          </NuxtLink>
          <a
            v-else
            class="group flex items-center gap-2 rounded-md bg-primary-100 px-4 py-2.5 text-sm font-medium text-light transition-all duration-200 hover:bg-primary-200"
            v-bind="props.action"
          >
            <i
              v-if="item.icon"
              :class="item.icon"
              class="text-sm transition-transform"
            />
            <span class="transition-colors">{{ item.label }}</span>
            <i
              v-if="hasSubmenu"
              class="pi pi-chevron-down ml-1 text-xs transition-transform hover:rotate-180"
            />
          </a>
        </template>
      </Menubar>
    </div>
    <!-- Mobile Navigation -->
    <div class="lg:hidden">
      <!-- Mobile Menu Button -->
      <Button
        @click="mobileMenuVisible = !mobileMenuVisible"
        text
        rounded
        class="group p-2 transition-all duration-200"
        :aria-label="$t('Navigation.menuToggle')"
        v-ripple
      >
        <i
          :class="mobileMenuVisible ? 'pi pi-times' : 'pi pi-bars'"
          class="text-lg text-light transition-all duration-300"
        />
      </Button>

      <!-- Mobile Menu Overlay -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="mobileMenuVisible"
          class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          @click="mobileMenuVisible = false"
        />
      </Transition>

      <!-- Mobile Menu Panel -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-in"
        enter-from-class="transform translate-x-full"
        enter-to-class="transform translate-x-0"
        leave-from-class="transform translate-x-0"
        leave-to-class="transform translate-x-full"
      >
        <div
          v-if="mobileMenuVisible"
          class="fixed right-0 top-0 z-50 h-full w-80 max-w-[90vw] bg-light shadow-2xl dark:bg-dark-100"
        >
          <!-- Mobile Menu Header -->
          <div
            class="flex items-center justify-between border-b border-primary/20 bg-gradient-to-r from-primary to-primary-200 p-4 dark:border-primary/30 dark:from-primary-100 dark:to-primary"
          >
            <h3 class="text-lg font-semibold text-light">
              {{ $t("Navigation.menu") }}
            </h3>
            <Button
              @click="mobileMenuVisible = false"
              text
              rounded
              size="small"
              class="group p-2 transition-all duration-200"
              v-ripple
            >
              <i class="pi pi-times text-sm text-light transition-transform" />
            </Button>
          </div>
          <!-- Mobile Menu Content -->
          <div class="overflow-y-auto p-4">
            <PanelMenu
              :model="mobileMenuItems"
              class="w-full border-none bg-transparent"
              :pt="{
                root: 'bg-transparent border-none',
                panel: 'mb-2',
                header: 'rounded-lg transition-all duration-200',
                headerContent: 'rounded-lg',
                headerAction: 'rounded-lg p-3 transition-all duration-200',
                content:
                  'ml-6 border-l-2 border-primary/20 pl-4 dark:border-primary/30 mt-2',
                submenu: 'space-y-1',
                submenuItem: 'rounded-lg transition-all duration-200',
                headerIcon:
                  'text-primary dark:text-light transition-transform duration-200',
              }"
            >
              <template #item="{ item }">
                <NuxtLink
                  v-if="item.route"
                  :to="localePath(item.route)"
                  class="flex items-center gap-3 rounded-lg p-3 text-primary transition-all duration-200 dark:text-light"
                  @click="mobileMenuVisible = false"
                >
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-all duration-200 dark:bg-primary/20"
                  >
                    <i
                      v-if="item.icon"
                      :class="item.icon"
                      class="text-sm text-primary dark:text-light"
                    />
                  </div>
                  <span class="flex-1 font-medium transition-colors">{{
                    item.label
                  }}</span>
                  <i
                    v-if="item.items && item.items.length > 0"
                    class="pi pi-chevron-down text-xs text-primary/70 transition-transform dark:text-light/70"
                  />
                </NuxtLink>
                <div
                  v-else
                  class="group flex cursor-pointer items-center gap-3 rounded-lg p-3 text-primary transition-all duration-200 dark:text-light"
                >
                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-all duration-200 dark:bg-primary/20"
                  >
                    <i
                      v-if="item.icon"
                      :class="item.icon"
                      class="text-sm text-primary dark:text-light"
                    />
                  </div>
                  <span class="flex-1 font-medium">{{ item.label }}</span>
                  <i
                    v-if="item.items && item.items.length > 0"
                    class="pi pi-chevron-down text-xs text-primary/70 transition-transform dark:text-light/70"
                  />
                </div>
              </template>
              <!-- Submenu items are handled by PanelMenu's item template recursively -->
            </PanelMenu>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import PanelMenu from "primevue/panelmenu";
import Menubar from "primevue/menubar";
import Button from "primevue/button";

interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  items?: MenuItem[];
}

const { t } = useI18n();
const localePath = useLocalePath();
const mobileMenuVisible = ref(false);

// Main navigation items
const menuItems = computed<MenuItem[]>(() => [
  {
    label: t("Navigation.home"),
    icon: "pi pi-home",
    route: "/",
  },
  {
    label: t("Navigation.discover"),
    icon: "pi pi-map",
    route: "/discover",
  },
  {
    label: t("Navigation.support"),
    icon: "pi pi-question-circle",
    items: [
      {
        label: t("Navigation.faq"),
        route: "/faq",
        icon: "pi pi-comments",
      },
      {
        label: t("Navigation.contact"),
        route: "/contact",
        icon: "pi pi-envelope",
      },
      {
        label: t("Navigation.contactGuide"),
        route: "/contact-guide",
        icon: "pi pi-book",
      },
    ],
  },
  {
    label: t("Navigation.about"),
    icon: "pi pi-info-circle",
    route: "/about",
  },
]);

// Mobile menu items (flattened structure)
const mobileMenuItems = computed<MenuItem[]>(() => [
  {
    label: t("Navigation.home"),
    icon: "pi pi-home",
    route: "/",
  },
  {
    label: t("Navigation.discover"),
    icon: "pi pi-map",
    route: "/discover",
  },
  {
    label: t("Navigation.about"),
    icon: "pi pi-info-circle",
    route: "/about",
  },
  {
    label: t("Navigation.support"),
    icon: "pi pi-question-circle",
    items: [
      {
        label: t("Navigation.faq"),
        route: "/faq",
        icon: "pi pi-comments",
      },
      {
        label: t("Navigation.contact"),
        route: "/contact",
        icon: "pi pi-envelope",
      },
      {
        label: t("Navigation.contactGuide"),
        route: "/contact-guide",
        icon: "pi pi-book",
      },
    ],
  },
  {
    label: t("Navigation.legal"),
    icon: "pi pi-receipt",
    items: [
      {
        label: t("Navigation.privacy"),
        route: "/privacy",
        icon: "pi pi-shield",
      },
      {
        label: t("Navigation.terms"),
        route: "/terms",
        icon: "pi pi-file-o",
      },
      {
        label: t("Navigation.cookies"),
        route: "/cookies",
        icon: "pi pi-cog",
      },
      {
        label: t("Navigation.contactPolicy"),
        route: "/contact-policy",
        icon: "pi pi-clipboard",
      },
    ],
  },
]);

// Close mobile menu when route changes
watch(
  () => useRoute().path,
  () => {
    mobileMenuVisible.value = false;
  },
);

// Close mobile menu on escape key
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      mobileMenuVisible.value = false;
    }
  };

  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>
