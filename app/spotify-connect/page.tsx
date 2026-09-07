export const dynamic = "force-dynamic";

export default function SpotifyConnectPage() {
  const hasClientId = Boolean(process.env.SPOTIFY_CLIENT_ID);
  const hasClientSecret = Boolean(process.env.SPOTIFY_CLIENT_SECRET);
  const ready = hasClientId && hasClientSecret;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || "https://dcaribx.vercel.app/api/spotify/callback";

  return (
    <main className="min-h-screen bg-background px-6 py-16 text-foreground sm:px-8">
      <div className="mx-auto max-w-2xl">
        <a href="/" className="text-[12px] text-muted-foreground transition hover:text-gold">← Volver al portafolio</a>

        <div className="mt-10 rounded-2xl border border-surface-border bg-surface/40 p-7 sm:p-9">
          <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Spotify / Setup</div>
          <h1 className="mt-4 font-serif text-4xl font-semibold sm:text-5xl">Conectar mi Spotify</h1>
          <p className="mt-5 text-[14px] leading-[1.8] text-muted-foreground">
            Este asistente obtiene el refresh token de forma segura. Tus credenciales de Spotify nunca se envían al navegador.
          </p>

          <div className="mt-8 space-y-5 border-t border-surface-border pt-7 text-[13px] leading-[1.75] text-muted-foreground">
            <div>
              <span className="mr-3 text-gold">01</span>
              Crea una app en Spotify for Developers y agrega exactamente este Redirect URI:
              <div className="mt-3 break-all rounded-lg border border-surface-border bg-background px-4 py-3 font-mono text-[12px] text-foreground">{redirectUri}</div>
            </div>
            <div>
              <span className="mr-3 text-gold">02</span>
              En Vercel agrega <b className="text-foreground">SPOTIFY_CLIENT_ID</b> y <b className="text-foreground">SPOTIFY_CLIENT_SECRET</b> como variables privadas de Production.
            </div>
            <div>
              <span className="mr-3 text-gold">03</span>
              Vuelve aquí y pulsa autorizar. Spotify solicitará solo permiso para leer lo que estás escuchando y tu historial reciente.
            </div>
            <div>
              <span className="mr-3 text-gold">04</span>
              Al terminar recibirás un refresh token. Cópialo en Vercel como <b className="text-foreground">SPOTIFY_REFRESH_TOKEN</b> y redeploya.
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-surface-border bg-background/60 p-5">
            <div className="flex items-center justify-between gap-4 text-[12px]">
              <span className="text-muted-foreground">Client ID</span>
              <span className={hasClientId ? "text-gold" : "text-red-300"}>{hasClientId ? "Configurado" : "Pendiente"}</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-4 text-[12px]">
              <span className="text-muted-foreground">Client Secret</span>
              <span className={hasClientSecret ? "text-gold" : "text-red-300"}>{hasClientSecret ? "Configurado" : "Pendiente"}</span>
            </div>
          </div>

          {ready ? (
            <a href="/api/spotify/auth" className="mt-7 inline-flex rounded-md bg-gold px-5 py-3 text-[13px] font-semibold text-background transition hover:bg-gold-soft">
              Autorizar Spotify ↗
            </a>
          ) : (
            <div className="mt-7 text-[12px] leading-relaxed text-muted-foreground">
              El botón de autorización se habilitará cuando ambas variables estén configuradas en Vercel y el proyecto se vuelva a desplegar.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
