// hooks/useSocket.ts
"use client";

import { useEffect } from "react";
import { ChatWithMessages, Message } from "@/types/chat";
import { socket } from "@/lib/socket";
import { useMatchStore } from "@/states/match.store";

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

  const register = (userId: string) => {
    socket.emit("register", userId);
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

    socket.off("match-found");
    socket.off("no-match");

    // When a match is found
    socket.on("match-found", ({ roomId, users }) => {
      console.log("Match found:", roomId, users);

      // 1️⃣ Store match globally (Zustand)
      useMatchStore.getState().setMatch(roomId, users);

      // 2️⃣ Automatically join the room
      socket.emit("join", roomId);

      // 3️⃣ Tell the UI to open the chat screen
      useMatchStore.getState().setActiveChatRoom(roomId);
    });

    // When no match found
    socket.on("no-match", (msg: { message: string }) => {
      useMatchStore.getState().setNoMatch(msg.message);
    });
  };
  // const findMatch = () => {
  //   socket.emit("find-match", userId);

  //   socket.off("match-found");
  //   socket.off("no-match");

  //   // Match found
  //   socket.on("match-found", ({ roomId, users }) => {
  //     alert(`Match found! Room ID: ${roomId}`);
  //     useMatchStore.getState().setMatch(roomId, users);
  //   });

  //   // No match
  //   socket.on("no-match", (msg: { message: string }) => {
  //     alert(`No match found: ${msg.message}`);
  //     useMatchStore.getState().setNoMatch(msg.message);
  //   });
  // };

  // const noMatch = (callback: (message: string) => void) => {
  //   socket.on("no-match", callback);
  // };

  // const matchFound = (callback: (roomId: string, users: string[]) => void) => {
  //   socket.on("match-found", callback);
  // };

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
    register,
    cleanup,
    joinRoom,
    sendMessage,
    findMatch,
    // noMatch,
    // matchFound,
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
