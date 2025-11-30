import { create } from "zustand";

interface MatchState {
  roomId: string | null;
  matchedUsers: string[];
  message: string | null;

  // New additions
  activeChatRoom: string | null;
  match: {
    roomId: string | null;
    users: string[];
  } | null;

  setMatch: (roomId: string, users: string[]) => void;
  setNoMatch: (msg: string) => void;
  setActiveChatRoom: (roomId: string | null) => void;
}

export const useMatchStore = create<MatchState>((set) => ({
  roomId: null,
  matchedUsers: [],
  message: null,

  activeChatRoom: null,
  match: null,

  setMatch: (roomId, users) =>
    set({
      roomId,
      matchedUsers: users,
      activeChatRoom: roomId,
      message: null,
      match: { roomId, users },
    }),

  setNoMatch: (msg) =>
    set({
      roomId: null,
      matchedUsers: [],
      activeChatRoom: null,
      match: null,
      message: msg,
    }),

  setActiveChatRoom: (roomId) =>
    set({
      activeChatRoom: roomId,
    }),
}));
