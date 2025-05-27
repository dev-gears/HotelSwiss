# HotelSwiss UI Component Library

This document provides usage examples and guidelines for the HotelSwiss UI component library, which wraps PrimeVue components to provide a consistent design system.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Components](#components)
   - [Button](#button)
   - [Input](#input)
   - [SelectButton](#selectbutton)
   - [Dialog](#dialog)
   - [Popover](#popover)
   - [Toast](#toast)
   - [Image](#image)
   - [And more...](#more-components)
4. [Theming](#theming)
5. [Accessibility](#accessibility)

## Introduction

The HotelSwiss UI component library is a set of Vue components that wrap PrimeVue components to provide a consistent design system for the HotelSwiss application. This library makes it easier to maintain a consistent look and feel across the application and makes future UI library migrations easier.

## Getting Started

All components are available in the `components/ui` directory. You can import them directly in your Vue components:

```vue
<script setup>
import Button from "primevue/button";
</script>

<template>
  <Button label="Click me" variant="primary" @click="handleClick" />
</template>
```

## Components

### Button

The Button component provides a consistent way to render buttons throughout the application.

**Props:**

| Prop      | Type                                                        | Default   | Description                            |
| --------- | ----------------------------------------------------------- | --------- | -------------------------------------- |
| label     | string                                                      | undefined | Button label text                      |
| icon      | string                                                      | undefined | Icon class name                        |
| variant   | 'primary' \| 'secondary' \| 'danger' \| 'text' \| 'outline' | 'primary' | Button style variant                   |
| size      | 'small' \| 'medium' \| 'large'                              | 'medium'  | Button size                            |
| disabled  | boolean                                                     | false     | Whether the button is disabled         |
| loading   | boolean                                                     | false     | Whether the button is in loading state |
| fullWidth | boolean                                                     | false     | Whether the button takes full width    |
| rounded   | boolean                                                     | false     | Whether the button has rounded corners |

**Events:**

- `click` - Emitted when the button is clicked

**Example:**

```vue
<Button
  label="Submit"
  variant="primary"
  size="medium"
  :loading="isSubmitting"
  @click="handleSubmit"
/>

<Button
  icon="pi pi-trash"
  variant="danger"
  size="small"
  @click="handleDelete"
/>

<Button label="Cancel" variant="text" @click="handleCancel" />
```

### SelectButton

The SelectButton component provides a button group that can be used for selecting one or multiple options.

**Props:**

| Prop           | Type                                | Default    | Description                             |
| -------------- | ----------------------------------- | ---------- | --------------------------------------- |
| modelValue     | any \| any[]                        | undefined  | Selected value(s)                       |
| options        | array                               | []         | Options to select from                  |
| optionLabel    | string                              | 'label'    | Property name for option label          |
| optionValue    | string                              | 'value'    | Property name for option value          |
| optionDisabled | string                              | 'disabled' | Property name for option disabled state |
| multiple       | boolean                             | false      | Whether multiple selection is allowed   |
| unselectable   | boolean                             | true       | Whether options can be unselected       |
| size           | 'small' \| 'medium' \| 'large'      | 'medium'   | Button size                             |
| variant        | 'default' \| 'primary' \| 'outline' | 'default'  | Button style variant                    |

**Events:**

- `update:modelValue` - Emitted when selection changes

**Example:**

```vue
<script setup>
import { ref } from "vue";
import SelectButton from "@/components/ui/Select/SelectButton.vue";

const selectedOption = ref("option1");
const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];
</script>

<template>
  <SelectButton
    v-model="selectedOption"
    :options="options"
    variant="primary"
    size="medium"
  />
</template>
```

### Dialog

The Dialog component provides a modal dialog for displaying content.

**Props:**

| Prop            | Type                                                                                                               | Default  | Description                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | -------- | ------------------------------------------ |
| modelValue      | boolean                                                                                                            | -        | Controls dialog visibility                 |
| header          | string                                                                                                             | ''       | Dialog header text                         |
| modal           | boolean                                                                                                            | true     | Whether to show a modal overlay            |
| dismissableMask | boolean                                                                                                            | true     | Whether clicking outside closes the dialog |
| closeOnEscape   | boolean                                                                                                            | true     | Whether pressing Escape closes the dialog  |
| position        | 'center' \| 'top' \| 'bottom' \| 'left' \| 'right' \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | 'center' | Dialog position                            |
| maximizable     | boolean                                                                                                            | false    | Whether dialog can be maximized            |
| draggable       | boolean                                                                                                            | false    | Whether dialog can be dragged              |
| size            | 'small' \| 'medium' \| 'large' \| 'fullscreen'                                                                     | 'medium' | Dialog size                                |

**Events:**

- `update:modelValue` - Emitted when dialog visibility changes
- `after-hide` - Emitted after dialog is hidden

**Example:**

```vue
<script setup>
import { ref } from "vue";
import Dialog from "@/components/ui/Dialog/Dialog.vue";
import Button from "primevue/button";

const visible = ref(false);
</script>

<template>
  <Button label="Open Dialog" @click="visible = true" />

  <Dialog v-model="visible" header="Confirmation" size="small">
    <p>Are you sure you want to continue?</p>

    <template #footer>
      <Button label="Cancel" variant="text" @click="visible = false" />
      <Button label="Confirm" variant="primary" @click="handleConfirm" />
    </template>
  </Dialog>
</template>
```

### Popover

The Popover component displays floating content triggered by another element.

**Props:**

| Prop          | Type                                   | Default   | Description                                 |
| ------------- | -------------------------------------- | --------- | ------------------------------------------- |
| dismissable   | boolean                                | true      | Whether clicking outside closes the popover |
| showCloseIcon | boolean                                | false     | Whether to show a close icon                |
| closeOnEscape | boolean                                | true      | Whether pressing Escape closes the popover  |
| position      | 'top' \| 'bottom' \| 'left' \| 'right' | 'bottom'  | Popover position                            |
| variant       | 'default' \| 'elevated'                | 'default' | Popover style variant                       |

**Events:**

- `show` - Emitted when popover is shown
- `hide` - Emitted when popover is hidden

**Methods:**

- `toggle(event)` - Toggle popover visibility
- `show(event)` - Show popover
- `hide()` - Hide popover

**Example:**

```vue
<script setup>
import { ref } from "vue";
import Popover from "@/components/ui/Overlay/Popover.vue";
import Button from "primevue/button";

const popoverRef = ref(null);
</script>

<template>
  <Button label="Show Popover" @click="popoverRef.toggle($event)" />

  <Popover ref="popoverRef" position="bottom" variant="elevated">
    <div class="p-4">
      <h3 class="mb-2 text-lg font-bold">Popover Title</h3>
      <p>This is some popover content.</p>
    </div>
  </Popover>
</template>
```

### Toast

The Toast component displays brief, temporary notifications.

**Props:**

| Prop     | Type                                                                                            | Default     | Description           |
| -------- | ----------------------------------------------------------------------------------------------- | ----------- | --------------------- |
| position | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center' | 'top-right' | Toast position        |
| group    | string                                                                                          | 'default'   | Group name for toasts |

**Methods:**

- `show(options)` - Show a toast notification
- `success(summary, detail?, life?)` - Show a success toast
- `info(summary, detail?, life?)` - Show an info toast
- `warn(summary, detail?, life?)` - Show a warning toast
- `error(summary, detail?, life?)` - Show an error toast
- `removeAll()` - Remove all toasts

**Example:**

```vue
<script setup>
import { ref } from "vue";
import Toast from "@/components/ui/Feedback/Toast.vue";
import Button from "primevue/button";

const toastRef = ref(null);

const showSuccessToast = () => {
  toastRef.value.success("Success", "Operation completed successfully");
};

const showErrorToast = () => {
  toastRef.value.error("Error", "An error occurred");
};
</script>

<template>
  <Toast ref="toastRef" position="top-right" />

  <Button label="Show Success" variant="primary" @click="showSuccessToast" />
  <Button label="Show Error" variant="danger" @click="showErrorToast" />
</template>
```

### Image

The Image component displays images with optional preview.

**Props:**

| Prop           | Type                                                     | Default  | Description                      |
| -------------- | -------------------------------------------------------- | -------- | -------------------------------- |
| src            | string                                                   | ''       | Image source URL                 |
| alt            | string                                                   | ''       | Image alt text                   |
| width          | string                                                   | '100%'   | Image width                      |
| height         | string                                                   | 'auto'   | Image height                     |
| preview        | boolean                                                  | false    | Whether to enable image preview  |
| loading        | 'lazy' \| 'eager'                                        | 'lazy'   | Image loading behavior           |
| fit            | 'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down' | 'cover'  | Image object-fit property        |
| rounded        | boolean                                                  | false    | Whether to apply rounded corners |
| objectPosition | string                                                   | 'center' | Image object-position property   |
| imageStyle     | object                                                   | null     | Additional styles for the image  |
| imageClass     | string                                                   | ''       | Additional classes for the image |

**Example:**

```vue
<template>
  <Image
    src="/path/to/image.jpg"
    alt="Sample image"
    width="300px"
    height="200px"
    fit="cover"
    :preview="true"
    :rounded="true"
  />
</template>
```

### More Components

For more components and detailed documentation, refer to the component files in the `components/ui` directory.

## Theming

The HotelSwiss UI components use Tailwind CSS classes for styling, combined with PrimeVue's PassThrough (PT) API for component-specific styling. Dark mode is supported via the `dark:` prefix in Tailwind classes.

## Accessibility

All components maintain accessibility features from the underlying PrimeVue components. When implementing new UI features, be sure to test for accessibility compliance.
