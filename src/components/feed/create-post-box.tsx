"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, Smile, MapPin, Sparkles, Video, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/mock-data";

const actions = [
  { label: "Photo", icon: ImagePlus, color: "text-emerald-500 bg-emerald-500/10" },
  { label: "Video", icon: Video, color: "text-rose-500 bg-rose-500/10" },
  { label: "Feeling", icon: Smile, color: "text-amber-500 bg-amber-500/10" },
  { label: "Check in", icon: MapPin, color: "text-sky-500 bg-sky-500/10" },
  { label: "AI assist", icon: Sparkles, color: "text-violet-500 bg-violet-500/10" },
];

export function CreatePostBox({ onCreate }: { onCreate?: (text: string) => void }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim()) return;
    onCreate?.(text.trim());
    setText("");
    setOpen(false);
  }

  return (
    <div className="glass rounded-3xl p-4">
      <div className="flex items-center gap-3">
        <Avatar name={currentUser.name} gradient={currentUser.avatarColor} size="md" ring />
        <button
          onClick={() => setOpen(true)}
          className="flex-1 rounded-full bg-[rgb(var(--muted))] px-5 py-3 text-left text-sm text-[rgb(var(--muted-foreground))] transition hover:bg-[rgb(var(--border))]"
        >
          What&apos;s on your mind, {currentUser.name.split(" ")[0]}?
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-1 border-t border-[rgb(var(--border))] pt-3">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <motion.button
              key={a.label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]"
            >
              <span className={`flex size-7 items-center justify-center rounded-lg ${a.color}`}>
                <Icon className="size-4" />
              </span>
              <span className="hidden sm:inline">{a.label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="glass-strong fixed left-1/2 top-1/2 z-50 w-[92%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl p-5 shadow-[var(--shadow-soft)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-bold">Create post</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1.5 text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))]"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <div className="mb-3 flex items-center gap-3">
                <Avatar name={currentUser.name} gradient={currentUser.avatarColor} size="md" />
                <div>
                  <p className="text-sm font-bold">{currentUser.name}</p>
                  <p className="text-xs text-[rgb(var(--muted-foreground))]">
                    Public · @{currentUser.username}
                  </p>
                </div>
              </div>
              <textarea
                autoFocus
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`What's on your mind, ${currentUser.name.split(" ")[0]}?`}
                className="min-h-32 w-full resize-none rounded-2xl bg-transparent text-lg placeholder:text-[rgb(var(--muted-foreground))] focus:outline-none"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {actions.map((a) => {
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.label}
                      type="button"
                      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${a.color}`}
                    >
                      <Icon className="size-3.5" /> {a.label}
                    </button>
                  );
                })}
              </div>
              <Button
                onClick={submit}
                disabled={!text.trim()}
                variant="gradient"
                fullWidth
                className="mt-4"
              >
                <Send className="size-4" /> Post
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
