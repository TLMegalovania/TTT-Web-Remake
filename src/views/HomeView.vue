<script setup lang="ts">
import { conn } from "@/logic/Connection";
import { errMsgKey, nicknameKey } from "@/Type";
import { computed, inject, ref, type Ref } from "vue";
import router from "@/router";

conn.stop();
// const playerState = inject<Ref<PlayerState>>(playerStateKey)!;
const nickname = inject<Ref<string>>(nicknameKey)!;
const errMsg = inject<Ref<string | undefined>>(errMsgKey)!;

const input = ref<HTMLInputElement>();
const connecting = ref(false);

const logIn = () => {
  connecting.value = true;
  conn
    .start()
    .then(() => conn.invoke("login", input.value?.value ?? "Noob"))
    .then(() => {
      // playerState.value = PlayerState.Online;
      nickname.value = input.value?.value ?? "Noob";
      return router.push("/hall");
    })
    .catch(() => {
      errMsg.value = "Internal Server Error";
    })
    .finally(() => (connecting.value = false));
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
      class="absolute bottom-1/3 text-center inset-x-0 m-auto text-xl h-10 min-w-fit max-w-sm w-1/6 bg-emerald-200 hover:bg-green-500 transition-colors disabled:cursor-wait disabled:animate-spin"
      @click="logIn"
      :disabled="connecting"
    >
      {{ connecting ? "Connecting..." : "Log in" }}
    </button>
  </div>
</template>
