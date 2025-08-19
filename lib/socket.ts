import { Message } from "@/types/chat";
import { io, Socket } from "socket.io-client";

interface ServerToClientEvents {
  "user-online": (userId: string) => void;
  "user-offline": (userId: string) => void;
  "user-connected": (socketId: string) => void;
  message: (msg: Message) => void; // match your Message type
  offer: (offer: RTCSessionDescriptionInit) => void;
  answer: (answer: RTCSessionDescriptionInit) => void;
  "ice-candidate": (candidate: RTCIceCandidateInit) => void;
}

interface ClientToServerEvents {
  register: (userId: string) => void;
  join: (roomId: string) => void;
  message: (msg: Message) => void; // sending full Message object
  offer: (data: { offer: RTCSessionDescriptionInit; roomId: string }) => void;
  answer: (data: { answer: RTCSessionDescriptionInit; roomId: string }) => void;
  "ice-candidate": (data: {
    candidate: RTCIceCandidateInit;
    roomId: string;
  }) => void;
}

const URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

// Singleton, strongly-typed socket
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  URL,
  {
    autoConnect: false,
  },
);

// import { Message } from "@/types/chat";
// import { io, Socket } from "socket.io-client";

// interface ServerToClientEvents {
//   "user-online": (userId: string) => void;
//   "user-offline": (userId: string) => void;
//   "user-connected": (socketId: string) => void;
//   message: (data: { sender: string; text: string }) => void;
//   offer: (offer: RTCSessionDescriptionInit) => void;
//   answer: (answer: RTCSessionDescriptionInit) => void;
//   "ice-candidate": (candidate: RTCIceCandidateInit) => void;
//   leave: (userId: string) => void;
// }

// interface ClientToServerEvents {
//   register: (userId: string) => void;
//   join: (roomId: string) => void;
//   message: (msg: Message) => void;
//   offer: (data: { offer: RTCSessionDescriptionInit; roomId: string }) => void;
//   answer: (data: { answer: RTCSessionDescriptionInit; roomId: string }) => void;
//   "ice-candidate": (data: {
//     candidate: RTCIceCandidateInit;
//     roomId: string;
//   }) => void;
//   leave: (userId: string) => void;
// }

// const URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

// // Strongly typed socket
// export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
//   URL,
//   {
//     autoConnect: false, // connect manually when ready
//   },
// );
