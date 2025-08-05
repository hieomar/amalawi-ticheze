"use client";

import React from "react";
import { Video, Mic, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VideoChat } from "@/components/ui/video-chat";
import { VoiceChat } from "@/components/ui/voice-chat";
import { ChatWithMessages } from "@/types/chat";

interface ChatProps {
  activeChat: ChatWithMessages | null;
}

export function Chat({ activeChat }: ChatProps) {
  const [isVoiceOpen, setIsVoiceOpen] = React.useState(false);
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);
  const [messageInput, setMessageInput] = React.useState("");

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // Send message to backend here
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
      {/* XP Progress */}
      <div className="mb-6 bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Level Progress
          </span>
          <span className="text-xs text-muted-foreground">0 / 100 XP</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className="bg-primary h-2 rounded-full w-0 transition-all duration-300"></div>
        </div>
      </div>

      {/* Chat Wrapper */}
      <div className="flex-1 bg-card border border-border rounded-lg flex flex-col overflow-hidden">
        {/* Chat Header */}
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

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeChat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.senderId === "current-user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar>
                <AvatarFallback>{message.senderName[0]}</AvatarFallback>
              </Avatar>
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.senderId === "current-user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
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
      </div>

      <VoiceChat isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
      <VideoChat isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
}
