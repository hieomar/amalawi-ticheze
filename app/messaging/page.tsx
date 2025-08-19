"use client";

import Header from "@/components/ui/header";
import { Chat } from "@/components/ui/chat";
import { ChatList } from "@/components/ui/chat-list";
import { useState } from "react";
import { ChatWithMessages } from "@/types/chat";

// Demo data with messages
const demoChatData: ChatWithMessages[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    lastMessage: "When are you available for the lesson?",
    timestamp: "2m ago",
    unreadCount: 2,
    messages: [
      {
        id: "1",
        content: "Hi! I was wondering about your availability",
        senderId: "1",
        senderName: "Sarah Wilson",
        timestamp: "2:30 PM",
      },
      {
        id: "2",
        content: "I'd like to schedule a lesson this week",
        senderId: "1",
        senderName: "Sarah Wilson",
        timestamp: "2:31 PM",
      },
      {
        id: "3",
        content: "When are you available for the lesson?",
        senderId: "1",
        senderName: "Sarah Wilson",
        timestamp: "2:32 PM",
      },
    ],
  },
  {
    id: "2",
    name: "Alex Thompson",
    lastMessage: "Thanks for the help!",
    timestamp: "1h ago",
    messages: [
      {
        id: "1",
        content: "Hey, could you help me with pronunciation?",
        senderId: "2",
        senderName: "Alex Thompson",
        timestamp: "1:00 PM",
      },
      {
        id: "2",
        content: "Sure! I'd be happy to help",
        senderId: "current-user",
        senderName: "You",
        timestamp: "1:05 PM",
      },
      {
        id: "3",
        content: "Thanks for the help!",
        senderId: "2",
        senderName: "Alex Thompson",
        timestamp: "1:10 PM",
      },
    ],
  },
  {
    id: "3",
    name: "Language Partner",
    lastMessage: "Great progress on your pronunciation!",
    timestamp: "2h ago",
    messages: [
      {
        id: "1",
        content: "Let's practice some common phrases",
        senderId: "3",
        senderName: "Language Partner",
        timestamp: "11:00 AM",
      },
      {
        id: "2",
        content: "Great progress on your pronunciation!",
        senderId: "3",
        senderName: "Language Partner",
        timestamp: "11:30 AM",
      },
    ],
  },
];

export default function MessagingPage() {
  const [activeChat, setActiveChat] = useState<ChatWithMessages | null>(null);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 overflow-hidden">
        <div className="h-full flex gap-4">
          <div className="w-80 flex-shrink-0">
            <ChatList
              chats={demoChatData}
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
