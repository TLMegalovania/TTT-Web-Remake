<script setup lang="ts">
import { provide, ref, watch } from "vue";
import { RouterView } from "vue-router";
import {  errMsgKey,  nicknameKey,} from "./Type";
import Logo from "./components/Logo.vue";
import Error from "./components/Error.vue";
import { delay } from "./utils/Delay";

const nickname = ref("Noob");
provide(nicknameKey, nickname);
const errMsg = ref<string>();
provide(errMsgKey, errMsg);
watch(errMsg, async (nv) => {
  if (!nv) return;
  await delay(3000);
  errMsg.value = undefined;
});
</script>

<template>
  <div class="bg-slate-400 h-screen">
    <Logo />
    <Error v-if="errMsg" :err="errMsg" />
    <RouterView />
  </div>
</template>
