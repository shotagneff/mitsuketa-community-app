"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  const mainClassName = isLogin
    ? "flex-1"
    : "flex-1 pb-16 md:pl-64 md:pb-0";

  return (
    <div className="relative flex min-h-screen bg-background text-foreground">
      {/* 左側固定サイドバー（ログイン画面以外） */}
      {!isLogin && (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm md:flex">
          <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-slate-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium tracking-wide text-slate-400">
                MITSUKETA
              </span>
              <span className="text-sm font-semibold text-slate-900">
                就活サポートナビ
              </span>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-4 text-sm text-slate-800">
            <ul className="space-y-1">
              <li>
                <Link
                  href="/dashboard"
                  className="flex items-center rounded-lg px-3 py-2 text-[13px] font-medium text-slate-800 transition hover:bg-slate-100"
                >
                  ホーム
                </Link>
              </li>
              <li className="mt-4 mb-1 text-[11px] font-semibold tracking-wide text-slate-400">
                ツール
              </li>
              <li>
                <Link
                  href="/tool"
                  className="flex items-center rounded-lg px-3 py-2 text-[13px] font-medium text-slate-800 transition hover:bg-slate-100"
                >
                  就活役立ちツール
                </Link>
              </li>
            </ul>
          </nav>

          <div className="px-6 pb-5 pt-2 text-[11px] text-slate-400 border-t border-slate-100">
            <p>※ デザイン・機能は今後変更される可能性があります。</p>
          </div>
        </aside>
      )}

      {/* コンテンツ領域 */}
      <main className={mainClassName}>{children}</main>

      {/* モバイル用ボトムナビゲーション（ログイン画面以外） */}
      {!isLogin && (
        <nav className="fixed inset-x-3 bottom-3 z-40 flex h-14 items-center justify-around rounded-2xl border border-slate-200/80 bg-white/95 px-2 text-xs text-slate-700 shadow-[0_8px_30px_rgba(15,23,42,0.18)] backdrop-blur md:hidden">
          <Link
            href="/dashboard"
            className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <span className="flex h-5 w-5 items-center justify-center text-slate-700">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  d="M4.5 11.25 12 4.5l7.5 6.75V19.5a.75.75 0 0 1-.75.75h-4.5v-4.5h-4.5v4.5H5.25A.75.75 0 0 1 4.5 19.5v-8.25Z"
                  className="fill-slate-700"
                />
              </svg>
            </span>
            <span>ホーム</span>
          </Link>
          <Link
            href="/tool"
            className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-1 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <span className="flex h-5 w-5 items-center justify-center text-slate-500">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path
                  d="M5.25 5.25h13.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75Zm0 6h13.5a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V12a.75.75 0 0 1 .75-.75Z"
                  className="fill-slate-600"
                />
              </svg>
            </span>
            <span>就活役立ちツール</span>
          </Link>
        </nav>
      )}
    </div>
  );
}
