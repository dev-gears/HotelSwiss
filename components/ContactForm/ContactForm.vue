<template>
  <div class="font-robotoRegular">
    <h1 class="mb-5 text-xl font-bold leading-6 text-dark dark:text-light">
      {{ $t("ContactForm.title") }}
    </h1>
    <form class="flex flex-col gap-3" @submit="submitForm">
      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm text-primary-200 dark:text-light/80">
          {{ $t("ContactForm.fields.name.label") }}:
          <span class="text-[red]">*</span>
        </label>
        <Input
          id="name"
          v-model="name"
          :placeholder="$t('ContactForm.fields.name.placeholder')"
          required
          class="!focus:shadow !h-12 w-full !rounded-xl !bg-light-100 !px-2 !text-primary-200 !shadow dark:!bg-dark-400 dark:!text-light dark:!shadow-dark-200/20"
        />
        <span v-if="errors.name" class="text-sm text-red-500">{{
          $t("ContactForm.fields.name.error")
        }}</span>
      </div>

      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm text-primary-200 dark:text-light/80">
          {{ $t("ContactForm.fields.email.label") }}:
          <span class="text-[red]">*</span>
        </label>
        <Input
          id="email"
          v-model="email"
          type="email"
          :placeholder="$t('ContactForm.fields.email.placeholder')"
          required
          class="!focus:shadow !h-12 w-full !rounded-xl !bg-light-100 !px-2 !text-primary-200 !shadow dark:!bg-dark-400 dark:!text-light dark:!shadow-dark-200/20"
        />
        <span v-if="errors.email" class="text-sm text-red-500">{{
          $t("ContactForm.fields.email.error")
        }}</span>
      </div>
      <div class="flex flex-col gap-2">
        <label for="phone" class="text-sm text-primary-200 dark:text-light/80">
          {{ $t("ContactForm.fields.phone.label") }}:
          <span class="text-primary-200/30 dark:text-light/30">
            ({{ $t("Common.optional") }})
          </span>
        </label>
        <Input
          id="phone"
          v-model="phone"
          type="tel"
          :placeholder="$t('ContactForm.fields.phone.placeholder')"
          class="!focus:shadow !h-12 w-full !rounded-xl !bg-light-100 !px-2 !text-primary-200 !shadow dark:!bg-dark-400 dark:!text-light dark:!shadow-dark-200/20"
        />
      </div>
      <!-- Room Type Selection (optional) -->
      <div v-if="rooms && rooms.length > 0" class="flex flex-col gap-2">
        <label
          for="roomType"
          class="text-sm text-primary-200 dark:text-light/80"
        >
          {{ $t("ContactForm.fields.roomType.label") }}:
          <span class="text-primary-200/30 dark:text-light/30">
            ({{ $t("Common.optional") }})
          </span>
        </label>
        <Select
          id="roomType"
          v-model="selectedRoom"
          :options="rooms"
          optionLabel="name"
          optionValue="id"
          :placeholder="$t('ContactForm.fields.roomType.placeholder')"
          class="!focus:shadow !h-12 w-full !rounded-xl !bg-light-100 !text-primary-200 !shadow dark:!bg-dark-400 dark:!text-light dark:!shadow-dark-200/20"
          :pt="{
            root: '!rounded-xl !bg-light-100 dark:!bg-dark-400',
            input: '!px-2 !text-primary-200 dark:!text-light',
            trigger: '!text-primary-200 dark:!text-light',
            panel:
              '!bg-light dark:!bg-dark-400 !border-primary-200/20 dark:!border-light/10',
            item: '!text-primary-200 dark:!text-light hover:!bg-primary/10 dark:hover:!bg-primary-200/10',
          }"
        >
          <template #option="{ option }">
            <div class="flex w-full items-center justify-between">
              <span>{{ option.name }}</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ option.max_occupants }}
                {{
                  option.max_occupants === 1
                    ? $t("Rooms.guest")
                    : $t("Rooms.guests")
                }}
              </span>
            </div>
          </template>
        </Select>
      </div>

      <!-- Honeypot field to catch bots - hidden from humans but visible to bots -->
      <div class="hidden" aria-hidden="true" style="display: none">
        <label for="website">Website (Leave this empty)</label>
        <Input
          id="website"
          v-model="honeypot"
          type="text"
          autocomplete="off"
          tabindex="-1"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm text-primary-200 dark:text-light/80">
          {{ $t("ContactForm.fields.date.label") }}:
          <span class="text-primary-200/30 dark:text-light/30">
            ({{ $t("Common.optional") }})
          </span>
        </label>
        <InputGroup
          class="!focus:shadow !h-12 w-full !rounded-xl !bg-light-100 !text-primary-200 !shadow dark:!bg-dark-400 dark:!text-light dark:!shadow-dark-200/20 sm:w-auto"
        >
          <DatePicker
            :pt="{
              dropdown:
                '!bg-primary dark:!bg-primary-200 !rounded-r-xl text-light',
              panel:
                'border !border-primary-200 dark:!border-light/10 dark:!bg-dark-400',
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
        <label
          for="message"
          class="text-sm text-primary-200 dark:text-light/80"
        >
          {{ $t("ContactForm.fields.message.label") }}:
          <span class="text-[red]">*</span>
        </label>
        <Textarea
          id="message"
          v-model="message"
          :placeholder="$t('ContactForm.fields.message.placeholder')"
          required
          :rows="5"
          class="!focus:shadow !h-auto w-full !rounded-xl !bg-light-100 !px-2 !py-4 !text-primary-200 !shadow dark:!bg-dark-400 dark:!text-light dark:!shadow-dark-200/20"
        />
        <span v-if="errors.message" class="text-sm text-red-500">{{
          $t("ContactForm.fields.message.error")
        }}</span>
      </div>
      <Button
        :label="
          isSubmitting
            ? $t('ContactForm.buttons.submitting')
            : $t('ContactForm.buttons.submit')
        "
        type="submit"
        :disabled="isSubmitting"
        :loading="isSubmitting"
        :pt="{
          root: '!rounded-xl !bg-primary dark:!bg-primary-200 !px-4 !py-2 !text-xl !text-light hover:!bg-primary-200 dark:hover:!bg-primary-300',
        }"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { PropType } from "vue";
