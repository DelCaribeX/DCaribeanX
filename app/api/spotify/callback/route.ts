import { NextRequest, NextResponse } from "next/server";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const DEFAULT_REDIRECT_URI = "https://dcaribx.vercel.app/api/spotify/callback";

function page(title: string, message: string, token?: string) {
  const safeTitle = title.replace(/[<>&"]/g, "");
  const safeMessage = message.replace(/[<>&]/g, "");
  const safeToken = token?.replace(/[<>&"]/g, "");

  return new NextResponse(
    `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${safeTitle}</title><style>body{margin:0;background:#09090b;color:#f1efe9;font-family:Arial,sans-serif;display:grid;place-items:center;min-height:100vh;padding:24px}.card{width:min(680px,100%);border:1px solid #2b2b30;border-radius:18px;background:#111114;padding:28px;box-sizing:border-box}.eyebrow{color:#c9a14a;font-size:11px;letter-spacing:.25em;text-transform:uppercase}.title{font-family:Georgia,serif;font-size:42px;margin:16px 0}.copy{color:#9b9ba2;line-height:1.7}.token{margin-top:22px;background:#09090b;border:1px solid #35353b;border-radius:10px;padding:14px;word-break:break-all;font-family:monospace;color:#e5c97a}.hint{margin-top:18px;color:#777780;font-size:12px;line-height:1.6}.btn{display:inline-block;margin-top:22px;background:#c9a14a;color:#09090b;padding:11px 16px;border-radius:8px;text-decoration:none;font-weight:700}</style></head><body><main class="card"><div class="eyebrow">Spotify / DelCaribe</div><h1 class="title">${safeTitle}</h1><p class="copy">${safeMessage}</p>${safeToken ? `<div class="token">${safeToken}</div><p class="hint">Copia este valor directamente en Vercel como <b>SPOTIFY_REFRESH_TOKEN</b>. No lo publiques en GitHub ni lo compartas.</p>` : ""}<a class="btn" href="/">Volver al portafolio</a></main></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  );
}

export async function GET(request: NextRequest) {
  const error = request.nextUrl.searchParams.get("error");
  if (error) return page("Autorización cancelada", "Spotify no concedió el acceso. Puedes volver a intentarlo cuando quieras.");

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const cookieState = request.cookies.get("spotify_oauth_state")?.value;

  if (!code || !state || !cookieState || state !== cookieState) {
    return page("Conexión inválida", "La validación de seguridad de Spotify no coincidió. Vuelve a iniciar la conexión desde /spotify-connect.");
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || DEFAULT_REDIRECT_URI;

  if (!clientId || !clientSecret) {
    return page("Faltan credenciales", "Configura SPOTIFY_CLIENT_ID y SPOTIFY_CLIENT_SECRET en Vercel y vuelve a autorizar.");
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Spotify OAuth callback failed", response.status, details);
    return page("Spotify rechazó el intercambio", "Revisa que el Redirect URI coincida exactamente y que el Client ID/Secret sean correctos.");
  }

  const data = (await response.json()) as { refresh_token?: string };
  if (!data.refresh_token) {
    return page("Sin refresh token", "Spotify autorizó la cuenta pero no devolvió un refresh token. Revoca el acceso de la app en Spotify y vuelve a intentarlo.");
  }

  return page("Spotify conectado", "Último paso: copia el token de abajo y guárdalo como variable privada en Vercel.", data.refresh_token);
}
