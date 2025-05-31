<template>
  <div class="min-h-screen bg-light dark:bg-dark-400">
    <!-- Header -->
    <div class="bg-primary py-12 text-center text-light dark:bg-dark-300">
      <div class="container mx-auto px-3">
        <h1 class="font-patuaOne text-4xl font-bold">
          {{ $t("Contact.title") }}
        </h1>
        <p class="mt-4 font-robotoRegular text-lg text-light/80">
          {{ $t("Contact.subtitle") }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-3 py-12">
      <div class="mx-auto max-w-6xl">
        <div class="grid gap-12 lg:grid-cols-2">
          <!-- Contact Form -->
          <div class="rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
            <h2
              class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
            >
              {{ $t("Contact.form.title") }}
            </h2>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    class="font-robotoMedium mb-2 block font-semibold text-dark dark:text-light"
                  >
                    {{ $t("Contact.form.firstName") }}
                  </label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-dark-400 dark:text-light"
                  />
                </div>
                <div>
                  <label
                    class="font-robotoMedium mb-2 block font-semibold text-dark dark:text-light"
                  >
                    {{ $t("Contact.form.lastName") }}
                  </label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-dark-400 dark:text-light"
                  />
                </div>
              </div>

              <div>
                <label
                  class="font-robotoMedium mb-2 block font-semibold text-dark dark:text-light"
                >
                  {{ $t("Contact.form.email") }}
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-dark-400 dark:text-light"
                />
              </div>

              <div>
                <label
                  class="font-robotoMedium mb-2 block font-semibold text-dark dark:text-light"
                >
                  {{ $t("Contact.form.subject") }}
                </label>
                <select
                  v-model="form.subject"
                  required
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-dark-400 dark:text-light"
                >
                  <option value="">
                    {{ $t("Contact.form.selectSubject") }}
                  </option>
                  <option
                    v-for="subject in subjects"
                    :key="subject.value"
                    :value="subject.value"
                  >
                    {{ $t(subject.label) }}
                  </option>
                </select>
              </div>

              <div>
                <label
                  class="font-robotoMedium mb-2 block font-semibold text-dark dark:text-light"
                >
                  {{ $t("Contact.form.message") }}
                </label>
                <textarea
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-dark-400 dark:text-light"
                  :placeholder="$t('Contact.form.messagePlaceholder')"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="font-robotoMedium hover:bg-primary-dark w-full rounded-lg bg-primary px-6 py-3 text-light transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span v-if="!isSubmitting">
                  {{ $t("Contact.form.submit") }}
                </span>
                <span v-else class="flex items-center justify-center">
                  <i class="pi pi-spin pi-spinner mr-2"></i>
                  {{ $t("Contact.form.submitting") }}
                </span>
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <!-- Contact Details -->
            <div class="rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
              <h2
                class="mb-6 font-patuaOne text-2xl font-bold text-dark dark:text-light"
              >
                {{ $t("Contact.info.title") }}
              </h2>
              <div class="space-y-6">
                <div class="flex items-start">
                  <div
                    class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <i class="pi pi-map-marker text-lg"></i>
                  </div>
                  <div>
                    <h3
                      class="font-robotoMedium mb-2 font-semibold text-dark dark:text-light"
                    >
                      {{ $t("Contact.info.address.title") }}
                    </h3>
                    <p
                      class="font-robotoRegular text-gray-600 dark:text-gray-400"
                    >
                      {{ $t("Contact.info.address.street") }}<br />
                      {{ $t("Contact.info.address.city") }}<br />
                      {{ $t("Contact.info.address.country") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <i class="pi pi-phone text-lg"></i>
                  </div>
                  <div>
                    <h3
                      class="font-robotoMedium mb-2 font-semibold text-dark dark:text-light"
                    >
                      {{ $t("Contact.info.phone.title") }}
                    </h3>
                    <p
                      class="font-robotoRegular text-gray-600 dark:text-gray-400"
                    >
                      <a href="tel:+41441234567" class="hover:text-primary">
                        {{ $t("Contact.info.phone.number") }}
                      </a>
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <i class="pi pi-envelope text-lg"></i>
                  </div>
                  <div>
                    <h3
                      class="font-robotoMedium mb-2 font-semibold text-dark dark:text-light"
                    >
                      {{ $t("Contact.info.email.title") }}
                    </h3>
                    <p
                      class="font-robotoRegular text-gray-600 dark:text-gray-400"
                    >
                      <a
                        href="mailto:info@hotelswiss.ch"
                        class="hover:text-primary"
                      >
                        {{
                          $t("Contact.info.email.address").replace("{at}", "@")
                        }}
                      </a>
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
                  >
                    <i class="pi pi-clock text-lg"></i>
                  </div>
                  <div>
                    <h3
                      class="font-robotoMedium mb-2 font-semibold text-dark dark:text-light"
                    >
                      {{ $t("Contact.info.hours.title") }}
                    </h3>
                    <p
                      class="font-robotoRegular text-gray-600 dark:text-gray-400"
                    >
                      {{ $t("Contact.info.hours.weekdays") }}<br />
                      {{ $t("Contact.info.hours.weekend") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- FAQ Link -->
            <div class="rounded-lg bg-gray-50 p-8 dark:bg-dark-400">
              <h3
                class="mb-4 font-patuaOne text-xl font-bold text-dark dark:text-light"
              >
                {{ $t("Contact.faq.title") }}
              </h3>
              <p
                class="mb-4 font-robotoRegular text-gray-600 dark:text-gray-400"
              >
                {{ $t("Contact.faq.content") }}
              </p>
              <NuxtLink
                to="/faq"
                class="font-robotoMedium inline-flex items-center text-primary hover:underline"
              >
                {{ $t("Contact.faq.visitFAQ") }}
                <i class="pi pi-arrow-right ml-2"></i>
              </NuxtLink>
            </div>

            <!-- Social Media -->
            <div class="rounded-lg bg-white p-8 shadow-md dark:bg-dark-300">
              <h3
                class="mb-4 font-patuaOne text-xl font-bold text-dark dark:text-light"
              >
                {{ $t("Contact.social.title") }}
              </h3>
              <p
                class="mb-6 font-robotoRegular text-gray-600 dark:text-gray-400"
              >
                {{ $t("Contact.social.content") }}
              </p>
              <div class="flex space-x-4">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-200 hover:bg-primary hover:text-light"
                >
                  <i :class="`pi pi-${social.icon} text-lg`"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "base",
});
const { t } = useI18n();

// SEO
useHead({
  title: t("Contact.pageTitle"),
  meta: [{ name: "description", content: t("Contact.pageDescription") }],
});

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
});

const isSubmitting = ref(false);

const subjects = [
  { value: "general", label: "Contact.subjects.general" },
  { value: "technical", label: "Contact.subjects.technical" },
  { value: "platform", label: "Contact.subjects.platform" },
  { value: "hotel-inquiry", label: "Contact.subjects.hotelInquiry" },
  { value: "partnership", label: "Contact.subjects.partnership" },
  { value: "feedback", label: "Contact.subjects.feedback" },
  { value: "other", label: "Contact.subjects.other" },
];

const socialLinks = [
  {
    name: "Facebook",
    icon: "facebook",
    url: "https://facebook.com/hotelswiss",
  },
  {
    name: "Twitter",
    icon: "twitter",
    url: "https://twitter.com/hotelswiss",
  },
  {
    name: "Instagram",
    icon: "instagram",
    url: "https://instagram.com/hotelswiss",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    url: "https://linkedin.com/company/hotelswiss",
  },
];

const submitForm = async () => {
  isSubmitting.value = true;

  try {
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reset form
    form.value = {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    };

    // Show success message (you can implement a toast notification here)
    console.log("Form submitted successfully");
  } catch (error) {
    console.error("Error submitting form:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
