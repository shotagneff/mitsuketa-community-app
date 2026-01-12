import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 px-4 py-10 text-neutral-900 overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(15,118,110,0.06),_transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-8">
        {/* ヘッダーエリア */}
        <header className="flex flex-col gap-3 rounded-2xl bg-white/80 px-6 py-5 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                MITSUKETA ダッシュボード
              </h1>
              <p className="mt-1 text-xs text-neutral-700 leading-relaxed">
                このエリアは開発中です。就活生の方々に役に立つ情報やツール、学チカを作る機会を提供いたします。
              </p>
            </div>
            <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700 ring-1 ring-blue-100">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span>現在: ES 自動生成ツール β版 を公開中</span>
            </div>
          </div>
        </header>

        {/* コンテンツグリッド */}
        <section className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          {/* 左カラム：ESジェネレーターへの導線カード */}
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
                生成結果をベースに、あなた自身の言葉でブラッシュアップしてみてください。
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-600">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                ガクチカ作成の第一歩に
              </span>
              <span className="text-[11px] font-medium text-blue-700 group-hover:underline group-hover:underline-offset-2">
                ツールを開く →
              </span>
            </div>
          </Link>

          {/* 右カラム：今後の機能ティザー */}
          <div className="flex flex-col gap-3 rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-slate-200/70">
            <h3 className="text-sm font-semibold text-slate-900">
              今後追加予定のコンテンツ
            </h3>
            <ul className="space-y-1.5 text-xs text-neutral-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                <span>業界別・企業別のES事例集（良い例・改善例を含むフィードバック付き）</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                <span>学チカを深掘りするためのセルフワークシートと質問リスト</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-500" />
                <span>キャリアアドバイザーとの1on1相談につながるオンラインイベント情報</span>
              </li>
            </ul>
            <p className="mt-2 text-[11px] text-slate-500">
              機能は順次アップデートしていきます。フィードバックや「こんな機能が欲しい」も大歓迎です。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
