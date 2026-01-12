import { NextRequest, NextResponse } from "next/server";

// 現在のログイン状態を返すシンプルなエンドポイント
export async function GET(req: NextRequest) {
  const userId = req.cookies.get("mk_user_id")?.value;

  if (!userId) {
    return NextResponse.json({ user: null });
  }

  // ここでは簡易実装として、クッキーの値だけを返す
  return NextResponse.json({ user: { id: userId } });
}
