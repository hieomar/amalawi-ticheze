"use client";

import React, { useEffect, useState } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatWithMessages } from "@/types/chat";
import { useSocket } from "@/hooks/useSocket";
import { User } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/states/auth.state";

interface ChatListProps {
  chats: ChatWithMessages[];
  activeChat: ChatWithMessages | null;
  onChatSelect: (chat: ChatWithMessages) => void;
}

export function ChatList({ chats, activeChat, onChatSelect }: ChatListProps) {
  const router = useRouter();
  const [isSearchingMatch, setIsSearchingMatch] = useState(false);
  const user = useAuthStore((state) => state.user);

  if (!user?._id) {
    router.push("/login");
    return null;
  }
  const { findMatch, socket } = useSocket(user._id);

  const handleStartNewChat = () => {
    setIsSearchingMatch(true);
    findMatch();
  };

  // Listen for the match
  useEffect(() => {
    // socket.on("match-found", ({ userId: matchedUserId }) => {
    //   setIsSearchingMatch(false);
    //   console.log("Matched with:", matchedUserId);
    //   // Here you would create a new chat room with matchedUserId
    //   // and open the Chat component
    // });
    //
    findMatch();
    setIsSearchingMatch(false);

    socket.on("no-match", () => {
      setIsSearchingMatch(false);
      alert("No users online at the moment. Try again later.");
    });

    return () => {
      socket.off("match-found");
      socket.off("no-match");
    };
  }, [socket]);

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg overflow-hidden">
      {/* New Chat Button */}
      <div className="p-4 border-b border-border">
        <button
          onClick={handleStartNewChat}
          disabled={isSearchingMatch}
          className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
        >
          {isSearchingMatch ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Looking for chat partners...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Start New Chat
            </>
          )}
        </button>
      </div>

      {/* Search Header */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full bg-muted pl-9 pr-4 py-2 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Searching State */}
      {isSearchingMatch && (
        <div className="p-4 bg-muted/50 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Finding a match...</p>
              <p className="text-xs text-muted-foreground">
                Searching for available chat partners
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className={`w-full p-4 flex items-center gap-3 transition-colors border-b border-border last:border-0
                            ${
                              activeChat?.id === chat.id
                                ? "bg-accent"
                                : "hover:bg-accent/50"
                            }`}
          >
            <Avatar>
              {chat.avatarUrl && <AvatarImage src={chat.avatarUrl} />}
              <AvatarFallback>{chat.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{chat.name}</span>
                <span className="text-xs text-muted-foreground">
                  {chat.timestamp}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {chat.lastMessage}
              </p>
            </div>
            {chat.unreadCount && (
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-primary-foreground font-medium">
                  {chat.unreadCount}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
