"use client";

import Header from "@/components/ui/header";
import { Chat } from "@/components/ui/chat";
import { ChatList } from "@/components/ui/chat-list";
import { useEffect, useState } from "react";
import { ChatWithMessages } from "@/types/chat";
import { useSocket } from "@/hooks/useSocket";
import { useAuthStore } from "@/states/auth.state";
import { useRouter } from "next/navigation";

export default function MessagingPage() {
  const [activeChat, setActiveChat] = useState<ChatWithMessages | null>(null);
  const [chats, setChats] = useState<ChatWithMessages[]>([]);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  // Always call this hook — even if user is null
  const { getChatList, chatListResponse, cleanup } = useSocket(user?._id || "");

  // Redirect effect (safe)
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;

    getChatList();
    chatListResponse((chatList) => {
      setChats(chatList);
    });

    return () => cleanup("chat-list");
  }, [user]);

  // Render a placeholder while redirecting or loading user
  if (!user) {
    return <div className="p-6 text-center">Redirecting...</div>;
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden">
        <div className="h-full flex gap-4">
          <div className="w-80 flex-shrink-0">
            <ChatList
              chats={chats}
              activeChat={activeChat}
              onChatSelect={setActiveChat}
            />
          </div>

          <div className="flex-1 h-full">
            <Chat activeChat={activeChat} />
          </div>
        </div>
      </main>
    </div>
  );
}
