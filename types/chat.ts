export type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatarUrl?: string;
  unreadCount?: number;
};

export type Message = {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  senderName: string;
};

export type ChatWithMessages = Chat & {
  messages: Message[];
};
