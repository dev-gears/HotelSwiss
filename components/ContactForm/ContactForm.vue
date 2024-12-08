<template>
  <div class="font-robotoRegular">
    <h1 class="mb-5 text-xl font-bold leading-6">
      {{ $t("ContactForm.title") }}
    </h1>
    <form class="flex flex-col gap-3" @submit="submitForm">
      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm text-primary-200">
          {{ $t("ContactForm.fields.name.label") }}:
          <span class="text-[red]">*</span>
        </label>
        <InputText
          id="name"
          v-model="name"
          :placeholder="$t('ContactForm.fields.name.placeholder')"
          required
          class="!focus:shadow !h-12 w-full !rounded-xl !bg-light-100 !px-2 !text-primary-200 !shadow"
        />
        <span v-if="errors.name" class="text-red-500 text-sm">{{
          $t('ContactForm.fields.name.error')
        }}</span>
      </div>

      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm text-primary-200">
          {{ $t("ContactForm.fields.email.label") }}:
          <span class="text-[red]">*</span>
        </label>
        <InputText
          id="email"
          v-model="email"
          type="email"
          :placeholder="$t('ContactForm.fields.email.placeholder')"
          required
          class="!focus:shadow !h-12 w-full !rounded-xl !bg-light-100 !px-2 !text-primary-200 !shadow"
        />
        <span v-if="errors.email" class="text-red-500 text-sm">{{
          $t('ContactForm.fields.email.error')
        }}</span>
      </div>

      <div class="flex flex-col gap-2">
        <label for="phone" class="text-sm text-primary-200">
          {{ $t("ContactForm.fields.phone.label") }}:
          <span class="text-primary-200/30">({{ $t("Common.optional") }})</span>
        </label>
        <InputText
          id="phone"
          v-model="phone"
          type="tel"
          :placeholder="$t('ContactForm.fields.phone.placeholder')"
          class="!focus:shadow !h-12 w-full !rounded-xl !bg-light-100 !px-2 !text-primary-200 !shadow"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm text-primary-200">
          {{ $t("ContactForm.fields.date.label") }}:
          <span class="text-primary-200/30">({{ $t("Common.optional") }})</span>
        </label>
        <InputGroup
          class="!focus:shadow !h-12 w-full !rounded-xl !bg-light-100 !text-primary-200 !shadow sm:w-auto"
        >
          <DatePicker
            :pt="{
              dropdown: '!bg-primary !rounded-r-xl text-light',
              panel: 'border !border-primary-200',
              daycell: 'p-0',
            }"
            selectionMode="range"
            dateFormat="dd/mm/yy"
            v-model="date"
            :placeholder="$t('ContactForm.fields.date.placeholder')"
            :show-icon="true"
          />
        </InputGroup>
      </div>

      <div class="flex flex-col gap-2">
        <label for="message" class="text-sm text-primary-200">
          {{ $t("ContactForm.fields.message.label") }}:
          <span class="text-[red]">*</span>
        </label>
        <Textarea
          id="message"
          v-model="message"
          :placeholder="$t('ContactForm.fields.message.placeholder')"
          required
          rows="5"
          class="!focus:shadow !h-auto w-full !rounded-xl !bg-light-100 !px-2 !py-4 !text-primary-200 !shadow"
        />
        <span v-if="errors.message" class="text-red-500 text-sm">{{
          $t('ContactForm.fields.message.error')
        }}</span>
      </div>

      <Button
        :label="$t('ContactForm.buttons.submit')"
        type="submit"
        :pt="{
          root: '!rounded-xl !bg-primary !px-4 !py-2 !text-xl !text-light',
        }"
      />
    </form>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import { useI18n } from "vue-i18n";

const name = ref("");
const email = ref("");
const message = ref("");
const phone = ref("");
const date = ref<Date | null>(null);
const { t: $t } = useI18n();

const errors = ref({
  name: "",
  email: "",
  message: "",
});

const isFormValid = computed(() => {
  return (
    name.value.trim() !== "" &&
    email.value.trim() !== "" &&
    validateEmail(email.value) &&
    message.value.trim() !== ""
  );
});

const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const submitForm = (e: Event) => {
  e.preventDefault();

  errors.value = {
    name: "",
    email: "",
    message: "",
  };

  let valid = true;

  if (name.value.trim() === "") {
  errors.value.name = $t("ContactForm.fields.name.error"); 
  valid = false;
}

if (email.value.trim() === "") {
  errors.value.email = $t("ContactForm.fields.email.error"); 
  valid = false;
} else if (!validateEmail(email.value)) {
  errors.value.email = $t("ContactForm.fields.email.invalid"); 
  valid = false;
}

if (message.value.trim() === "") {
  errors.value.message = $t("ContactForm.fields.message.error"); 
  valid = false;
}

if (!valid) {
  return;
}

  const formData = {
    name: name.value,
    email: email.value,
    message: message.value,
    phone: phone.value,
    date: date.value,
  };
  console.log("Form submitted", formData);

  name.value = "";
  email.value = "";
  message.value = "";
  phone.value = "";
  date.value = null;
};
</script>

<style>
.p-datepicker-input {
  @apply !bg-light-100 pl-2 !text-primary-200;
}
</style>
