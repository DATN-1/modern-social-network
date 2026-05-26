import type {
  ChatThread,
  Comment,
  Message,
  Notification,
  Post,
  Story,
  User,
} from "./types";

export const currentUser: User = {
  id: "u_me",
  name: "Minh Nguyen",
  username: "minh",
  avatarColor: "from-indigo-500 via-violet-500 to-pink-500",
  bio: "Designer & coffee enthusiast. Building beautiful things on the web. ✨",
  coverColor: "from-indigo-500 via-fuchsia-500 to-rose-500",
  verified: true,
};

export const users: User[] = [
  currentUser,
  {
    id: "u_1",
    name: "Linh Pham",
    username: "linhpham",
    avatarColor: "from-rose-400 via-pink-500 to-fuchsia-500",
    bio: "Foodie | Traveler | Sometimes I code.",
    online: true,
    verified: true,
  },
  {
    id: "u_2",
    name: "Khoa Tran",
    username: "khoadev",
    avatarColor: "from-sky-400 via-cyan-500 to-blue-600",
    bio: "Full-stack engineer. Rust & TypeScript.",
    online: true,
  },
  {
    id: "u_3",
    name: "Mai Vu",
    username: "maiv",
    avatarColor: "from-amber-400 via-orange-500 to-rose-500",
    bio: "Photographer 📸 | Cat mom 🐈",
    online: false,
  },
  {
    id: "u_4",
    name: "Tuan Anh",
    username: "tuanle",
    avatarColor: "from-emerald-400 via-teal-500 to-cyan-600",
    bio: "Marathon runner. 21K next Sunday!",
    online: true,
  },
  {
    id: "u_5",
    name: "Hà Lan",
    username: "halan",
    avatarColor: "from-purple-400 via-violet-500 to-indigo-600",
    bio: "Music producer 🎧",
    online: false,
    verified: true,
  },
  {
    id: "u_6",
    name: "Quang Đỗ",
    username: "quangdo",
    avatarColor: "from-yellow-400 via-orange-500 to-red-500",
    bio: "Climbing fanatic, gear nerd.",
    online: true,
  },
  {
    id: "u_7",
    name: "Trang Bui",
    username: "trangb",
    avatarColor: "from-pink-400 via-rose-500 to-red-500",
    bio: "Illustrator & bookworm.",
    online: false,
  },
  {
    id: "u_8",
    name: "Hoang Nam",
    username: "hoangnam",
    avatarColor: "from-blue-400 via-indigo-500 to-purple-600",
    bio: "Indie hacker. Shipping daily.",
    online: true,
  },
];

export function getUser(id: string): User {
  return users.find((u) => u.id === id) ?? currentUser;
}

export function getUserByUsername(username: string): User | undefined {
  return users.find((u) => u.username === username);
}

export const stories: Story[] = [
  { id: "s_me", authorId: "u_me", gradient: "from-indigo-500 via-violet-500 to-pink-500", emoji: "✨" },
  { id: "s_1", authorId: "u_1", gradient: "from-rose-400 via-pink-500 to-fuchsia-500", emoji: "🍜" },
  { id: "s_2", authorId: "u_2", gradient: "from-sky-400 via-cyan-500 to-blue-600", emoji: "💻" },
  { id: "s_3", authorId: "u_3", gradient: "from-amber-400 via-orange-500 to-rose-500", emoji: "📸" },
  { id: "s_4", authorId: "u_4", gradient: "from-emerald-400 via-teal-500 to-cyan-600", emoji: "🏃" },
  { id: "s_5", authorId: "u_5", gradient: "from-purple-400 via-violet-500 to-indigo-600", emoji: "🎧", seen: true },
  { id: "s_6", authorId: "u_6", gradient: "from-yellow-400 via-orange-500 to-red-500", emoji: "🧗", seen: true },
  { id: "s_7", authorId: "u_7", gradient: "from-pink-400 via-rose-500 to-red-500", emoji: "🎨" },
  { id: "s_8", authorId: "u_8", gradient: "from-blue-400 via-indigo-500 to-purple-600", emoji: "🚀" },
];

