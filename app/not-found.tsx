import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="w-full max-w-2xl border-y border-surface-border py-16">
        <div className="text-[10px] uppercase tracking-[0.32em] text-gold">Error / 404</div>
        <h1 className="mt-6 font-serif text-6xl font-semibold tracking-[-0.04em] sm:text-8xl">Mundo no encontrado.</h1>
        <p className="mt-6 max-w-md text-[14px] leading-[1.8] text-muted-foreground">Esta coordenada todavía no existe dentro del archivo DelCaribe.</p>
        <Link href="/" className="dc-button-primary mt-9">Volver al universo ↙</Link>
      </div>
    </main>
  );
}
