"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.5 14.6 2.6 12 2.6 6.8 2.6 2.6 6.8 2.6 12s4.2 9.4 9.4 9.4c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"
      />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 .5C5.7.5.7 5.6.7 11.9c0 5 3.3 9.3 7.8 10.8.6.1.8-.2.8-.6v-2c-3.2.7-3.8-1.4-3.8-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.5-.3-5.2-1.3-5.2-5.6 0-1.2.4-2.3 1.2-3.1-.1-.3-.5-1.4.1-3 0 0 1-.3 3.3 1.2.9-.2 2-.4 3-.4s2.1.1 3 .4c2.2-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.7.1 3 .8.8 1.2 1.9 1.2 3.1 0 4.3-2.6 5.3-5.2 5.6.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.5-1.5 7.8-5.8 7.8-10.8C23.3 5.6 18.2.5 12 .5z" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/feed");
    }, 700);
  }

  return (
    <div className="bg-mesh flex min-h-screen items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="glass-strong w-full max-w-5xl overflow-hidden rounded-[2.5rem] shadow-[var(--shadow-soft)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Hero side */}
          <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 p-10 text-white md:flex">
            <motion.div
              className="absolute -right-20 -top-20 size-80 rounded-full bg-white/10 blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 size-80 rounded-full bg-rose-300/20 blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 19V5l14 14V5" />
                  </svg>
                </span>
                <span className="text-xl font-bold">Nova</span>
              </div>
            </div>
            <div className="relative">
              <h2 className="text-4xl font-bold leading-tight">
                Connect with the people <br />
                who matter — beautifully.
              </h2>
              <p className="mt-4 max-w-xs text-white/80">
                Share moments, discover ideas, and chat in real time on a social
                platform built for the modern web.
              </p>
              <div className="mt-6 flex -space-x-2">
                {["from-amber-300 to-rose-400", "from-cyan-300 to-blue-500", "from-violet-300 to-fuchsia-500", "from-emerald-300 to-teal-500"].map(
                  (g, i) => (
                    <span
                      key={i}
                      className={`flex size-9 items-center justify-center rounded-full bg-gradient-to-br ${g} text-xs font-bold ring-2 ring-white/40`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                  )
                )}
                <span className="flex size-9 items-center justify-center rounded-full bg-white/20 text-xs font-bold ring-2 ring-white/40 backdrop-blur">
                  +9k
                </span>
              </div>
            </div>
            <p className="relative text-xs text-white/70">
              Join over 9,000 creators already sharing on Nova.
            </p>
          </div>

          {/* Form */}
          <div className="p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
              <Sparkles className="size-4 text-[rgb(var(--primary))]" />
              Welcome back
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Sign in to <span className="text-gradient">Nova</span>
            </h1>
            <p className="mt-1 text-sm text-[rgb(var(--muted-foreground))]">
              Don&apos;t have an account?{" "}
              <Link href="/feed" className="font-semibold text-[rgb(var(--primary))] hover:underline">
                Try the demo
              </Link>
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-[rgb(var(--border-strong))] py-2.5 text-sm font-semibold transition hover:bg-[rgb(var(--muted))]">
                <GoogleIcon className="size-4" /> Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-[rgb(var(--border-strong))] py-2.5 text-sm font-semibold transition hover:bg-[rgb(var(--muted))]">
                <GithubIcon className="size-4" /> GitHub
              </button>
            </div>

            <div className="my-5 flex items-center gap-3 text-xs text-[rgb(var(--muted-foreground))]">
              <span className="h-px flex-1 bg-[rgb(var(--border))]" />
              or sign in with email
              <span className="h-px flex-1 bg-[rgb(var(--border))]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[rgb(var(--muted-foreground))]">
                  Email
                </span>
                <div className="flex items-center gap-2 rounded-2xl border border-[rgb(var(--border-strong))] bg-transparent px-3.5 py-2.5 transition focus-within:border-transparent focus-within:ring-2 focus-within:ring-[rgb(var(--primary))]/40">
                  <Mail className="size-4 text-[rgb(var(--muted-foreground))]" />
                  <input
                    type="email"
                    defaultValue="hello@nova.app"
                    required
                    className="w-full bg-transparent text-sm focus:outline-none"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-[rgb(var(--muted-foreground))]">
                  Password
                </span>
                <div className="flex items-center gap-2 rounded-2xl border border-[rgb(var(--border-strong))] bg-transparent px-3.5 py-2.5 transition focus-within:border-transparent focus-within:ring-2 focus-within:ring-[rgb(var(--primary))]/40">
                  <Lock className="size-4 text-[rgb(var(--muted-foreground))]" />
                  <input
                    type={showPwd ? "text" : "password"}
                    defaultValue="supersecret"
                    required
                    className="w-full bg-transparent text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="text-[rgb(var(--muted-foreground))]"
                  >
                    {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </label>
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1.5 text-[rgb(var(--muted-foreground))]">
                  <input type="checkbox" className="accent-[rgb(var(--primary))]" defaultChecked />
                  Remember me
                </label>
                <a href="#" className="font-semibold text-[rgb(var(--primary))] hover:underline">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" variant="gradient" fullWidth size="lg" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
