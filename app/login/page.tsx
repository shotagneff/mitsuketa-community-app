"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "ログインに失敗しました");
        setLoading(false);
        return;
      }

      // ログイン成功 -> ダッシュボードへ
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("通信に失敗しました");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f6f1e8] via-[#f5f5f7] to-[#e3edf7] px-4 py-8 text-neutral-900">
      <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white/80 p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-center">MITSUKETA ログイン</h1>
        <p className="text-sm text-neutral-600 text-center">
          会員IDとパスワードを入力してください。
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">会員ID</span>
            <input
              type="text"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium">パスワード</span>
            <input
              type="password"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:hover:bg-blue-600"
          >
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>
    </main>
  );
}
