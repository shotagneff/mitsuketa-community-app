import Link from "next/link";

export default function ToolPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 px-4 py-10 text-neutral-900 overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(15,118,110,0.06),_transparent_55%)]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6">
        <header className="mb-2 flex flex-col gap-1">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            就活役立ちツール
          </h1>
          <p className="text-xs text-neutral-700 leading-relaxed">
            就活生のES作成やガクチカづくりをサポートするツールをまとめたページです。
          </p>
        </header>

        {/* ESジェネレーターの実物イメージ紹介セクション */}
        <section className="grid gap-5 rounded-2xl bg-white/90 px-5 py-4 shadow-sm ring-1 ring-slate-200/70 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="flex flex-col justify-center gap-3">
            <h2 className="text-lg font-semibold text-slate-900">
              業界別ESジェネレーター
            </h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              志望業界と学生時代のエピソードを入力すると、このような画面で業界別のES下書きを自動生成できます。
              まずはガクチカの素材を言語化したい方に向けた、就活生専用のツールです。
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1">
                業界別のESポイントを踏まえて生成
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1">
                ガクチカの文字数目安もひと目で確認
              </span>
            </div>
            <div className="mt-3">
              <Link
                href="/tools/es-generator"
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                ES自動生成ツールを使ってみる
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src="/es-generator-phone.png"
              alt="業界別ESジェネレーターの画面イメージ"
              className="h-[14rem] w-auto object-contain drop-shadow-xl sm:h-[22rem]"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
