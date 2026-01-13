import Link from "next/link";

export default function ToolPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 px-4 py-10 text-neutral-900 overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(15,118,110,0.06),_transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6">
        <header className="flex flex-col gap-2 rounded-2xl bg-white/90 px-6 py-5 shadow-sm backdrop-blur">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            AIツール
          </h1>
          <p className="text-xs text-neutral-700 leading-relaxed">
            就活生のES作成やガクチカづくりをサポートするツールをまとめたページです。
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {/* ES自動生成ツールへの導線カード */}
          <Link
            href="/tools/es-generator"
            className="group flex flex-col justify-between rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-600">
                Tool
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">
                ES自動生成ツール
              </h2>
              <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                志望業界とガクチカのエピソードから、選考で使えるESの下書きを自動生成できます。
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                β版 公開中
              </span>
              <span className="text-[11px] font-medium text-blue-700 group-hover:underline group-hover:underline-offset-2">
                ツールを開く →
              </span>
            </div>
          </Link>

          {/* 今後のAIツール枠（プレースホルダー） */}
          <div className="flex flex-col justify-between rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-slate-200/70">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                今後追加予定のAIサポート
              </h2>
              <ul className="mt-2 space-y-1.5 text-xs text-neutral-700">
                <li>・ 面接想定質問の自動生成</li>
                <li>・ 学チカの深掘り質問リスト作成</li>
                <li>・ ES添削ポイントの自動チェック</li>
              </ul>
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
              機能は順次アップデートしていく予定です。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