const now = Date.now();
const minutes = (m: number) => new Date(now - m * 60_000).toISOString();
const hours = (h: number) => new Date(now - h * 3_600_000).toISOString();
const days = (d: number) => new Date(now - d * 86_400_000).toISOString();

export const posts: Post[] = [
  {
    id: "p_1",
    authorId: "u_1",
    text: "Just discovered this cozy little ramen place downtown. The broth is unreal — 20 hours of slow simmering 🍜✨ Already planning my next visit!",
    imageGradient: "from-orange-400 via-rose-500 to-fuchsia-500",
    imageEmoji: "🍜",
    imageRatio: "wide",
    createdAt: minutes(12),
    likes: 1284,
    comments: 87,
    shares: 12,
    liked: false,
    topReactions: ["love", "haha", "wow"],
    tags: ["foodie", "ramen", "saigon"],
  },
  {
    id: "p_2",
    authorId: "u_2",
    text: "Shipped a major refactor today — cut bundle size by 38% and the app feels snappier than ever. Sometimes the best feature is *less* code.",
    createdAt: hours(2),
    likes: 542,
    comments: 41,
    shares: 8,
    topReactions: ["like", "love"],
    tags: ["webdev", "performance"],
  },
  {
    id: "p_3",
    authorId: "u_3",
    text: "Golden hour didn't disappoint today 🌇",
    imageGradient: "from-amber-300 via-orange-500 to-rose-600",
    imageEmoji: "🌇",
    imageRatio: "square",
    createdAt: hours(4),
    likes: 3210,
    comments: 156,
    shares: 44,
    topReactions: ["love", "wow"],
    tags: ["photography", "goldenhour"],
  },
  {
    id: "p_4",
    authorId: "u_4",
    text: "Long run done. 21K under 1:45. Body is tired, mind is happy.",
    createdAt: hours(7),
    likes: 412,
    comments: 28,
    shares: 3,
    topReactions: ["like", "love"],
    tags: ["running", "halfmarathon"],
  },
  {
    id: "p_5",
    authorId: "u_5",
    text: "Snippet from my new track. Drop the comment box and tell me what mood it gives you 🎶",
    imageGradient: "from-violet-500 via-purple-500 to-indigo-600",
    imageEmoji: "🎧",
    imageRatio: "wide",
    createdAt: days(1),
    likes: 988,
    comments: 213,
    shares: 56,
    topReactions: ["love", "wow", "haha"],
    tags: ["music", "newrelease"],
  },
  {
    id: "p_6",
    authorId: "u_6",
    text: "First V6 send of the season! Two months of work paid off in one move 🧗‍♂️",
    imageGradient: "from-yellow-400 via-orange-500 to-red-600",
    imageEmoji: "🧗",
    imageRatio: "tall",
    createdAt: days(2),
    likes: 671,
    comments: 49,
    shares: 6,
    topReactions: ["like", "wow"],
    tags: ["climbing", "bouldering"],
  },
  {
    id: "p_7",
    authorId: "u_7",
    text: "Inktober day 14. Theme: \"empty\". Spent the whole evening on it and I'm in love with how it turned out.",
    imageGradient: "from-rose-400 via-pink-500 to-fuchsia-600",
    imageEmoji: "🎨",
    imageRatio: "square",
    createdAt: days(3),
    likes: 1542,
    comments: 102,
    shares: 31,
    topReactions: ["love", "wow"],
    tags: ["inktober", "illustration"],
  },
  {
    id: "p_8",
    authorId: "u_8",
    text: "Day 87 of building in public. Hit 100 paying users this morning. Validation feels great but the real work starts now. 🚀",
    createdAt: days(4),
    likes: 2104,
    comments: 178,
    shares: 89,
    topReactions: ["like", "love", "wow"],
    tags: ["indiehacker", "buildinpublic"],
  },
];

