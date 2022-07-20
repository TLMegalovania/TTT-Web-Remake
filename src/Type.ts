enum PlayerType {
  None,
  Host,
  Guest,
  Observer,
}

enum RoomState {
  Available,
  Full,
  InGame,
}

enum PieceType {
  Null,
  Black,
  White,
}

enum WinType {
  Null,
  Tie,
  Black,
  White,
  Flee,
}

type RoomInfo = {
  Id: string;
  Name: string;
  Player1: string;
  Player2: string;
  State: RoomState;
};

type RoomDetail = {
  Name: string;
  Player1: string;
  Player2: string;
  P1Ready: boolean;
  P2Ready: boolean;
};

type BoardInfo = {
  Board: PieceType[];
  Turn: PieceType;
  Result: WinType;
};

const nicknameKey = Symbol(),
  errMsgKey = Symbol();

export { nicknameKey, RoomState, errMsgKey, PlayerType, PieceType, WinType };
export type { RoomInfo, RoomDetail, BoardInfo };
