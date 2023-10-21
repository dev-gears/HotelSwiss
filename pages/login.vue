<template>
  <div
    class="flex h-screen w-screen flex-col items-center justify-start bg-tertiary"
  >
    <img
      class="z-10 w-[160px] translate-y-1/2 rounded-full"
      src="../assets/images/dummy_logo.svg"
      alt=""
    />

    <form
      class="flex h-3/6 w-5/6 flex-col justify-around rounded-lg bg-primary-300 p-4 pt-20 md:max-w-md"
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
      <Button type="submit" label="LOG IN" class="bg-white p-2" text raised />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const email = ref("");
const password = ref("");

const submitLogIn = () => {
  console.log("email:" + email.value, "password:" + password.value);
};
</script>

<style scoped></style>
