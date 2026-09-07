import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const DEFAULT_REDIRECT_URI = "https://dcaribx.vercel.app/api/spotify/callback";
const SCOPES = ["user-read-currently-playing", "user-read-recently-played"];

export async function GET(request: NextRequest) {
  if (process.env.SPOTIFY_SETUP_ENABLED !== "true") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "SPOTIFY_CLIENT_ID no está configurado en Vercel." },
      { status: 503 },
    );
  }

  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || DEFAULT_REDIRECT_URI;
  const state = randomBytes(24).toString("hex");
  const authUrl = new URL(AUTHORIZE_URL);

  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", SCOPES.join(" "));
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("show_dialog", "true");

  const response = NextResponse.redirect(authUrl);
  response.cookies.set("spotify_oauth_state", state, {
    httpOnly: true,
    secure: request.nextUrl.protocol === "https:",
    sameSite: "lax",
    maxAge: 10 * 60,
    path: "/",
  });

  return response;
}
