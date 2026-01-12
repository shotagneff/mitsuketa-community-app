import { NextResponse, type NextRequest } from "next/server";

// MITSUKETA 用のグローバルログインガード
// mk_user_id クッキーがない場合は、/login 以外のページへのアクセスをログイン画面にリダイレクトする。
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 公開しておきたいパス（ログインページや認証API、Next.js内部用ファイルなど）は除外
  const publicPaths = ["/login", "/api/auth/login", "/api/auth/logout", "/api/auth/me"];
  const isPublicPath = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  // Next.js のビルド成果物や静的ファイルも除外
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  if (isPublicPath) {
    return NextResponse.next();
  }

  const userIdCookie = request.cookies.get("mk_user_id");

  // 未ログインの場合は /login にリダイレクト
  if (!userIdCookie || !userIdCookie.value) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    // 元のURLはクエリに含めておくと、将来的にログイン後リダイレクトにも使える
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ログイン済みでルートにアクセスした場合は、一時的に ES ジェネレーターにリダイレクト
  if (pathname === "/") {
    const esUrl = request.nextUrl.clone();
    esUrl.pathname = "/tools/es-generator";
    return NextResponse.redirect(esUrl);
  }

  // ログイン済みならそのまま通す
  return NextResponse.next();
}
