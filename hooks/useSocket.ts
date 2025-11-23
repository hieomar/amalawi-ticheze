// hooks/useSocket.ts
"use client";

import { useEffect } from "react";
import { ChatWithMessages, Message } from "@/types/chat";
import { socket } from "@/lib/socket";

export function useSocket(userId: string) {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("register", userId);

    // Cleanup must return void or a destructor function
    return () => {
      // Do NOT disconnect globally — that breaks shared socket usage
      // Only cleanup local listeners if you want
    };
  }, [userId]);

  const numberOfUsers = () => {
    socket.emit("number-of-online-users");
  };

  const getNumberOfOnlineUsers = (callback: (count: number) => void) => {
    socket.on("number-of-online-users", callback);
  };

  const cleanup = (event: string) => {
    socket.off(event);
  };

  const joinRoom = (roomId: string) => {
    socket.emit("join", roomId);
  };

  const sendMessage = (message: Message) => {
    socket.emit("message", message);
  };

  const findMatch = () => {
    socket.emit("find-match", userId);
  };

  const getChatList = () => {
    socket.emit("get-chat-list", userId);
  };

  const chatListResponse = (
    callback: (chatList: ChatWithMessages[]) => void,
  ) => {
    socket.on("chat-list", callback);
  };

  return {
    socket,
    cleanup,
    joinRoom,
    sendMessage,
    findMatch,
    getChatList,
    chatListResponse,
    numberOfUsers,
    getNumberOfOnlineUsers,
  };
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
