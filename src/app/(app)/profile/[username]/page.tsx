"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Camera,
  MapPin,
  Calendar,
  Link as LinkIcon,
  BadgeCheck,
  MessageCircle,
  UserPlus,
  Check,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/feed/post-card";
import {
  currentUser,
  getUserByUsername,
  posts,
  users,
} from "@/lib/mock-data";
import { cn, formatCount } from "@/lib/utils";

const tabs = ["Posts", "About", "Photos", "Friends", "Reels"] as const;

export default function ProfilePage() {
  const params = useParams<{ username: string }>();
  const username = decodeURIComponent(params.username);
  const user = getUserByUsername(username) ?? currentUser;
  if (!user) notFound();

  const isMe = user.id === currentUser.id;
  const [tab, setTab] = useState<(typeof tabs)[number]>("Posts");
  const [following, setFollowing] = useState(false);

  const userPosts = posts.filter((p) => p.authorId === user.id);
  const photoPosts = posts.filter((p) => p.imageGradient).slice(0, 9);
  const friends = users.filter((u) => u.id !== user.id).slice(0, 9);
  const followers = 1240 + (user.id.charCodeAt(2) % 9) * 73;
  const followingCount = 312 + (user.id.charCodeAt(2) % 7) * 19;

  return (
    <div className="flex flex-col gap-4">
      {/* Cover */}
      <div className="glass relative overflow-hidden rounded-3xl">
        <div className="relative">
          <div
            className={cn(
              "h-48 w-full bg-gradient-to-br sm:h-64",
              user.coverColor ?? "from-indigo-500 via-fuchsia-500 to-rose-500"
            )}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-strong absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
          >
            <Camera className="size-3.5" /> Edit cover
          </motion.button>
        </div>

        <div className="px-5 pb-6 pt-4 sm:px-7">
          <div className="-mt-20 flex flex-col items-start gap-4 sm:-mt-24 sm:flex-row sm:items-end sm:justify-between">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="relative"
            >
              <Avatar name={user.name} gradient={user.avatarColor} size="2xl" ring />
              {user.online && (
                <span className="absolute right-2 bottom-2 size-5 rounded-full bg-emerald-500 ring-4 ring-[rgb(var(--card))] pulse-dot" />
              )}
            </motion.div>

            <div className="flex items-center gap-2">
              {isMe ? (
                <>
                  <Button variant="secondary" size="sm">
                    Edit profile
                  </Button>
                  <Button variant="primary" size="sm">
                    Share
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant={following ? "secondary" : "gradient"}
                    size="sm"
                    onClick={() => setFollowing((f) => !f)}
                  >
                    {following ? (
                      <>
                        <Check className="size-4" /> Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="size-4" /> Follow
                      </>
                    )}
                  </Button>
                  <Button variant="secondary" size="sm">
                    <MessageCircle className="size-4" /> Message
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-1.5">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              {user.verified && <BadgeCheck className="size-5 text-sky-500" />}
            </div>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              @{user.username}
            </p>
            {user.bio && (
              <p className="mt-2 max-w-prose text-sm">{user.bio}</p>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[rgb(var(--muted-foreground))]">
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" /> Ho Chi Minh City
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" /> Joined Jan 2023
              </span>
              <span className="flex items-center gap-1">
                <LinkIcon className="size-3.5" /> nova.app/{user.username}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="glass grid grid-cols-3 divide-x divide-[rgb(var(--border))] overflow-hidden rounded-3xl">
        {[
          { label: "Posts", value: userPosts.length || 24 },
          { label: "Followers", value: formatCount(followers) },
          { label: "Following", value: formatCount(followingCount) },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="p-4 text-center"
          >
            <p className="text-xl font-bold sm:text-2xl">{s.value}</p>
            <p className="text-xs text-[rgb(var(--muted-foreground))]">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="glass relative flex gap-1 overflow-x-auto rounded-3xl p-1.5 no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative flex-1 whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-semibold transition-colors",
              tab === t ? "text-white" : "text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]"
            )}
          >
            {tab === t && (
              <motion.span
                layoutId="profile-tab"
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 shadow-[var(--shadow-glow)]"
              />
            )}
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "Posts" && (
        <div className="flex flex-col gap-4">
          {userPosts.length > 0 ? (
            userPosts.map((p, i) => <PostCard key={p.id} post={p} index={i} />)
          ) : (
            <div className="glass rounded-3xl p-10 text-center text-sm text-[rgb(var(--muted-foreground))]">
              {user.name} hasn&apos;t posted yet. Be the first to say hi <span aria-hidden>👋</span>
            </div>
          )}
        </div>
      )}

      {tab === "Photos" && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {photoPosts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.03 }}
              className={cn(
                "relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br",
                p.imageGradient
              )}
            >
              <span className="absolute inset-0 flex items-center justify-center text-5xl">
                {p.imageEmoji}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "About" && (
        <div className="glass space-y-3 rounded-3xl p-6 text-sm">
          <p>
            <span className="font-semibold">Bio: </span>
            <span className="text-[rgb(var(--muted-foreground))]">{user.bio}</span>
          </p>
          <p>
            <span className="font-semibold">Location: </span>
            <span className="text-[rgb(var(--muted-foreground))]">Ho Chi Minh City, Vietnam</span>
          </p>
          <p>
            <span className="font-semibold">Joined: </span>
            <span className="text-[rgb(var(--muted-foreground))]">January 2023</span>
          </p>
          <p>
            <span className="font-semibold">Website: </span>
            <a className="text-[rgb(var(--primary))] hover:underline" href="#">
              nova.app/{user.username}
            </a>
          </p>
        </div>
      )}

      {tab === "Friends" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {friends.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="glass flex flex-col items-center gap-2 rounded-3xl p-4"
            >
              <Avatar name={f.name} gradient={f.avatarColor} size="lg" online={f.online} />
              <p className="text-sm font-semibold">{f.name}</p>
              <p className="text-xs text-[rgb(var(--muted-foreground))]">@{f.username}</p>
              <Button size="sm" variant="secondary">View</Button>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "Reels" && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {photoPosts.slice(0, 6).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "relative aspect-[9/16] overflow-hidden rounded-2xl bg-gradient-to-br",
                p.imageGradient
              )}
            >
              <span className="absolute inset-0 flex items-center justify-center text-6xl">
                {p.imageEmoji}
              </span>
              <span className="absolute bottom-2 left-2 right-2 truncate text-xs font-bold text-white drop-shadow">
                {p.text}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
