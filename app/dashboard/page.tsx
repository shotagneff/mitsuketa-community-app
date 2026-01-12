export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-neutral-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold mb-4">MITSUKETA ダッシュボード</h1>
        <p className="text-sm text-neutral-700 mb-6">
          ログインお疲れさまです。このエリアは会員専用です。
        </p>
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">ES自動生成ツール（準備中）</h2>
          <p className="text-sm text-neutral-700">
            今後、このダッシュボードから ES 自動生成ツールなどの機能にアクセスできるようになります。
          </p>
        </section>
      </div>
    </main>
  );
}
