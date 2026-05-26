"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Phone, Video, Info, Send, Smile, Paperclip, BadgeCheck } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { chats, currentUser, getUser, messagesByThread } from "@/lib/mock-data";
import type { Message } from "@/lib/types";
import { cn, timeAgo } from "@/lib/utils";

export default function MessagesPage() {
  const [activeId, setActiveId] = useState(chats[0].id);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [threadMessages, setThreadMessages] = useState<Record<string, Message[]>>(
    () => ({ ...messagesByThread })
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  const idCounter = useRef(0);
  const nextId = useCallback(() => {
    idCounter.current += 1;
    return `m_${idCounter.current}_${Math.floor(Math.random() * 1e9)}`;
  }, []);

  const active = chats.find((c) => c.id === activeId)!;
  const peer = getUser(active.participantId);
  const messages = threadMessages[active.id] ?? [];

  const filteredChats = chats.filter((c) => {
    const u = getUser(c.participantId);
    return (
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.username.toLowerCase().includes(query.toLowerCase())
    );
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, messages.length]);

  const send = useCallback(() => {
    if (!draft.trim()) return;
    const newMsg: Message = {
      id: nextId(),
      threadId: active.id,
      authorId: "u_me",
      text: draft.trim(),
      createdAt: new Date().toISOString(),
    };
    setThreadMessages((prev) => ({
      ...prev,
      [active.id]: [...(prev[active.id] ?? []), newMsg],
    }));
    setDraft("");

    // Simulate reply
    const threadId = active.id;
    const peerId = peer.id;
    setTimeout(() => {
      const replies = [
        "Got it!",
        "Sounds good 👍",
        "Haha 😂",
        "Mình rep ngay 🚀",
        "Sure thing",
      ];
      const reply: Message = {
        id: nextId(),
        threadId,
        authorId: peerId,
        text: replies[Math.floor(Math.random() * replies.length)],
        createdAt: new Date().toISOString(),
      };
      setThreadMessages((prev) => ({
        ...prev,
        [threadId]: [...(prev[threadId] ?? []), reply],
      }));
    }, 1200);
  }, [active.id, draft, nextId, peer.id]);

  return (
    <div className="glass flex h-[calc(100vh-7rem)] overflow-hidden rounded-3xl lg:h-[calc(100vh-6rem)]">
      {/* Threads list */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-[rgb(var(--border))] sm:flex">
        <div className="p-4">
          <h2 className="text-lg font-bold">Messages</h2>
          <div className="mt-3 flex items-center gap-2 rounded-full bg-[rgb(var(--muted))] px-3 py-2">
            <Search className="size-4 text-[rgb(var(--muted-foreground))]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chats"
              className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-[rgb(var(--muted-foreground))]"
            />
          </div>
        </div>
        <div className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-3 thin-scrollbar">
          {filteredChats.map((c, i) => {
            const u = getUser(c.participantId);
            const isActive = c.id === activeId;
            return (
              <motion.button
                key={c.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "relative flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-colors",
                  isActive
                    ? "bg-[rgb(var(--primary))]/10"
                    : "hover:bg-[rgb(var(--muted))]"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="chat-active"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-y-1.5 left-0 w-1 rounded-r-full bg-[rgb(var(--primary))]"
                  />
                )}
                <Avatar name={u.name} gradient={u.avatarColor} size="md" online={u.online} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold">{u.name}</p>
                    <span
                      className="shrink-0 text-[10px] text-[rgb(var(--muted-foreground))]"
                      suppressHydrationWarning
                    >
                      {timeAgo(c.lastTime)}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "truncate text-xs",
                      c.unread > 0
                        ? "font-semibold text-[rgb(var(--foreground))]"
                        : "text-[rgb(var(--muted-foreground))]"
                    )}
                  >
                    {c.lastMessage}
                  </p>
                </div>
                {c.unread > 0 && (
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-[10px] font-bold text-white">
                    {c.unread}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </aside>

      {/* Conversation */}
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-[rgb(var(--border))] p-4">
          <Avatar name={peer.name} gradient={peer.avatarColor} size="md" online={peer.online} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <p className="truncate text-sm font-bold">{peer.name}</p>
              {peer.verified && <BadgeCheck className="size-4 text-sky-500" />}
            </div>
            <p className="text-xs text-[rgb(var(--muted-foreground))]">
              {peer.online ? "Active now" : "Last seen recently"}
            </p>
          </div>
          {[Phone, Video, Info].map((Icon, i) => (
            <button
              key={i}
              className="flex size-9 items-center justify-center rounded-full text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]"
            >
              <Icon className="size-4" />
            </button>
          ))}
        </header>

        <div className="flex-1 space-y-2 overflow-y-auto p-4 thin-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((m) => {
              const mine = m.authorId === currentUser.id;
              return (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className={cn("flex items-end gap-2", mine ? "justify-end" : "justify-start")}
                >
                  {!mine && (
                    <Avatar name={peer.name} gradient={peer.avatarColor} size="xs" />
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                      mine
                        ? "rounded-br-md bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 text-white"
                        : "rounded-bl-md bg-[rgb(var(--muted))] text-[rgb(var(--foreground))]"
                    )}
                  >
                    {m.text}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        <footer className="flex items-center gap-2 border-t border-[rgb(var(--border))] p-3">
          <button className="flex size-10 shrink-0 items-center justify-center rounded-full text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]">
            <Paperclip className="size-4" />
          </button>
          <div className="flex flex-1 items-center gap-1 rounded-full bg-[rgb(var(--muted))] px-4 py-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={`Message ${peer.name.split(" ")[0]}`}
              className="w-full bg-transparent text-sm focus:outline-none placeholder:text-[rgb(var(--muted-foreground))]"
            />
            <button className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]">
              <Smile className="size-4" />
            </button>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={send}
            disabled={!draft.trim()}
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 text-white shadow-[var(--shadow-glow)] disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="size-4" />
          </motion.button>
        </footer>
      </section>
    </div>
  );
}
