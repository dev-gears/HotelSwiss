<template>
  <div v-if="showGroup" class="filter-group">
    <div class="mb-3 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div :class="iconContainerClass">
          <i :class="iconClass"></i>
        </div>
        <span
          class="font-robotoRegular text-sm font-medium text-primary-200 dark:text-light"
        >
          {{ title }}
        </span>
        <span v-if="showCount" :class="countBadgeClass">
          {{ count }}
        </span>
      </div>
      <slot name="actions" />
    </div>
    <div class="flex flex-wrap gap-2">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  icon: string;
  count?: number;
  showCount?: boolean;
  iconVariant?: "primary" | "secondary" | "tertiary" | "quaternary";
  items?: any[];
}

const props = withDefaults(defineProps<Props>(), {
  showCount: true,
  iconVariant: "primary",
  count: 0,
});

const showGroup = computed(() => {
  if (props.items) {
    return props.items.length > 0;
  }
  return props.count > 0;
});

const iconContainerClass = computed(() => {
  const variants = {
    primary:
      "flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 shadow-sm ring-2 ring-primary/5 dark:bg-primary-200/25 dark:ring-primary-200/15",
    secondary:
      "flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 shadow-sm ring-2 ring-primary/10 dark:bg-primary-200/25 dark:ring-primary-200/15",
    tertiary:
      "flex h-7 w-7 items-center justify-center rounded-full bg-primary-200/15 shadow-sm ring-2 ring-primary-200/10 dark:bg-primary/25 dark:ring-primary/15",
    quaternary:
      "flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 shadow-sm ring-2 ring-primary/15 dark:bg-primary-200/20 dark:ring-primary-200/15",
  };
  return variants[props.iconVariant];
});

const iconClass = computed(() => {
  return `${props.icon} text-sm font-bold text-primary dark:text-light`;
});

const countBadgeClass = computed(() => {
  const variants = {
    primary:
      "rounded-full bg-gradient-to-r from-primary/20 to-primary-200/30 px-3 py-1 text-xs font-bold text-primary shadow-sm ring-1 ring-primary/20 dark:from-primary-200/25 dark:to-primary/35 dark:text-light dark:ring-primary-200/15",
    secondary:
      "rounded-full bg-gradient-to-r from-primary/20 to-primary-200/30 px-3 py-1 text-xs font-bold text-primary shadow-sm ring-1 ring-primary/20 dark:from-primary-200/25 dark:to-primary/35 dark:text-light dark:ring-primary-200/15",
    tertiary:
      "rounded-full bg-gradient-to-r from-primary-200/20 to-primary/30 px-3 py-1 text-xs font-bold text-primary-200 shadow-sm ring-1 ring-primary-200/20 dark:from-primary/25 dark:to-primary-200/35 dark:text-light dark:ring-primary/15",
    quaternary:
      "rounded-full bg-gradient-to-r from-primary-100/20 to-primary/30 px-3 py-1 text-xs font-bold text-primary-100 shadow-sm ring-1 ring-primary-100/20 dark:from-primary/25 dark:to-primary-200/35 dark:text-light dark:ring-primary/15",
  };
  return variants[props.iconVariant];
});
</script>

<style lang="pcss" scoped>
.filter-group {
  @apply transform transition-all duration-300 ease-in-out;
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
