<template>
  <div class="flex h-screen w-screen flex-col items-center justify-start">
    <img
      class="z-10 w-[160px] translate-y-1/2 rounded-full shadow-md shadow-primary"
      src="../assets/images/dummy_logo.svg"
      alt=""
    />
    <CommonBackdrop
      class="flex h-fit w-5/6 flex-col justify-around shadow-md shadow-primary md:max-w-md"
    >
      <form
        class="mt-24 flex flex-col gap-6 rounded-lg p-4 text-primary-200 md:mt-20"
        @submit.prevent="submitLogIn"
      >
        <input
          id="email"
          v-model="email"
          placeholder="Email / Username"
          class="rounded-md p-2 text-base placeholder:text-left placeholder:text-base"
        />

        <Password
          v-model="password"
          :feedback="false"
          :toggle-mask="true"
          placeholder="Password"
          input-class="p-2 rounded-md w-full"
          class="text-base placeholder:text-center placeholder:text-base"
        />
        <div class="flex justify-between py-4">
          <div class="flex items-center justify-center gap-2">
            <Checkbox v-model="checked" :binary="true" />
            <span class="text-light">Remember Me</span>
          </div>
          <NuxtLink to="/password_reset">
            <span class="text-light text-sm italic">Forgot password?</span>
          </NuxtLink>
        </div>
        <Button
          type="submit"
          label="LOG IN"
          class="bg-white p-2 text-primary-200"
          text
          raised
        />
      </form>
    </CommonBackdrop>
  </div>
</template>

<script setup lang="ts">
import { checkPrime } from "crypto";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const checked = ref(false);
const submitLogIn = () => {
  console.log(
    "email:" + email.value,
    "password:" + password.value,
    "remember me:" + checked.value,
  );
};
</script>

<style scoped></style>
