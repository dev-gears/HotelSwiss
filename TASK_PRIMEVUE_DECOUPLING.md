# PrimeVue Decoupling Task

## Task Overview

The goal of this task is to decouple PrimeVue components from the HotelSwiss project by creating wrapper components around all PrimeVue UI elements. This will improve maintainability, make future UI library migrations easier, and create a consistent design system specific to the HotelSwiss application.

## Current State

The HotelSwiss application currently uses PrimeVue components directly throughout the codebase:

- PrimeVue components are imported globally and used directly in templates
- Styling is handled through a mix of Tailwind classes and PrimeVue's `pt` (PassThrough) props
- There's a tight coupling between the application's UI and PrimeVue's component API
- Custom styling for PrimeVue components is scattered across multiple component files

## Target State

After this task is completed:

- No direct usage of PrimeVue components in the application code
- All UI component usage will be through custom HotelSwiss wrapper components
- Consistent API and styling across all UI components
- PrimeVue-specific code isolated to the wrapper components
- A unified design system document explaining all available components

## Implementation Details

### 1. Component Structure

Create a new directory structure for UI components:

```
components/
  ui/
    Button/
      Button.vue
      ButtonGroup.vue
    Input/
      Input.vue
      InputNumber.vue
      TextArea.vue
    Select/
      Select.vue
      MultiSelect.vue
    Rating/
      Rating.vue
    Dialog/
      Dialog.vue
      Drawer.vue
    Data/
      DataView.vue
      Table.vue
    Display/
      Skeleton.vue
      ProgressBar.vue
      ProgressSpinner.vue
    Media/
      Image.vue
      Carousel.vue
      Gallery.vue
    Layout/
      Card.vue
      Divider.vue
    Feedback/
      Toast.vue
      Message.vue
    Navigation/
      Menu.vue
      Tabs.vue
    Overlay/
      Popover.vue
      OverlayPanel.vue
    Icons/
      Icon.vue
```

### 2. Wrapper Component Interface

Each wrapper component should:

1. Import the underlying PrimeVue component
2. Define a clean, simplified API specific to HotelSwiss needs
3. Map the component API to PrimeVue's props and events
4. Apply consistent styling using PrimeVue's PassThrough (`pt`) API
5. Provide TypeScript interfaces for props

Example interface pattern:

```typescript
// Button.vue props interface
export interface ButtonProps {
  label?: string;
  icon?: string;
  variant?: "primary" | "secondary" | "danger" | "text";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}
```

### 3. Component Template

```vue
<template>
  <PrimeButton
    :label="label"
    :icon="icon"
    :disabled="disabled || loading"
    :loading="loading"
    :pt="getPassthroughProps()"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button as PrimeButton from 'primevue/button';

const props = defineProps<ButtonProps>();

const emit = defineEmits(['click']);

const getPassthroughProps = computed(() => {
  return {
    root: [
      'transition-colors duration-200',
      {
        // Primary variant
        'bg-primary hover:bg-primary-dark text-white': props.variant === 'primary',
        // Secondary variant
        'bg-light-100 dark:bg-dark-300 hover:bg-light-200 dark:hover:bg-dark-200 text-primary-200': props.variant === 'secondary',
        // Other variants...
        // Sizes
        'text-sm py-1.5 px-3': props.size === 'small',
        'text-base py-2 px-4': props.size === 'medium',
        'text-lg py-2.5 px-5': props.size === 'large',
        // Full width
        'w-full': props.fullWidth,
      }
    ],
    // Other elements that need styling
    label: 'font-robotoRegular',
    icon: 'mr-2',
    loadingIcon: 'animate-spin'
  };
});
</script>
```

### 4. Priority Components to Implement

Based on usage frequency in the codebase, implement these components first:

1. **Button** - Used throughout the application
2. **InputText** - Form inputs and search
3. **Skeleton** - Loading states
4. **Chip** - Tags and filters
5. **Carousel** - Image galleries
6. **Rating** - Hotel ratings
7. **Checkbox** - Filter selectors
8. **Popover** - Dropdown menus
9. **Dialog/Drawer** - Modals
10. **InputNumber** - Price range filters

### 5. Implementation Plan

#### Phase 1: Core Components

1. Create the directory structure
2. Implement the top 10 priority components
3. Update at least one page (e.g., search page) to use the new components
4. Document components with example usage

#### Phase 2: Full Implementation

1. Complete all remaining components
2. Update all pages to use the new components
3. Remove direct PrimeVue imports from components
4. Create documentation for the new design system

#### Phase 3: Cleanup and Optimization

