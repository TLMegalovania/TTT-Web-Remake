<script setup lang="ts">
import type { HubConnection } from "@microsoft/signalr";
import { ref } from "vue";
defineProps<{
  conn: HubConnection;
}>();
const input = ref<HTMLInputElement>();
const logIn = () => {
  console.log(input.value?.value);
};
</script>

<template>
  <div>
    <h1 class="text-gray-500 w-screen absolute top-1/3 text-center text-2xl">
      Enter your nickname...
    </h1>
    <input
      class="placeholder:italic bg-slate-300 absolute inset-x-1/4 inset-y-0 h-10 m-auto rounded-full p-4"
      placeholder="Noob"
      maxlength="20"
      ref="input"
    />
    <button
      class="bg-emerald-200 absolute bottom-1/3 text-center inset-x-0 m-auto hover:bg-green-500 transition-colors text-xl h-10 min-w-min max-w-sm w-1/6"
      @click="logIn"
    >
      Log in
    </button>
  </div>
</template>
