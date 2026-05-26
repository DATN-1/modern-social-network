"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { StoriesRow } from "@/components/feed/stories-row";
import { CreatePostBox } from "@/components/feed/create-post-box";
import { PostCard } from "@/components/feed/post-card";
import { posts as seed } from "@/lib/mock-data";
import type { Post } from "@/lib/types";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(seed);

  function addPost(text: string) {
    const newPost: Post = {
      id: `p_${Date.now()}`,
      authorId: "u_me",
      text,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      topReactions: [],
    };
    setPosts((p) => [newPost, ...p]);
  }

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Your <span className="text-gradient">feed</span>
          </h1>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            Latest from friends & creators you follow.
          </p>
        </div>
      </motion.div>

      <StoriesRow />
      <CreatePostBox onCreate={addPost} />

      <div className="flex flex-col gap-4">
        {posts.map((p, i) => (
          <PostCard key={p.id} post={p} index={i} />
        ))}
      </div>

      <div className="py-8 text-center text-xs text-[rgb(var(--muted-foreground))]">
        You've reached the end. Pull up to refresh ↑
      </div>
    </div>
  );
}
