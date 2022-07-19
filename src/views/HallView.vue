<script setup lang="ts">
import { conn } from "@/logic/Connection";
import router from "@/router";
import { nicknameKey, type RoomInfo, RoomState } from "@/Type";
import { inject, onUnmounted, ref, shallowRef, type Ref } from "vue";

const nickname = inject<Ref<string>>(nicknameKey)!;
const rooms = shallowRef<RoomInfo[]>();
const connecting = ref(false);
conn.on("gotRooms", (_rooms) => (rooms.value = _rooms));
onUnmounted(() => {
  conn.off("gotRooms");
});
const joinRoom = (id: string) => {
  router.push(`/room/${id}`);
};
const input = ref<HTMLInputElement>();
const hostGame = () => {
  connecting.value = true;
  conn
    .invoke("createRoom")
    .then((id: string) => {
      router.push(`/room/${id}`);
    })
    .finally(() => (connecting.value = false));
};
</script>

<template>
  <div class="px-7 py-2 w-screen grid grid-cols-3 gap-3">
    <h2 class="text-center text-2xl col-span-full">Hello, {{ nickname }}!</h2>
    <input
      class="p-2 col-span-2 placeholder:italic"
      :placeholder="`${nickname}'s Room`"
      ref="input"
    />
    <button
      class="col-start-3 bg-cyan-400 hover:bg-cyan-600 transition-colors text-center p-2 text-lg"
      @click="hostGame"
      :disabled="connecting"
    >
      Host
    </button>
    <div class="text-center">Room</div>
    <div class="text-center">Host</div>
    <div class="text-center">State</div>
  </div>
  <div
    v-for="room in rooms"
    class="px-7 py-2 w-screen grid grid-cols-3 gap-5 hover:shadow-md transition-shadow"
    @click="joinRoom(room.id)"
    :key="room.id"
  >
    <div class="p-3">{{ room.name }}</div>
    <div class="p-3">{{ room.host }}</div>
    <div class="p-3">{{ RoomState[room.state] }}</div>
  </div>
</template>