import Input from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import DatePicker from "primevue/datepicker";
import { useI18n } from "vue-i18n";
import { useSendEmail } from "~/composables/useApi";
import { useToast } from "primevue/usetoast";
import type { EmailRequest, Room } from "~/types/hotel";

const props = defineProps({
  hotelId: {
    type: [String, Number],
    default: null,
  },
  hotelTitle: {
    type: String,
    default: "",
  },
  hotelEmail: {
    type: String,
    default: "",
  },
  rooms: {
    type: Array as PropType<Room[]>,
    default: () => [],
  },
});

const toast = useToast();
const name = ref("");
const email = ref("");
const message = ref("");
const phone = ref("");
const selectedRoom = ref<string | null>(null);
const date = ref<Date | Date[] | null>(null);
const isSubmitting = ref(false);
const honeypot = ref(""); // Honeypot field for spam protection
const submissionTime = ref(0); // Track form load time for timing-based protection
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

const formatDate = (dateVal: Date | Date[] | null): string => {
  if (!dateVal) return "";

  if (Array.isArray(dateVal)) {
    const start = dateVal[0] ? new Date(dateVal[0]).toLocaleDateString() : "";
    const end = dateVal[1] ? new Date(dateVal[1]).toLocaleDateString() : "";
    return start && end ? `${start} - ${end}` : start || end;
  }

  return new Date(dateVal).toLocaleDateString();
};

