import { NextResponse } from "next/server";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

type SpotifyTrack = {
  name?: string;
  duration_ms?: number;
  external_urls?: { spotify?: string };
  artists?: Array<{ name?: string }>;
  album?: {
    name?: string;
    images?: Array<{ url?: string }>;
  };
};

type SpotifyEpisode = {
  name?: string;
  duration_ms?: number;
  external_urls?: { spotify?: string };
  images?: Array<{ url?: string }>;
  show?: { name?: string };
};

function publicPayload(item: SpotifyTrack | SpotifyEpisode, isPlaying: boolean, progressMs: number | null, isRecent = false) {
  const isTrack = "artists" in item;
  const track = item as SpotifyTrack;
  const episode = item as SpotifyEpisode;

  return {
    configured: true,
    isPlaying,
    isRecent,
    title: item.name ?? null,
    artist: isTrack
      ? track.artists?.map((artist) => artist.name).filter(Boolean).join(", ") ?? null
      : episode.show?.name ?? null,
    album: isTrack ? track.album?.name ?? null : "Podcast",
    image: isTrack ? track.album?.images?.[0]?.url ?? null : episode.images?.[0]?.url ?? null,
    url: item.external_urls?.spotify ?? null,
    progressMs,
    durationMs: item.duration_ms ?? null,
  };
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) return null;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Spotify token refresh failed: ${response.status}`);
  const data = await response.json();
  return data.access_token as string;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return NextResponse.json(
        { configured: false, isPlaying: false },
        { headers: { "Cache-Control": "public, s-maxage=60" } },
      );
    }

    const headers = { Authorization: `Bearer ${accessToken}` };
    const current = await fetch(CURRENTLY_PLAYING_URL, { headers, cache: "no-store" });

    if (current.status === 200) {
      const data = await current.json();
      if (data?.item) {
        return NextResponse.json(
          publicPayload(data.item, Boolean(data.is_playing), data.progress_ms ?? null),
          { headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30" } },
        );
      }
    }

    const recent = await fetch(RECENTLY_PLAYED_URL, { headers, cache: "no-store" });
    if (recent.ok) {
      const data = await recent.json();
      const item = data?.items?.[0]?.track as SpotifyTrack | undefined;
      if (item) {
        return NextResponse.json(
          publicPayload(item, false, null, true),
          { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
        );
      }
    }

    return NextResponse.json(
      { configured: true, isPlaying: false, isRecent: false, title: null },
      { headers: { "Cache-Control": "public, s-maxage=30" } },
    );
  } catch (error) {
    console.error("Spotify now playing error", error);
    return NextResponse.json({ configured: true, error: true, isPlaying: false }, { status: 200 });
  }
}
