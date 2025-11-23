import { ChatWithMessages, Message } from "@/types/chat";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  connection: () => void;
  "find-match": (userId: string) => void;
  "match-found": (userId: string) => void;
  "no-match": () => void;
  "user-online": (userId: string) => void;
  "user-offline": (userId: string) => void;
  "user-connected": (socketId: string) => void;
  message: (msg: Message) => void; // match your Message type
  offer: (offer: RTCSessionDescriptionInit) => void;
  answer: (answer: RTCSessionDescriptionInit) => void;
  "ice-candidate": (candidate: RTCIceCandidateInit) => void;
  "number-of-online-users": (count: number) => void;
  "chat-list": (chatList: ChatWithMessages[]) => void;
}

interface ClientToServerEvents {
  connection: () => void;
  "find-match": (userId: string) => void;
  register: (userId: string) => void;
  join: (roomId: string) => void;
  message: (msg: Message) => void; // sending full Message object
  offer: (data: { offer: RTCSessionDescriptionInit; roomId: string }) => void;
  answer: (data: { answer: RTCSessionDescriptionInit; roomId: string }) => void;
  "ice-candidate": (data: {
    candidate: RTCIceCandidateInit;
    roomId: string;
  }) => void;
  "number-of-online-users": () => number;
  "user-disconnected": (socketId: string) => void;
  "get-chat-list": (userId: string) => void;
}

const URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

// Singleton, strongly-typed socket
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  URL,
  {
    autoConnect: false,
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  },
);
