<script setup lang="ts">
import { provide, ref, watch } from "vue";
import { RouterView } from "vue-router";
import {
  errMsgKey,
  nicknameKey,
  // PlayerState,
  //playerStateKey,
  // PlayerType,
  //playerTypeKey,
  // roomInfoKey,
  //type RoomInfo,
} from "./Type";
import Logo from "./components/Logo.vue";
import Error from "./components/Error.vue";
import { delay } from "./utils/Delay";

// const playerState = ref(PlayerState.Offline);
// provide(playerStateKey, playerState);
const nickname = ref("Noob");
provide(nicknameKey, nickname);
const errMsg = ref<string>();
provide(errMsgKey, errMsg);
watch(errMsg, async (nv) => {
  if (!nv) return;
  await delay(3000);
  errMsg.value = undefined;
});
// const playerType = ref(PlayerType.None);
// provide(playerTypeKey, playerType);
// const roomInfo = ref<RoomInfo | null>(null);
// provide(roomInfoKey, roomInfo);
</script>

<template>
  <div class="bg-slate-400 h-screen">
    <Logo />
    <Error v-if="errMsg" :err="errMsg" />
    <RouterView />
  </div>
</template>
