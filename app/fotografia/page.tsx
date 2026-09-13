"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const featured = [
  { src: "/fotografia/teletubby-street.webp", title: "Street Frame", caption: "Monocromo, gesto insolente y calle en fuga." },
  { src: "/fotografia/jet-maybach.webp", title: "Runway Frame", caption: "Contraste entre lujo, máquina y movimiento." },
  { src: "/fotografia/teletubby-police.webp", title: "Custody Frame", caption: "Frialdad documental con una presencia absurda al centro." },
  { src: "/fotografia/teletubby-low-angle.webp", title: "Low Angle Frame", caption: "Perspectiva agresiva y cielo abierto como fondo." },
];

const archive = [
  "/fotos/foto1.png",
  "/fotos/foto2.jpeg",
  "/fotos/foto3.jpeg",
  "/fotos/foto4.jpeg",
  "/fotos/foto5.jpeg",
  "/fotos/foto6.jpeg",
  "/fotos/foto7.jpeg",
];

export default function Fotografia() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <main className="dc-grain min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-14 flex items-center justify-between border-b border-surface-border pb-5">
          <Link href="/" className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-gold">← Volver al universo</Link>
          <span className="text-[10px] uppercase tracking-[0.24em] text-gold">Archivo / 04</span>
        </div>

        <section className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-5 text-[10px] uppercase tracking-[0.32em] text-gold">Fotografía / memoria visual</div>
            <h1 className="font-serif text-6xl font-semibold tracking-[-0.045em] sm:text-8xl">Archivo<br />Fotográfico.</h1>
          </div>
          <p className="max-w-sm text-[13px] leading-[1.85] text-muted-foreground">Frames extraños, tensión, calle y contraste. Una selección editorial dentro del universo DelCaribe.</p>
        </section>

        <section className="mb-24 grid gap-4 lg:grid-cols-12">
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setSelected(featured[0].src)}
            className="group relative min-h-[420px] overflow-hidden rounded-2xl border border-surface-border bg-surface text-left sm:min-h-[560px] lg:col-span-7"
          >
            <Image src={featured[0].src} alt={featured[0].title} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <div className="text-[9px] uppercase tracking-[0.28em] text-gold">Frame 01</div>
              <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">{featured[0].title}</h2>
              <p className="mt-2 max-w-md text-[12px] leading-relaxed text-white/65">{featured[0].caption}</p>
            </div>
          </motion.button>

          <div className="grid gap-4 lg:col-span-5">
            <motion.button type="button" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} onClick={() => setSelected(featured[1].src)} className="group relative min-h-[290px] overflow-hidden rounded-2xl border border-surface-border bg-surface text-left">
              <Image src={featured[1].src} alt={featured[1].title} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5"><div className="text-[9px] uppercase tracking-[0.24em] text-gold">Frame 02</div><div className="mt-1 font-serif text-2xl font-semibold">{featured[1].title}</div></div>
            </motion.button>

            <div className="grid gap-4 sm:grid-cols-2">
              {featured.slice(2).map((item, index) => (
                <motion.button
                  key={item.src}
                  type="button"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => setSelected(item.src)}
                  className="group relative min-h-[240px] overflow-hidden rounded-2xl border border-surface-border bg-surface text-left"
                >
                  <Image src={item.src} alt={item.title} fill sizes="(min-width: 640px) 25vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4"><div className="text-[8px] uppercase tracking-[0.22em] text-gold">Frame 0{index + 3}</div><div className="mt-1 font-serif text-xl font-semibold">{item.title}</div></div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-surface-border pt-16">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div><div className="text-[10px] uppercase tracking-[0.3em] text-gold">Archivo continuo</div><h2 className="mt-3 font-serif text-4xl font-semibold">Más frames.</h2></div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">07 piezas</span>
          </div>

          <div className="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
            {archive.map((foto, index) => (
              <motion.button
                key={foto}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.035 }}
                onClick={() => setSelected(foto)}
                className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-surface-border bg-surface text-left"
                aria-label={`Abrir fotografía ${index + 1}`}
              >
                <Image src={foto} alt={`Fotografía ${index + 1} del archivo DelCaribe`} width={1200} height={1600} className="h-auto w-full transition duration-500 group-hover:scale-[1.025] group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 text-[9px] uppercase tracking-[0.22em] opacity-0 transition-opacity group-hover:opacity-100"><span>Archive {String(index + 1).padStart(2, "0")}</span><span className="text-gold">Expandir ↗</span></div>
              </motion.button>
            ))}
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.currentTarget === event.target && setSelected(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md sm:p-8">
            <button onClick={() => setSelected(null)} className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-xl text-white" aria-label="Cerrar fotografía">×</button>
            <motion.div initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.99 }} className="relative h-[88vh] w-[92vw]">
              <Image src={selected} alt="Fotografía ampliada" fill sizes="92vw" className="object-contain" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
