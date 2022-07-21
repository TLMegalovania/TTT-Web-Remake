<script setup lang="ts">
import {
  errMsgKey,
  PieceType,
  PlayerType,
  WinType,
  type BoardInfo,
  type RoomDetail,
} from "@/Type";
import { inject, ref, type Ref, onUnmounted, shallowRef, computed } from "vue";
import { conn } from "@/logic/Connection";
import router from "@/router";

onUnmounted(() => {
  conn.off("gotRoom");
  conn.off("gotBoard");
  conn.off("joinedRoom");
  conn.invoke("leaveRoom");
});

const props = defineProps<{
  id: number;
}>();
const errMsg = inject<Ref<string | undefined>>(errMsgKey)!;
const playerType = ref(PlayerType.None);

conn.invoke("joinRoom", props.id).catch((reason: Error) => {
  router.push("/hall");
  errMsg.value = reason.message;
});
conn.on("joinedRoom", (t: PlayerType) => {
  playerType.value = t;
});

const roomDetail = ref<RoomDetail>();
const turn = ref(PlayerType.None);
const startOrJoin = () => {
  if (playerType.value != PlayerType.Observer) {
    conn.invoke("startGame");
  } else {
    conn.invoke("joinRoom", props.id);
  }
};
conn.on("gotRoom", (detail: RoomDetail) => {
  roomDetail.value = detail;
});

const board = shallowRef<PieceType[]>();
const result = ref(WinType.Null);
const go = (index: number) => {
  conn.invoke("go", index);
};
conn.on("gotBoard", (b: BoardInfo) => {
  board.value = b.Board;
  turn.value =
    b.Turn == PieceType.Black
      ? PlayerType.Host
      : b.Turn == PieceType.White
      ? PlayerType.Guest
      : PlayerType.None;
  result.value = b.Result;
  console.log(
    !(roomDetail.value?.P1Ready && roomDetail.value.P2Ready) ||
      playerType != turn
  );
});

const ready = computed(() =>
  playerType.value == PlayerType.Host
    ? roomDetail.value?.P1Ready
    : playerType.value == PlayerType.Guest
    ? roomDetail.value?.P2Ready
    : false
);
</script>

<template>
  <div class="grid px-6 grid-cols-4">
    <div class="col-span-1 text-gray-800 text-lg shadow-md shadow-slate-200">
      {{ roomDetail?.P1Ready ? "⚫" : "" }} {{ roomDetail?.Player1 }}
    </div>
    <div
      class="col-span-1 text-lg bg-gradient-to-r from-gray-800 to-gray-200 text-green-600"
    >
      {{ id }}
    </div>
    <div class="col-span-1 text-gray-200 text-lg shadow-md shadow-slate-800">
      {{ roomDetail?.P2Ready ? "⚪" : "" }} {{ roomDetail?.Player2 }}
    </div>
    <button
      v-if="
        !(
          (roomDetail?.P1Ready && roomDetail.P2Ready) ||
          (playerType == PlayerType.Observer &&
            roomDetail?.Player1 != '' &&
            roomDetail?.Player2 != '')
        )
      "
      class="col-span-1 text-center p-1 bg-pink-300 hover:bg-pink-600 transition-colors"
      @click="startOrJoin"
    >
      {{
        playerType == PlayerType.Observer ? "Join" : ready ? "Unready" : "Ready"
      }}
    </button>
  </div>
  <div
    class="w-96 h-96 grid grid-cols-5 grid-rows-5 divide-x divide-y divide-gray-700"
  >
    <button
      v-for="(piece, index) in board"
      class="text-center text-base cursor-pointer disabled:cursor-not-allowed"
      :disabled="
        !(roomDetail?.P1Ready && roomDetail.P2Ready) ||
        playerType != turn ||
        piece != PieceType.Null
      "
      @click="go(index)"
    >
      {{
        piece == PieceType.Black ? "⚫" : piece == PieceType.White ? "⚪" : ""
      }}
    </button>
  </div>
  <div
    class="h-96 text-center text-lg font-bold p-5"
    v-if="roomDetail?.P1Ready && roomDetail.P2Ready"
  >
    Now<br />{{
      turn == PlayerType.Host ? "⚫" : turn == PlayerType.Guest ? "⚪" : ""
    }}
  </div>
  <div
    class="h-96 text-center text-lg font-bold p-5"
    v-else-if="result != WinType.Null"
  >
    {{
      result == WinType.Flee
        ? roomDetail?.Player1 == ""
          ? "⚫"
          : roomDetail?.Player2 == ""
          ? "⚪"
          : ""
        : result == WinType.Black
        ? "⚫"
        : result == WinType.White
        ? "⚪"
        : ""
    }}
    <br />
    {{
      result == WinType.Tie ? "Tie" : result == WinType.Flee ? "Flee" : "Win"
    }}
  </div>
</template>