export const comments: Comment[] = [
  { id: "c_1", postId: "p_1", authorId: "u_2", text: "Wait what??? Drop the location pin 📍", createdAt: minutes(8) },
  { id: "c_2", postId: "p_1", authorId: "u_4", text: "I'm in. Let's go this weekend.", createdAt: minutes(5) },
  { id: "c_3", postId: "p_3", authorId: "u_5", text: "This is unreal. What lens?", createdAt: hours(3) },
  { id: "c_4", postId: "p_8", authorId: "u_1", text: "Congrats Nam! Inspirational stuff 🚀", createdAt: days(3) },
];

export const chats: ChatThread[] = [
  { id: "t_1", participantId: "u_1", lastMessage: "Haha cũng được, hẹn 7h tối nhé", lastTime: minutes(2), unread: 2 },
  { id: "t_2", participantId: "u_2", lastMessage: "Pushed the PR — take a look when free", lastTime: minutes(45), unread: 1 },
  { id: "t_3", participantId: "u_3", lastMessage: "Sent you the raw files 🗂️", lastTime: hours(3), unread: 0 },
  { id: "t_4", participantId: "u_4", lastMessage: "Sub-90 next time, I promise 😂", lastTime: hours(6), unread: 0 },
  { id: "t_5", participantId: "u_5", lastMessage: "🎧🎧🎧", lastTime: days(1), unread: 0 },
  { id: "t_6", participantId: "u_6", lastMessage: "Bro the route is insane", lastTime: days(2), unread: 0 },
  { id: "t_7", participantId: "u_7", lastMessage: "Thanks! Mean a lot ❤️", lastTime: days(3), unread: 0 },
];

export const messagesByThread: Record<string, Message[]> = {
  t_1: [
    { id: "m_1", threadId: "t_1", authorId: "u_1", text: "Tối nay rảnh không?", createdAt: minutes(35) },
    { id: "m_2", threadId: "t_1", authorId: "u_me", text: "Rảnh chứ, định rủ gì?", createdAt: minutes(30) },
    { id: "m_3", threadId: "t_1", authorId: "u_1", text: "Quán ramen mới gần nhà mình, vibe siêu cute", createdAt: minutes(20) },
    { id: "m_4", threadId: "t_1", authorId: "u_me", text: "Nghe đã rồi đó. 7h được không?", createdAt: minutes(10) },
    { id: "m_5", threadId: "t_1", authorId: "u_1", text: "Haha cũng được, hẹn 7h tối nhé", createdAt: minutes(2) },
  ],
  t_2: [
    { id: "m_6", threadId: "t_2", authorId: "u_2", text: "Pushed the PR — take a look when free", createdAt: minutes(45) },
  ],
};

export const notifications: Notification[] = [
  { id: "n_1", type: "like", actorId: "u_1", text: "liked your post about the new portfolio site.", createdAt: minutes(3) },
  { id: "n_2", type: "comment", actorId: "u_2", text: "commented: \"This is so clean. Source?\"", createdAt: minutes(18) },
  { id: "n_3", type: "follow", actorId: "u_5", text: "started following you.", createdAt: hours(1) },
  { id: "n_4", type: "mention", actorId: "u_3", text: "mentioned you in a comment.", createdAt: hours(5) },
  { id: "n_5", type: "tag", actorId: "u_4", text: "tagged you in a photo from the trail.", createdAt: days(1), read: true },
  { id: "n_6", type: "like", actorId: "u_7", text: "and 12 others liked your story.", createdAt: days(2), read: true },
];

export const trending: { tag: string; posts: number }[] = [
  { tag: "WorldCup2026", posts: 128_000 },
  { tag: "AIart", posts: 64_300 },
  { tag: "VietnamFoodie", posts: 41_900 },
  { tag: "WebDev", posts: 28_400 },
  { tag: "GoldenHour", posts: 18_700 },
];

export const suggestedFriends: User[] = users.filter((u) =>
  ["u_5", "u_7", "u_8"].includes(u.id)
);
