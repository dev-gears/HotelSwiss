<template>
  <Dialog
    dismissableMask
    closable
    v-model:visible="formVisible"
    modal
    blockScroll
    :ptOptions="{ mergeSections: false }"
    :pt="{
      root: 'bg-light-100 h-full w-full fixed bottom-0 left-0 rounded-t-3xl',
      header:
        'bg-light-100 z-50 border-b border-primary/30 rounded-t-3xl fixed w-full flex justify-end items-center py-2 px-6',
      content:
        'bg-light-100 pt-20 rounded-t-3xl px-7 overflow-y-scroll flex flex-col gap-6',
      footer:
        'bg-light-100 bottom-0 border-t border-primary/30 px-6 flex justify-between',
    }"
  >
    <h1>{{ $t("ContactForm.title") }}</h1>
    <form class="flex flex-col gap-3" @submit="submitForm">
      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm text-primary-200">
          {{ $t("ContactForm.name") }}:
          <span class="text-[red]">*</span>
        </label>
        <InputText
          id="name"
          class="p-inputgroup h-12 w-full rounded-xl bg-light px-2 text-primary-200 shadow focus:shadow"
          v-model="name"
          label="Name"
          placeholder="Enter your name"
          required
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm text-primary-200">
          {{ $t("ContactForm.email") }}:
          <span class="text-[red]">*</span>
        </label>
        <InputText
          id="email"
          class="p-inputgroup h-12 w-full rounded-xl bg-light px-2 text-primary-200 shadow focus:shadow"
          v-model="email"
          label="Email"
          placeholder="Enter your email"
          type="email"
          required
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="phone" class="text-sm text-primary-200">
          {{ $t("ContactForm.phone") }}:
          <span class="text-primary-200/30">({{ $t("Common.optional") }})</span>
        </label>
        <InputText
          id="phone"
          class="p-inputgroup h-12 w-full rounded-xl bg-light px-2 text-primary-200 shadow focus:shadow"
          v-model="phone"
          label="Phone"
          placeholder="Enter your phone number"
          type="tel"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label>
          {{ $t("ContactForm.date") }}:
          <span class="text-primary-200/30">({{ $t("Common.optional") }})</span>
        </label>
        <div class="flex gap-4">
          <Calendar
            class="p-inputgroup p-input-icon-right h-12 w-full rounded-xl bg-light px-2 text-primary-200 shadow focus:shadow"
            v-model="arrivalDate"
            showIcon
            :placeholder="$t('ContactForm.arrivalDate')"
            iconDisplay="input"
            :pt="{
              dropdownButton: 'bg-primary',
            }"
          />
          <Calendar
            class="p-inputgroup p-input-icon-right h-12 w-full rounded-xl bg-light px-2 text-primary-200 shadow focus:shadow"
            v-model="leavingDate"
            showIcon
            :placeholder="$t('ContactForm.leavingDate')"
            iconDisplay="input"
          />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label for="message" class="text-sm text-primary-200">
          {{ $t("ContactForm.message") }}:
          <span class="text-[red]">*</span>
        </label>
        <InputText
          id="message"
          class="p-inputgroup h-12 w-full rounded-xl bg-light px-2 text-primary-200 shadow focus:shadow"
          v-model="message"
          label="Message"
          placeholder="Enter your message"
          required
        />
      </div>
      <Button type="submit">{{ $t("ContactForm.submit") }}</Button>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const formVisible = ref(false);

const name = ref("");
const email = ref("");
const message = ref("");
const phone = ref("");
const arrivalDate = ref("");
const leavingDate = ref("");

const submitForm = (e: Event) => {
  e.preventDefault();
  const formData = {
    name: name.value,
    email: email.value,
    message: message.value,
    phone: phone.value,
    arrivalDate: arrivalDate.value,
    leavingDate: leavingDate.value,
  };
  console.log("Form submitted", formData);
};
</script>

<style scoped></style>