1. Remove any unused components
2. Optimize bundle size by ensuring only used components are imported
3. Add unit tests for the wrapper components
4. Create comprehensive documentation

### 6. Component Mapping

Below is a mapping of current PrimeVue components to new wrapper components:

| PrimeVue Component | New Wrapper Component | Priority |
| ------------------ | --------------------- | -------- |
| Button             | Button.vue            | High     |
| InputText          | Input.vue             | High     |
| InputNumber        | InputNumber.vue       | High     |
| Skeleton           | Skeleton.vue          | High     |
| Chip               | Chip.vue              | High     |
| Carousel           | Carousel.vue          | High     |
| Rating             | Rating.vue            | High     |
| Checkbox           | Checkbox.vue          | High     |
| Popover            | Popover.vue           | High     |
| Dialog/Drawer      | Dialog.vue/Drawer.vue | High     |
| Image              | Image.vue             | Medium   |
| Badge              | Badge.vue             | Medium   |
| Divider            | Divider.vue           | Medium   |
| Card               | Card.vue              | Medium   |
| MultiSelect        | MultiSelect.vue       | Medium   |
| SelectButton       | SelectButton.vue      | Medium   |
| Toast              | Toast.vue             | Medium   |
| Textarea           | TextArea.vue          | Medium   |
| Message            | Message.vue           | Medium   |
| Tag                | Tag.vue               | Low      |
| ProgressBar        | ProgressBar.vue       | Low      |
| ProgressSpinner    | ProgressSpinner.vue   | Low      |
| ...                | ...                   | ...      |

### 7. Testing Strategy

For each component:

1. Create basic unit tests that verify the component renders correctly
2. Test that events are properly forwarded
3. Test all variants and sizes
4. Test disabled and loading states where applicable
5. Test dark mode compatibility

### 8. Design System Documentation

Create a comprehensive design system document including:

1. Component catalog with examples
2. Usage guidelines
3. Variants and size options
4. Accessibility considerations
5. Theming and customization options

## Example: Button Component Implementation

```vue
<template>
  <PrimeButton
    :label="label"
    :icon="icon"
    :disabled="disabled || loading"
    :loading="loading"
    :pt="ptProps"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import PrimeButton from "primevue/button";

export interface ButtonProps {
  label?: string;
  icon?: string;
  variant?: "primary" | "secondary" | "danger" | "text" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "medium",
  disabled: false,
  loading: false,
  fullWidth: false,
  rounded: false,
});

const emit = defineEmits(["click"]);

const ptProps = computed(() => {
  const baseClasses =
    "transition-colors duration-200 font-robotoRegular focus:outline-none focus:ring-2 focus:ring-primary-200/50";

  const variantClasses = {
    primary: "bg-primary hover:bg-primary-dark text-white",
    secondary:
      "bg-light-100 dark:bg-dark-300 hover:bg-light-200 dark:hover:bg-dark-200 text-primary-200 dark:text-light",
    danger: "bg-danger hover:bg-danger-dark text-white",
    text: "bg-transparent hover:bg-light-100 dark:hover:bg-dark-200 text-primary-200 dark:text-light",
    outline:
      "bg-transparent border border-primary text-primary hover:bg-primary/10 dark:border-primary-200 dark:text-primary-200",
  };

  const sizeClasses = {
    small: "text-sm py-1.5 px-3",
    medium: "text-base py-2 px-4",
    large: "text-lg py-2.5 px-5",
  };

  return {
    root: [
      baseClasses,
      variantClasses[props.variant],
      sizeClasses[props.size],
      props.fullWidth ? "w-full" : "",
      props.rounded ? "rounded-full" : "rounded-md",
      props.disabled ? "opacity-60 cursor-not-allowed" : "",
    ]
      .filter(Boolean)
      .join(" "),
    label: "font-medium",
    icon: props.label ? "mr-2" : "",
    loadingIcon: "animate-spin",
  };
});
</script>
```

## Benefits

1. **Maintainability**: All PrimeVue-specific code is isolated in wrapper components
2. **Consistency**: Unified styling and API across all components
3. **Migration Path**: If we need to change UI libraries in the future, only the wrapper components need to be updated
4. **Bundle Size**: Potentially smaller bundles by only importing used components
5. **Developer Experience**: Simpler, more consistent API tailored to our specific needs
6. **Theming**: Centralized theme management through the wrapper components

## Task Tracking

- [ ] Phase 1: Core Components (estimated: 2 weeks)
- [ ] Phase 2: Full Implementation (estimated: 3 weeks)
- [ ] Phase 3: Cleanup and Optimization (estimated: 1 week)
- [ ] Documentation (estimated: 1 week)
