enum PlayerState {
  Offline,
  Online,
  NotReady,
  Ready,
  InGame,
  Observer,
}

enum RoomState {
  Available,
  Full,
  InGame,
}

type RoomInfo = {
  id: string;
  name: string;
  host: string;
  state: RoomState;
};

const playerStateKey = Symbol(),
  nicknameKey = Symbol();

export { PlayerState, playerStateKey, nicknameKey, RoomState };
export type { RoomInfo };
