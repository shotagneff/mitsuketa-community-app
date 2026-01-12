"use client";

import { FormEvent, useState } from "react";

const INDUSTRIES = [
  { value: "consulting", label: "コンサル・シンクタンク" },
  { value: "it", label: "IT" },
  { value: "manufacturing", label: "メーカー" },
  { value: "finance", label: "金融" },
  { value: "trading", label: "商社" },
  { value: "media", label: "広告・マスコミ" },
  { value: "hr_education", label: "人材・教育" },
  { value: "infra", label: "交通・インフラ" },
  { value: "real_estate", label: "不動産・建設" },
  { value: "travel_tourism", label: "旅行・観光" },
  { value: "bridal_beauty", label: "ブライダル・美容" },
  { value: "medical_welfare", label: "医療・福祉" },
  { value: "retail_distribution", label: "小売・流通" }, // ★この1行を追加
] as const;

type Industry = (typeof INDUSTRIES)[number]["value"];

export default function EsGeneratorPage() {
  const [industry, setIndustry] = useState<Industry>("consulting");
  const [strengthLabel, setStrengthLabel] = useState("");
  const [episode, setEpisode] = useState("");
  const [targetLength, setTargetLength] = useState(500);

  const [outline, setOutline] = useState<string[] | null>(null);
  const [body, setBody] = useState<string | null>(null);
  const [hrAdvice, setHrAdvice] = useState<string[] | null>(null);
  const [generationNotes, setGenerationNotes] = useState<string[] | null>(null);
  const [bodyLength, setBodyLength] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"form" | "loading" | "result">("form");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setStep("loading");

    try {
      const res = await fetch("/api/es/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          questionType: "gakuchika",
          strengthLabel,
          episodeText: episode,
          targetLength,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(
          (data as any)?.error || "ESの生成に失敗しました。しばらくしてから再度お試しください。"
        );
        setOutline(null);
        setBody(null);
        setHrAdvice(null);
        setGenerationNotes(null);
        setBodyLength(null);
        setStep("form");
        return;
      }

      const data = (await res.json()) as {
        outline: string[];
        body: string;
        hrAdvice?: string[];
        generationNotes?: string[];
        bodyLength?: number;
      };

      setOutline(data.outline ?? null);
      setBody(data.body ?? null);
      setHrAdvice(data.hrAdvice ?? null);
      setGenerationNotes(data.generationNotes ?? null);
      setBodyLength(typeof data.bodyLength === "number" ? data.bodyLength : null);
      setStep("result");
    } catch (err) {
      console.error(err);
      setError("生成中にエラーが発生しました");
      setStep("form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100 px-4 py-8 text-neutral-900 overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/es-bg.png')" }}
      />

      <div className="mx-auto mb-6 flex max-w-5xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="ミツケタ ロゴ"
            className="h-10 w-10 rounded-full object-contain shadow-sm"
          />
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              業界別ESジェネレーター
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              志望業界とあなたのエピソードから、新卒向けのESを素早く作成します。
            </p>
          </div>
        </div>
      </div>
      {step === "form" && (
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <section className="w-full rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  プロフィールとエピソードの入力
                </h2>
                <p className="mt-1 text-xs text-slate-600">
                  まずはあなた自身の強みとガクチカのエピソードを入力してください。
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 md:flex-row">
                <label className="flex-1 text-sm">
                  <span className="mb-1 block font-medium">志望業界</span>
                  <select
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value as Industry)}
                  >
                    {INDUSTRIES.map((ind) => (
                      <option key={ind.value} value={ind.value}>
                        {ind.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[11px] text-slate-500">
                    志望業界に適したESを作成いたします。
                  </p>
                </label>
              </div>

              <label className="text-sm">
                <span className="mb-1 block font-medium">あなたの強み</span>
                <input
                  type="text"
                  placeholder="例：粘り強くやり抜く力"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={strengthLabel}
                  onChange={(e) => setStrengthLabel(e.target.value)}
                  required
                />
              </label>

              <label className="text-sm">
                <span className="mb-1 block font-medium">
                  学生時代に力を入れたエピソード（箇条書き）
                </span>
                <textarea
                  rows={8}
                  placeholder="いつ・どこで・どんな役割で・どんな課題があり・何をして・どうなったかを書いてください。"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={episode}
                  onChange={(e) => setEpisode(e.target.value)}
                  required
                />
                <a
                  href="https://timerex.net/s/info_a844_6b24/9206dc81"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[11px] text-blue-600 underline underline-offset-2 cursor-pointer"
                >
                  ガクチカエピソードへ何を用いるべきか聞いてみたい方はこちら
                </a>
              </label>

              <label className="flex items-center gap-3 text-sm">
                <span className="font-medium">文字数目安</span>
                <select
                  className="w-32 rounded-md border border-neutral-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={targetLength}
                  onChange={(e) => setTargetLength(Number(e.target.value))}
                >
                  <option value={300}>約300字</option>
                  <option value={400}>約400字</option>
                  <option value={500}>約500字</option>
                  <option value={600}>約600字</option>
                </select>
              </label>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-[11px] text-slate-500">
                  入力内容はブラウザ内でのみ処理され、外部に送信・保存されません。
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60 disabled:hover:bg-blue-600"
                >
                  ESを生成
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {step === "loading" && (
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl border border-slate-200 bg-white/90 px-6 py-8 shadow-sm backdrop-blur">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            <p className="text-sm font-medium text-neutral-800">
              業界に合わせてあなたのESを生成しています…（およそ10秒ほどで完了します）
            </p>
            <div className="relative mt-2 h-10 w-full overflow-hidden rounded-md bg-slate-100">
              <div
                className="absolute inset-y-0 -left-1/3 w-1/2 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100"
                style={{
                  animation: "es-shimmer 1.4s infinite",
                }}
              />
            </div>
            <p className="text-xs text-neutral-500">
              このまま10秒ほどお待ちください。
            </p>
          </div>
        </div>
      )}

      {step === "result" && (
        <div className="mx-auto flex max-w-5xl flex-col gap-4">
          <section className="w-full rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">生成されたES</h2>
                <p className="mt-1 text-xs text-slate-600">
                  下書きをベースに、自分の言葉に言い換えながらブラッシュアップしてみてください。
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
                onClick={() => setStep("form")}
              >
                もう一度ESを作る
              </button>
            </div>
            <div className="mt-2 grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
              {/* 左カラム：本文カード */}
              <div className="space-y-3">
                {body && (
                  <div className="h-full rounded-lg border border-slate-200 bg-slate-50/80 p-4">
                    <div className="mb-2 flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-neutral-800">
                        下書き本文
                      </h3>
                      {typeof bodyLength === "number" && (
                        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                          {bodyLength}字
                        </span>
                      )}
                    </div>
                    <textarea
                      readOnly
                      value={body}
                      className="h-96 w-full resize-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm leading-relaxed text-neutral-900"
                    />
                  </div>
                )}
              </div>

              {/* 右カラム：このESで大事にしたこと ＋ アドバイス（タイポグラフィで差別化） */}
              <div className="space-y-4">
                {generationNotes && generationNotes.length > 0 && (
                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      このESで大事にしたこと
                    </h3>
                    <ul className="mt-1 space-y-1.5 pl-3 text-[13px] text-slate-800">
                      {generationNotes.map((item, idx) => (
                        <li key={idx} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {hrAdvice && hrAdvice.length > 0 && (
                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <h3 className="mb-1 text-sm font-semibold text-slate-900">
                      ミツケタからのアドバイス
                    </h3>
                    <ol className="mt-1 space-y-1.5 pl-4 text-sm text-slate-900 list-decimal">
                      {hrAdvice.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ol>
                    <div
                      className="mt-3 flex items-center justify-between gap-3 rounded-md px-3 py-2 text-[11px] text-white"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #d33f42 0%, #e25a5d 50%, #c92e31 100%)",
                      }}
                    >
                      <p className="flex-1 text-xs">
                        このエピソードをもっと良くしたい方は、一緒に深掘りして内容をブラッシュアップする相談もできます。
                      </p>
                      <a
                        href="https://timerex.net/s/info_a844_6b24/9206dc81"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="whitespace-nowrap"
                      >
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-1 text-[11px] font-semibold shadow-sm transition hover:bg-slate-100"
                          style={{ color: "#d33f42" }}
                        >
                          相談してみる
                        </button>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
