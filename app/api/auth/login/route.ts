import { NextRequest, NextResponse } from "next/server";

// シンプルなログインAPI
// COMMON_PASSWORD 環境変数と一致するパスワードなら、任意の memberId でログイン成功とみなす
// ログイン成功時に mk_user_id クッキーをセットする
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const memberId = body?.memberId as string | undefined;
  const password = body?.password as string | undefined;

  if (!memberId || !password) {
    return NextResponse.json(
      { error: "memberId と password は必須です" },
      { status: 400 }
    );
  }

  const commonPassword = process.env.COMMON_PASSWORD;
  if (!commonPassword) {
    return NextResponse.json(
      { error: "サーバー側の設定に問題があります(COMMON_PASSWORD)" },
      { status: 500 }
    );
  }

  if (password !== commonPassword) {
    return NextResponse.json(
      { error: "ID またはパスワードが違います" },
      { status: 401 }
    );
  }

  // ここでは簡易実装として、memberId をそのまま mk_user_id に入れる
  const res = NextResponse.json({ ok: true });

  const secure = process.env.NODE_ENV === "production";

  res.cookies.set("mk_user_id", memberId, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30日
  });

  return res;
}
