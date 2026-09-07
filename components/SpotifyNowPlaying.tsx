"use client";

import { useEffect, useState } from "react";

type SpotifyState = {
  configured: boolean;
  isPlaying: boolean;
  isRecent?: boolean;
  title?: string | null;
  artist?: string | null;
  album?: string | null;
  image?: string | null;
  url?: string | null;
  progressMs?: number | null;
  durationMs?: number | null;
  error?: boolean;
};

function SpotifyMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-[#1DB954]">
      <path d="M12 1.8A10.2 10.2 0 1 0 12 22.2 10.2 10.2 0 0 0 12 1.8Zm4.68 14.71a.64.64 0 0 1-.88.21c-2.4-1.47-5.43-1.8-8.99-.99a.64.64 0 0 1-.29-1.25c3.9-.89 7.25-.51 9.95 1.14.3.18.4.58.21.89Zm1.25-2.78a.8.8 0 0 1-1.1.26c-2.76-1.69-6.97-2.18-10.24-1.19a.8.8 0 1 1-.46-1.53c3.74-1.13 8.37-.58 11.54 1.36.38.23.49.72.26 1.1Zm.11-2.89C14.73 8.88 9.27 8.7 6.1 9.66a.96.96 0 1 1-.56-1.84c3.64-1.1 9.67-.88 13.47 1.38a.96.96 0 0 1-.97 1.64Z" />
    </svg>
  );
}

export default function SpotifyNowPlaying() {
  const [state, setState] = useState<SpotifyState | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/spotify", { cache: "no-store" });
        const data = (await response.json()) as SpotifyState;
        if (active) setState(data);
      } catch {
        if (active) setState({ configured: true, isPlaying: false, error: true });
      }
    };

    load();
    const timer = window.setInterval(load, 30000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  if (!state || !state.configured || state.error || !state.title) return null;

  const percent = state.isPlaying && state.progressMs && state.durationMs
    ? Math.min(100, Math.max(0, (state.progressMs / state.durationMs) * 100))
    : 0;

  return (
    <aside className="fixed bottom-4 right-4 z-[65] w-[calc(100%-2rem)] max-w-[360px] overflow-hidden rounded-xl border border-surface-border bg-[#0d0d0f]/95 shadow-2xl backdrop-blur-xl sm:bottom-6 sm:right-6">
      <div className="flex items-center justify-between border-b border-surface-border px-4 py-3">
        <div className="flex items-center gap-2">
          <SpotifyMark />
          <span className="text-[9px] uppercase tracking-[0.28em] text-gold">
            {state.isPlaying ? "Now Playing" : "Último en Spotify"}
          </span>
        </div>
        {state.isPlaying && (
          <div className="flex h-3 items-end gap-[2px]" aria-label="Reproduciendo ahora">
            <span className="dc-eq-bar h-2 w-[2px] bg-gold" />
            <span className="dc-eq-bar dc-eq-bar-delay h-3 w-[2px] bg-gold" />
            <span className="dc-eq-bar dc-eq-bar-delay-2 h-1.5 w-[2px] bg-gold" />
          </div>
        )}
      </div>

      <a
        href={state.url ?? "https://open.spotify.com"}
        target="_blank"
        rel="noreferrer"
        className="group flex gap-4 p-4"
        aria-label={`Abrir ${state.title} en Spotify`}
      >
        {state.image ? (
          <img
            src={state.image}
            alt={`Portada de ${state.album ?? state.title}`}
            className="h-20 w-20 shrink-0 rounded-md bg-surface object-contain"
          />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-md border border-surface-border bg-surface text-2xl">🎵</div>
        )}

        <div className="min-w-0 flex-1 self-center">
          <div className="truncate text-[15px] font-semibold text-foreground transition-colors group-hover:text-gold-soft">{state.title}</div>
          <div className="mt-1 truncate text-[12px] text-muted-foreground">{state.artist}</div>
          {state.album && <div className="mt-1 truncate text-[10px] text-muted-foreground/70">{state.album}</div>}
          <div className="mt-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.16em] text-[#1DB954]">
            <SpotifyMark /> Abrir en Spotify ↗
          </div>
        </div>
      </a>

      {state.isPlaying && (
        <div className="h-[2px] bg-surface-border">
          <div className="h-full bg-gold transition-[width] duration-700" style={{ width: `${percent}%` }} />
        </div>
      )}
    </aside>
  );
}