const submitForm = async (e: Event) => {
  e.preventDefault();

  errors.value = {
    name: "",
    email: "",
    message: "",
  };

  // Check if honeypot field is filled (bot detected)
  if (honeypot.value !== "") {
    console.log("Spam submission detected and blocked");
    // Pretend the form was submitted successfully to avoid alerting the bot
    toast.add({
      severity: "success",
      summary: $t("ContactForm.notifications.success.title"),
      detail: $t("ContactForm.notifications.success.message"),
      life: 5000,
    });
    return;
  }

  // Check if the form was submitted too quickly (likely a bot)
  const currentTime = Date.now();
  if (submissionTime.value === 0) {
    // First time user clicked submit, set the time
    submissionTime.value = currentTime;
    // Wait a tiny bit to confuse bots
    await new Promise((resolve) => setTimeout(resolve, 800));
  } else if (currentTime - submissionTime.value < 1500) {
    // Form was submitted too quickly
    console.log("Spam submission detected (too fast)");
    toast.add({
      severity: "success",
      summary: $t("ContactForm.notifications.success.title"),
      detail: $t("ContactForm.notifications.success.message"),
      life: 5000,
    });
    return;
  }

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
  isSubmitting.value = true;
  // Find selected room details
  const selectedRoomDetails = selectedRoom.value
    ? props.rooms.find((room) => room.id === selectedRoom.value)
    : null;

  // Create the formatted message with all details
  const formattedMessage = [
    `${$t("ContactForm.emailTemplate.name")}: ${name.value}`,
    `${$t("ContactForm.emailTemplate.email")}: ${email.value}`,
    phone.value
      ? `${$t("ContactForm.emailTemplate.phone")}: ${phone.value}`
      : null,
    date.value
      ? `${$t("ContactForm.emailTemplate.date")}: ${formatDate(date.value)}`
      : null,
    selectedRoomDetails
      ? `${$t("ContactForm.emailTemplate.roomType")}: ${selectedRoomDetails.name} (${selectedRoomDetails.max_occupants} ${selectedRoomDetails.max_occupants === 1 ? $t("Rooms.guest") : $t("Rooms.guests")})`
      : null,
    "",
    `${$t("ContactForm.emailTemplate.message")}:`,
    message.value,
  ]
    .filter(Boolean)
    .join("\n");

  // Create subject line with hotel title if available
  const subject = props.hotelTitle
    ? `${$t("ContactForm.emailTemplate.subjectPrefix")} ${props.hotelTitle}`
    : $t("ContactForm.emailTemplate.defaultSubject");

  // Determine recipient (fallback to default if hotel email not provided)
  const recipientList = props.hotelEmail
    ? [props.hotelEmail]
    : ["info@hotelswiss.com"]; // Fallback email

  // Prepare email request payload
  const emailData: EmailRequest = {
    subject,
    message: formattedMessage,
    from_email: email.value,
    recipient_list: recipientList,
  };
  try {
    // Send the email using the API
    await useSendEmail(emailData);

    // Show success notification
    toast.add({
      severity: "success",
      summary: $t("ContactForm.notifications.success.title"),
      detail: $t("ContactForm.notifications.success.message"),
      life: 5000,
    }); // Reset form
    name.value = "";
    email.value = "";
    message.value = "";
    phone.value = "";
    selectedRoom.value = null;
    date.value = null;
  } catch (error: any) {
    console.error("Error sending email:", error);

    let errorMessage = $t("ContactForm.notifications.error.message");
    let errorTitle = $t("ContactForm.notifications.error.title");

    // Check for authentication error
    if (
      error?.data?.error &&
      typeof error.data.error === "string" &&
      (error.data.error.includes("Authentication Required") ||
        error.data.error.includes("5.7.0"))
    ) {
      errorTitle = $t("ContactForm.notifications.authError.title");
      errorMessage = $t("ContactForm.notifications.authError.message");
    }

    // Show error notification
    toast.add({
      severity: "error",
      summary: errorTitle,
      detail: errorMessage,
      life: 7000,
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style>
.p-datepicker-input {
  background-color: var(--light-100);
  padding-left: 0.5rem;
  color: var(--primary-200);
}
</style>
