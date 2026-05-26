"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
  Smile,
  BadgeCheck,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { cn, formatCount, timeAgo } from "@/lib/utils";
import type { Post } from "@/lib/types";
import { comments as allComments, getUser } from "@/lib/mock-data";

const reactionEmoji: Record<string, string> = {
  like: "👍",
  love: "❤️",
  haha: "😂",
  wow: "😮",
  sad: "😢",
  angry: "😡",
};

const reactionList = [
  { key: "like", emoji: "👍", label: "Like" },
  { key: "love", emoji: "❤️", label: "Love" },
  { key: "haha", emoji: "😂", label: "Haha" },
  { key: "wow", emoji: "😮", label: "Wow" },
  { key: "sad", emoji: "😢", label: "Sad" },
  { key: "angry", emoji: "😡", label: "Angry" },
];

const ratioClass: Record<NonNullable<Post["imageRatio"]>, string> = {
  wide: "aspect-[16/9]",
  square: "aspect-square",
  tall: "aspect-[3/4]",
};

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const author = getUser(post.authorId);
  const [liked, setLiked] = useState(!!post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [showReactions, setShowReactions] = useState(false);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [saved, setSaved] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [commentText, setCommentText] = useState("");

  const postComments = allComments.filter((c) => c.postId === post.id);

  function toggleLike() {
    setLiked((prev) => {
      const next = !prev;
      setLikes((l) => l + (next ? 1 : -1));
      if (next) {
        setActiveReaction("love");
        setBurstKey((k) => k + 1);
      } else {
        setActiveReaction(null);
      }
      return next;
    });
  }

  function pickReaction(key: string) {
    if (!liked) {
      setLiked(true);
      setLikes((l) => l + 1);
    }
    setActiveReaction(key);
    setBurstKey((k) => k + 1);
    setShowReactions(false);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass overflow-hidden rounded-3xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <Avatar name={author.name} gradient={author.avatarColor} size="md" online={author.online} ring />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-bold">{author.name}</p>
            {author.verified && <BadgeCheck className="size-4 text-sky-500" />}
          </div>
          <p className="text-xs text-[rgb(var(--muted-foreground))]">
            @{author.username} · {timeAgo(post.createdAt)} ·{" "}
            <span className="text-[rgb(var(--muted-foreground))]">🌐 Public</span>
          </p>
        </div>
        <button
          aria-label="More"
          className="flex size-9 items-center justify-center rounded-full text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </div>

      {/* Text */}
      {post.text && (
        <p className="px-5 pb-3 text-[15px] leading-relaxed text-[rgb(var(--foreground))]">
          {post.text}
        </p>
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-5 pb-3">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[rgb(var(--muted))] px-2.5 py-1 text-xs font-semibold text-[rgb(var(--primary))]"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* Media */}
      {post.imageGradient && (
        <div
          className={cn(
            "relative mx-4 mb-4 overflow-hidden rounded-2xl",
            ratioClass[post.imageRatio ?? "wide"]
          )}
        >
          <div className={cn("absolute inset-0 bg-gradient-to-br", post.imageGradient)} />
          <div className="absolute inset-0 flex items-center justify-center text-[110px] drop-shadow-2xl">
            {post.imageEmoji}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center justify-between px-5 pb-2 text-xs text-[rgb(var(--muted-foreground))]">
        <div className="flex items-center gap-1">
          <span className="flex -space-x-1">
            {post.topReactions?.slice(0, 3).map((r, i) => (
              <span
                key={r}
                style={{ zIndex: 10 - i }}
                className="flex size-5 items-center justify-center rounded-full bg-[rgb(var(--card))] text-[11px] ring-2 ring-[rgb(var(--card))]"
              >
                {reactionEmoji[r]}
              </span>
            ))}
          </span>
          <span className="ml-1 font-medium">{formatCount(likes)}</span>
        </div>
        <div className="flex gap-3">
          <span>{formatCount(post.comments)} comments</span>
          <span>{formatCount(post.shares)} shares</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mx-4 mb-2 grid grid-cols-4 gap-1 border-t border-[rgb(var(--border))] pt-1">
        <div
          className="relative"
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
        >
          <button
            onClick={toggleLike}
            className={cn(
              "group relative flex w-full items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-semibold transition-colors",
              liked
                ? "text-rose-500"
                : "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]"
            )}
          >
            <motion.span
              key={burstKey}
              animate={liked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              {activeReaction && activeReaction !== "like" ? (
                <span className="text-xl">{reactionEmoji[activeReaction]}</span>
              ) : (
                <Heart
                  className={cn(
                    "size-5 transition-transform group-hover:scale-110",
                    liked && "fill-rose-500 text-rose-500"
                  )}
                />
              )}
              {/* Burst particles */}
              <AnimatePresence>
                {liked && (
                  <span className="pointer-events-none absolute inset-0">
                    {[...Array(6)].map((_, i) => (
                      <motion.span
                        key={`${burstKey}-${i}`}
                        initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                        animate={{
                          opacity: 0,
                          scale: 1,
                          x: Math.cos((i / 6) * Math.PI * 2) * 22,
                          y: Math.sin((i / 6) * Math.PI * 2) * 22,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute left-1/2 top-1/2 size-1.5 rounded-full bg-rose-400"
                      />
                    ))}
                  </span>
                )}
              </AnimatePresence>
            </motion.span>
            <span className="hidden sm:inline">
              {activeReaction
                ? reactionList.find((r) => r.key === activeReaction)?.label
                : "Like"}
            </span>
          </button>

          <AnimatePresence>
            {showReactions && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                className="glass-strong absolute -top-14 left-1/2 z-20 flex -translate-x-1/2 gap-1 rounded-full p-1.5 shadow-[var(--shadow-soft)]"
              >
                {reactionList.map((r, i) => (
                  <motion.button
                    key={r.key}
                    whileHover={{ scale: 1.4, y: -6 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => pickReaction(r.key)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    aria-label={r.label}
                    className="text-xl leading-none"
                  >
                    {r.emoji}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setShowComments((s) => !s)}
          className="flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-semibold text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--muted))]"
        >
          <MessageCircle className="size-5" />
          <span className="hidden sm:inline">Comment</span>
        </button>
        <button className="flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-semibold text-[rgb(var(--muted-foreground))] transition-colors hover:bg-[rgb(var(--muted))]">
          <Share2 className="size-5" />
          <span className="hidden sm:inline">Share</span>
        </button>
        <button
          onClick={() => setSaved((s) => !s)}
          className={cn(
            "flex items-center justify-center gap-2 rounded-2xl py-2.5 text-sm font-semibold transition-colors",
            saved
              ? "text-amber-500"
              : "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]"
          )}
        >
          <Bookmark className={cn("size-5", saved && "fill-amber-500")} />
          <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
        </button>
      </div>

      {/* Comments panel */}
      <AnimatePresence initial={false}>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[rgb(var(--border))]"
          >
            <div className="space-y-3 p-4">
              {postComments.map((c, i) => {
                const u = getUser(c.authorId);
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <Avatar name={u.name} gradient={u.avatarColor} size="sm" />
                    <div className="rounded-2xl bg-[rgb(var(--muted))] px-3 py-2">
                      <p className="text-xs font-bold">{u.name}</p>
                      <p className="text-sm">{c.text}</p>
                    </div>
                  </motion.div>
                );
              })}
              {postComments.length === 0 && (
                <p className="text-center text-xs text-[rgb(var(--muted-foreground))]">
                  Be the first to comment.
                </p>
              )}
              <div className="flex items-center gap-2 pt-2">
                <Avatar
                  name="Me"
                  gradient="from-indigo-500 via-violet-500 to-pink-500"
                  size="sm"
                />
                <div className="flex flex-1 items-center gap-1 rounded-full bg-[rgb(var(--muted))] px-3 py-2">
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment…"
                    className="flex-1 bg-transparent text-sm placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none"
                  />
                  <button className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]">
                    <Smile className="size-4" />
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    disabled={!commentText.trim()}
                    onClick={() => setCommentText("")}
                    className="text-[rgb(var(--primary))] disabled:opacity-40"
                  >
                    <Send className="size-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
