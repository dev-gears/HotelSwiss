<template>
  <a
    :href="link"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="`${$t('SocialNetworks.visitOn')} ${platformName}`"
    class="group relative flex items-center justify-center rounded-xl p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-dark-100 sm:rounded-2xl sm:p-4"
    :class="platformClasses"
    :style="{ animationDelay: `${index * 100}ms` }"
    @click="$emit('click')"
  >
    <!-- Background glow effect -->
    <div
      class="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-20 sm:rounded-2xl"
      :class="glowClasses"
    />

    <!-- Icon -->
    <i
      :class="`pi pi-${icon} text-2xl transition-all duration-300 sm:text-3xl`"
      class="relative z-10 text-white"
    />

    <!-- Hover label -->
    <div
      class="absolute -bottom-8 left-1/2 z-20 -translate-x-1/2 transform opacity-0 transition-all duration-200 group-hover:opacity-100"
    >
      <div
        class="rounded-md bg-dark px-2 py-1 text-xs text-white shadow-lg dark:bg-light dark:text-dark"
      >
        {{ platformName }}
        <div
          class="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-dark dark:bg-light"
        />
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  icon: string;
  link: string;
  name?: string;
  index?: number;
}

interface Emits {
  (e: "click"): void;
}

const props = withDefaults(defineProps<Props>(), {
  name: "",
  index: 0,
});

defineEmits<Emits>();

// Determine platform name for accessibility
const platformName = computed(() => {
  if (props.name) return props.name;

  // Map common icons to platform names
  const platformMap: Record<string, string> = {
    facebook: "Facebook",
    instagram: "Instagram",
    twitter: "Twitter",
    linkedin: "LinkedIn",
    youtube: "YouTube",
    tiktok: "TikTok",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    pinterest: "Pinterest",
    snapchat: "Snapchat",
    discord: "Discord",
    twitch: "Twitch",
  };

  return (
    platformMap[props.icon] ||
    props.icon.charAt(0).toUpperCase() + props.icon.slice(1)
  );
});

// Platform-specific styling
const platformClasses = computed(() => {
  const baseClasses = "text-white shadow-md";

  const platformStyles: Record<string, string> = {
    facebook:
      "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
    instagram:
      "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600",
    twitter:
      "bg-gradient-to-br from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600",
    linkedin:
      "bg-gradient-to-br from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900",
    youtube:
      "bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
    tiktok:
      "bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black",
    whatsapp:
      "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    telegram:
      "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    pinterest:
      "bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
    snapchat:
      "bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600",
    discord:
      "bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800",
    twitch:
      "bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
  };

  return `${baseClasses} ${platformStyles[props.icon] || "bg-gradient-to-br from-primary to-primary-200 hover:from-primary-200 hover:to-primary dark:from-primary-200 dark:to-primary-300"}`;
});

// Glow effect classes for hover
const glowClasses = computed(() => {
  const glowStyles: Record<string, string> = {
    facebook: "from-blue-400 to-blue-600",
    instagram: "from-pink-400 via-red-400 to-yellow-400",
    twitter: "from-sky-300 to-sky-500",
    linkedin: "from-blue-600 to-blue-700",
    youtube: "from-red-500 to-red-600",
    tiktok: "from-gray-700 to-gray-800",
    whatsapp: "from-green-400 to-green-500",
    telegram: "from-blue-400 to-blue-500",
    pinterest: "from-red-500 to-red-600",
    snapchat: "from-yellow-300 to-yellow-400",
    discord: "from-indigo-500 to-indigo-600",
    twitch: "from-purple-500 to-purple-600",
  };

  return glowStyles[props.icon] || "from-primary to-primary-200";
});
</script>
