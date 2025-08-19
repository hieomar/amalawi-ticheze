// hooks/useSocket.ts
"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { Message } from "@/types/chat";

export function useSocket(userId: string) {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    // Identify the user to the server
    socket.emit("register", userId);

    // NOTE: don't disconnect globally here; other components may use the same socket
    return () => {
      // Optional: emit a presence hint or leave-room here if you track it per page
      // socket.emit("leave", userId);
    };
  }, [userId]);

  const joinRoom = (roomId: string) => {
    socket.emit("join", roomId);
  };

  const sendMessage = (message: Message) => {
    socket.emit("message", message);
  };

  return { socket, joinRoom, sendMessage };
}
// "use client";

// import { useEffect } from "react";
// import { socket } from "../lib/socket";
// import { Message } from "@/types/chat";

// export function useSocket(userId: string) {
//   useEffect(() => {
//     if (!socket) return;

//     if (!socket.connected) {
//       socket.connect();
//     }

//     // Identify the user to the server
//     socket.emit("register", userId); // you defined register as (userId: string), not object

//     return () => {
//       socket.emit("leave", userId);
//       // socket.disconnect();
//     };
//   }, [userId]);

//   const joinRoom = (roomId: string) => {
//     socket.emit("join", roomId);
//   };

//   const sendMessage = (message: Message) => {
//     socket.emit("message", message);
//   };

//   return { socket, joinRoom, sendMessage };
// }
