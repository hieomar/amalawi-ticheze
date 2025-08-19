// components/ui/chat.tsx
"use client";

import React, { useEffect } from "react";
import { Video, Mic, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VideoChat } from "@/components/ui/video-chat";
import { VoiceChat } from "@/components/ui/voice-chat";
import { ChatWithMessages, Message } from "@/types/chat";
import { useSocket } from "@/hooks/useSocket";

interface ChatProps {
  activeChat: ChatWithMessages | null;
}

export function Chat({ activeChat }: ChatProps) {
  const [isVoiceOpen, setIsVoiceOpen] = React.useState(false);
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const [messageInput, setMessageInput] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>(
    activeChat?.messages ?? [],
  );

  const userId = "current-user"; // TODO: replace with real auth user id
  const userName = "You"; // TODO: replace with real display name
  const { socket, joinRoom, sendMessage } = useSocket(userId);

  useEffect(() => {
    if (activeChat) {
      joinRoom(activeChat.id);
      setMessages(activeChat.messages);
    }
  }, [activeChat, joinRoom]);

  useEffect(() => {
    socket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeChat) return;

    const outgoing: Message = {
      id: Date.now().toString(), // optimistic id; server can overwrite
      content: messageInput,
      senderId: userId,
      senderName: userName,
      timestamp: new Date().toLocaleString(),
      // You can include room id separately on the wire if your server expects it;
      // here you're sending full Message; adjust server accordingly.
    };

    sendMessage(outgoing);
    setMessageInput("");
  };

  if (!activeChat) {
    return (
      <div className="h-full flex items-center justify-center bg-card border border-border rounded-lg">
        <div className="text-center text-muted-foreground">
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {activeChat.name}
            </h1>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsVoiceOpen(true)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Mic className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <Video className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id ?? `msg-${index}`}
            className={`flex items-start gap-3 ${message.senderId === userId ? "flex-row-reverse" : ""}`}
          >
            <Avatar>
              <AvatarFallback>
                {(message.senderName?.[0] ?? "U").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                message.senderId === userId
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {typeof message.timestamp === "number"
                  ? new Date(message.timestamp).toLocaleTimeString()
                  : message.timestamp || new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-muted px-3 py-2 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          🏆 Earn +10 XP for each message sent
        </div>
      </div>

      <VoiceChat isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
      <VideoChat isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
}
// "use client";

// import React, { useEffect } from "react";
// import { Video, Mic, Send } from "lucide-react";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { VideoChat } from "@/components/ui/video-chat";
// import { VoiceChat } from "@/components/ui/voice-chat";
// import { ChatWithMessages, Message } from "@/types/chat";
// import { useSocket } from "@/hooks/useSocket";

// interface ChatProps {
//   activeChat: ChatWithMessages | null;
// }

// export function Chat({ activeChat }: ChatProps) {
//   const [isVoiceOpen, setIsVoiceOpen] = React.useState(false);
//   const [isVideoOpen, setIsVideoOpen] = React.useState(false);
//   const [messageInput, setMessageInput] = React.useState("");
//   const [messages, setMessages] = React.useState(activeChat?.messages ?? []);

//   const userId = "current-user"; // Replace with auth userId
//   const { socket, joinRoom, sendMessage } = useSocket(userId);

//   useEffect(() => {
//     if (activeChat) {
//       joinRoom(activeChat.id);
//       setMessages(activeChat.messages);
//     }
//   }, [activeChat]);

//   useEffect(() => {
//     if (!socket) return;

//     socket.on("message", (msg: Message) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off("message");
//     };
//   }, [socket]);

//   const handleSendMessage = () => {
//     if (!messageInput.trim() || !activeChat) return;
//     sendMessage({
//       id: activeChat.id,
//       senderId: userId,
//       content: messageInput,
//       senderName: activeChat.id,
//       timestamp: Date.now().toLocaleString(),
//     });
//     setMessageInput("");
//   };

//   if (!activeChat) {
//     return (
//       <div className="h-full flex items-center justify-center bg-card border border-border rounded-lg">
//         <div className="text-center text-muted-foreground">
//           <p>Select a chat to start messaging</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full flex flex-col">
//       {/* header & controls same as before... */}

//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id || Math.random()}
//             className={`flex items-start gap-3 ${
//               message.senderId === userId ? "flex-row-reverse" : ""
//             }`}
//           >
//             <Avatar>
//               <AvatarFallback>{message.senderName?.[0] ?? "U"}</AvatarFallback>
//             </Avatar>
//             <div
//               className={`p-3 rounded-lg max-w-[80%] ${
//                 message.senderId === userId
//                   ? "bg-primary text-primary-foreground"
//                   : "bg-muted text-foreground"
//               }`}
//             >
//               <p className="text-sm">{message.content || message.content}</p>
//               <span className="text-xs opacity-70 mt-1 block">
//                 {message.timestamp || new Date().toLocaleTimeString()}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input Area */}
//       <div className="p-4 border-t border-border">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={messageInput}
//             onChange={(e) => setMessageInput(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 bg-muted px-3 py-2 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//             onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm transition-colors"
//           >
//             <Send className="w-4 h-4" />
//           </button>
//         </div>
//         <div className="mt-2 text-xs text-muted-foreground">
//           🏆 Earn +10 XP for each message sent
//         </div>
//       </div>

//       <VoiceChat isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
//       <VideoChat isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
//     </div>
//   );
// }
