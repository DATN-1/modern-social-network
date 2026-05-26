"use client";

import { motion } from "framer-motion";
import {
  Flame,
  Sparkles,
  TrendingUp,
  Globe2,
  Music,
  Camera,
  Code,
  Dumbbell,
  Plane,
  Utensils,
} from "lucide-react";
import { posts, trending, users } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/avatar";
import { cn, formatCount } from "@/lib/utils";

const categories = [
  { label: "For you", icon: Sparkles, color: "from-indigo-500 to-fuchsia-500" },
  { label: "Trending", icon: TrendingUp, color: "from-rose-500 to-orange-500" },
  { label: "Music", icon: Music, color: "from-purple-500 to-violet-600" },
  { label: "Photos", icon: Camera, color: "from-amber-500 to-rose-500" },
  { label: "Tech", icon: Code, color: "from-sky-500 to-blue-600" },
  { label: "Fitness", icon: Dumbbell, color: "from-emerald-500 to-teal-600" },
  { label: "Travel", icon: Plane, color: "from-cyan-500 to-sky-600" },
  { label: "Food", icon: Utensils, color: "from-orange-500 to-red-500" },
];

export default function ExplorePage() {
  const photoPosts = posts.filter((p) => p.imageGradient);
  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass relative overflow-hidden rounded-3xl p-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-rose-500/10" />
        <div className="relative flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 text-white shadow-[var(--shadow-glow)]">
            <Globe2 className="size-7" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Explore <span className="text-gradient">the world</span>
            </h1>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Discover trending posts, people, and ideas tailored to you.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {categories.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.button
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="glass group flex flex-col items-start gap-2 overflow-hidden rounded-3xl p-4 text-left"
            >
              <span
                className={cn(
                  "flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow",
                  c.color
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className="text-sm font-bold">{c.label}</span>
              <span className="text-xs text-[rgb(var(--muted-foreground))]">
                Explore →
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Trending */}
      <div className="glass rounded-3xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <Flame className="size-4 text-rose-500" />
          <h2 className="text-sm font-bold">Trending hashtags</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {trending.map((t, i) => (
            <motion.span
              key={t.tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer rounded-full bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-rose-500/10 px-3 py-1.5 text-sm font-semibold text-gradient"
            >
              #{t.tag} · {formatCount(t.posts)}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Photo grid */}
      <div>
        <h2 className="mb-3 text-lg font-bold">Popular today</h2>
        <div className="grid auto-rows-[180px] grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {photoPosts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.04 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-gradient-to-br shadow",
                p.imageGradient,
                i % 5 === 0 && "row-span-2 col-span-2"
              )}
            >
              <span className="absolute inset-0 flex items-center justify-center text-5xl drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                {p.imageEmoji}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="absolute inset-x-3 bottom-3 line-clamp-2 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* People to follow */}
      <div>
        <h2 className="mb-3 text-lg font-bold">People you might like</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {users
            .filter((u) => u.id !== "u_me")
            .map((u, i) => (
              <motion.div
                key={u.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass flex flex-col items-center gap-2 rounded-3xl p-4 text-center"
              >
                <Avatar
                  name={u.name}
                  gradient={u.avatarColor}
                  size="lg"
                  online={u.online}
                  ring
                />
                <p className="text-sm font-bold">{u.name}</p>
                <p className="line-clamp-1 text-xs text-[rgb(var(--muted-foreground))]">
                  {u.bio}
                </p>
                <button className="mt-1 w-full rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1.5 text-xs font-bold text-white shadow-[var(--shadow-glow)] transition hover:brightness-110">
                  Follow
                </button>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
