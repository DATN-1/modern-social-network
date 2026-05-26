export type User = {
  id: string;
  name: string;
  username: string;
  avatarColor: string;
  bio?: string;
  coverColor?: string;
  online?: boolean;
  verified?: boolean;
};

export type Reaction = "like" | "love" | "haha" | "wow" | "sad" | "angry";

export type Post = {
  id: string;
  authorId: string;
  text?: string;
  imageGradient?: string;
  imageEmoji?: string;
  imageRatio?: "wide" | "square" | "tall";
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
  topReactions?: Reaction[];
  tags?: string[];
};

export type Story = {
  id: string;
  authorId: string;
  gradient: string;
  emoji: string;
  seen?: boolean;
};

export type Comment = {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  createdAt: string;
};

export type ChatThread = {
  id: string;
  participantId: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
};

export type Message = {
  id: string;
  threadId: string;
  authorId: string;
  text: string;
  createdAt: string;
};

export type Notification = {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "tag";
  actorId: string;
  text: string;
  createdAt: string;
  read?: boolean;
};
