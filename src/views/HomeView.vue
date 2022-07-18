<script setup lang="ts">
import { conn } from "@/logic/Connection";
import { delay } from "@/utils/Delay";
import { nicknameKey, PlayerState, playerStateKey } from "@/Type";
import { computed, inject, ref, type Ref } from "vue";
import Error from "../components/Error.vue";
import router from "@/router";
console.log("homeview");
conn.stop();
const playerState = inject<Ref<PlayerState>>(playerStateKey);
const nickname = inject<Ref<string>>(nicknameKey);
if (!(playerState && nickname)) throw "not injected";
const input = ref<HTMLInputElement>();
const connecting = ref(false);
const buttonClass = computed(() => {
  if (connecting.value)
    return ["bg-emerald-100", "cursor-wait", "animate-spin"];
  else return ["bg-emerald-200", "hover:bg-green-500", "transition-colors"];
});
const connErr = ref<string | null>(null);
const logIn = () => {
  connecting.value = true;
  conn
    .start()
    .then(() => conn.invoke("login", input.value?.value ?? "Noob"))
    .then(() => {
      playerState.value = PlayerState.Online;
      nickname.value = input.value?.value ?? "Noob";
    })
    .then(() => router.push("/hall"))
    .catch(async (reason) => {
      console.warn(reason);
      connecting.value = false;
      connErr.value = reason;
      await delay(5000);
      connErr.value = null;
    });
};
</script>

<template>
  <Error :err="connErr"></Error>
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
      class="absolute bottom-1/3 text-center inset-x-0 m-auto text-xl h-10 min-w-fit max-w-sm w-1/6"
      @click="logIn"
      :disabled="connecting"
      :class="buttonClass"
    >
      {{ connecting ? "Connecting..." : "Log in" }}
    </button>
  </div>
</template>
