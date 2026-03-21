"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid password");
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-headline text-4xl font-light tracking-tighter mb-2">
          Admin
        </h1>
        <p className="font-body text-sm text-on-surface-variant font-light mb-10">
          Fresh Face by Abby
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="font-label text-[10px] uppercase tracking-widest text-primary block mb-3">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full bg-transparent border-b border-outline py-3 font-body text-lg font-light focus:outline-none focus:border-on-surface transition-colors"
            />
            {error && (
              <p className="font-body text-sm text-error mt-2">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-on-surface text-surface py-4 text-sm uppercase tracking-[0.2em] hover:bg-primary transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
