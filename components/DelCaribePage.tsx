"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Interest = {
  icon: string;
  tag: string;
  title: string;
  desc: string;
  body: string;
  href?: string;
};

const interests: Interest[] = [
  { icon: "🎵", tag: "SONIDO", title: "Música", desc: "Distintos géneros, un solo idioma.", body: "Sonido, atmósfera y ritmo como formas de construir memoria y emoción." },
  { icon: "⛩️", tag: "CULTURA", title: "Anime", desc: "Arte, narrativa y filosofía en movimiento.", body: "Dirección de arte, narrativa, símbolos e ideas que funcionan mucho más allá de la animación." },
  { icon: "📖", tag: "LETRAS", title: "Literatura", desc: "Corrientes artísticas, no solo páginas.", body: "Textos, mundos e ideas que ayudan a leer el presente desde perspectivas distintas." },
  { icon: "📷", tag: "FOTOS", title: "Fotografía", desc: "Entender el presente leyendo el pasado a través de la imagen.", body: "Un archivo personal de instantes, texturas, calles y detalles que merecen permanecer.", href: "/fotografia" },
  { icon: "🏍️", tag: "VELOCIDAD", title: "Motos", desc: "Libertad sobre dos ruedas.", body: "Diseño, mecánica, cultura y la experiencia física de una máquina hecha para moverse." },
  { icon: "🎮", tag: "MUNDOS", title: "Videojuegos", desc: "Narrativa interactiva llevada al límite.", body: "Historias que no solo se observan: se habitan, se exploran y se deciden." },
  { icon: "👁️", tag: "PSIQUE", title: "Terror", desc: "Horror psicológico y misterios de la red.", body: "Lo inquietante, lo inexplicable y las historias que funcionan mejor cuando sugieren más de lo que muestran." },
  { icon: "🚗", tag: "COLECCIÓN", title: "Autos 1:64", desc: "Diseño en miniatura, precisión a escala.", body: "Una colección donde cada pieza resume proporciones, épocas y diseño automotriz en pocos centímetros." },
  { icon: "💻", tag: "BUILD", title: "Programación", desc: "Aprendiendo a construir con código.", body: "Interfaces, experimentación y proyectos pequeños para entender cómo funcionan las cosas y construir las mías." },
  { icon: "🖋️", tag: "ARTE", title: "Tattoos", desc: "La piel como lienzo permanente.", body: "Símbolos, composición y memoria visual convertidos en una pieza que acompaña a una persona." },
];

const projects = [
  {
    n: "01",
    type: "FOTOGRAFÍA / ARCHIVO",
    title: "Archivo Fotográfico",
    desc: "Una selección de imágenes, escenas y detalles dentro del universo DelCaribe.",
    href: "/fotografia",
    cta: "Abrir archivo",
  },
  {
    n: "02",
    type: "WEB / IDENTIDAD",
    title: "DCaribeanX",
    desc: "Este portafolio como experimento continuo de identidad, diseño, interacción y código.",
    href: "https://github.com/DelCaribeX/DCaribeanX",
    cta: "Ver código",
    external: true,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: EASE }}
      className="mb-10 flex items-center gap-4"
    >
      <span className="text-[10px] tabular-nums tracking-[0.3em] text-gold">{index}</span>
      <span className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground">{children}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-surface-border via-surface-border to-transparent" />
    </motion.div>
  );
}

function InterestCard({ item, onOpen }: { item: Interest; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--mx", `${x}px`);
    ref.current.style.setProperty("--my", `${y}px`);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onOpen}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="group relative min-h-[184px] overflow-hidden rounded-lg border border-white/70 bg-[#121214] p-5 text-left transition-colors duration-300 hover:border-gold/70 sm:min-h-[184px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(240px circle at var(--mx,50%) var(--my,0%), rgba(201,161,74,.12), transparent 60%)" }}
      />
      <div className="relative">
        <div className="mb-5 text-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">{item.icon}</div>
        <div className="mb-2 text-[10px] uppercase tracking-[0.32em] text-gold">{item.tag}</div>
        <div className="mb-1.5 text-[15px] font-semibold tracking-tight text-foreground">{item.title}</div>
        <div className="text-[12px] leading-relaxed text-muted-foreground">{item.desc}</div>
      </div>
    </motion.button>
  );
}

export default function DelCaribePage() {
  const [selected, setSelected] = useState<Interest | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    document.body.style.overflow = selected || menuOpen ? "hidden" : "";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [selected, menuOpen]);

  return (
    <div className="dc-grain min-h-screen bg-background font-sans text-foreground antialiased">
      <motion.div
        style={{ scaleX: progress, transformOrigin: "left" }}
        className="fixed left-0 right-0 top-0 z-[100] h-[2px] bg-gradient-to-r from-gold via-gold-soft to-gold"
      />

      <header className="sticky top-0 z-[80] border-b border-surface-border/55 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
          <a href="#top" className="text-[15px] font-semibold tracking-tight">
            Del<span className="text-gold">Caribe</span>
          </a>
          <nav className="hidden items-center gap-8 text-[13px] text-muted-foreground sm:flex">
            <a href="#universo" className="dc-nav-link">Intereses</a>
            <a href="#proyectos" className="dc-nav-link">Proyectos</a>
            <a href="#sobre" className="dc-nav-link">Sobre mí</a>
            <a href="#contacto" className="dc-nav-link">Contacto</a>
          </nav>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-md border border-surface-border px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:hidden"
          >
            {menuOpen ? "Cerrar" : "Menú"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-background/97 px-6 pt-28 backdrop-blur-xl sm:hidden"
          >
            <nav className="flex flex-col">
              {[
                ["#universo", "Intereses"],
                ["#proyectos", "Proyectos"],
                ["#sobre", "Sobre mí"],
                ["#contacto", "Contacto"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-surface-border py-5 font-serif text-4xl"
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top" className="relative z-[2] mx-auto max-w-5xl px-6 sm:px-8">
        <section className="relative min-h-[575px] border-b border-surface-border py-24 sm:min-h-[640px] sm:py-24">
          <div className="absolute -right-20 top-2 -z-10 h-[460px] w-[460px] rounded-full bg-gold/[0.055] blur-[120px]" />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="max-w-[560px]"
          >
            <div className="mb-12 flex items-center gap-3">
              <span className="block h-px w-12 bg-gold" />
              <span className="text-[11px] uppercase tracking-[0.32em] text-gold">Portafolio Personal</span>
            </div>

            <h1 className="font-serif text-[72px] font-black leading-[0.88] tracking-[-0.05em] sm:text-[104px]">
              <span className="block text-foreground">Del</span>
              <span
                className="block text-gold"
                style={{ textShadow: "0 0 38px rgba(201,161,74,.055)" }}
              >
                Caribe
              </span>
            </h1>

            <p className="mt-12 max-w-md text-[14.5px] leading-[1.85] text-muted-foreground">
              Coleccionista de mundos. <span className="font-semibold text-foreground">Música, anime, literatura, terror, códigos.</span> Encuentro patrones donde los demás ven caos — ya sea en la historia, en una pista, o en un bug de las 3am.
            </p>

            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href="#sobre"
                className="rounded-md bg-gold px-5 py-2.5 text-[13px] font-medium text-background transition hover:-translate-y-0.5 hover:bg-gold-soft"
              >
                Conocerme
              </a>
              <a
                href="#contacto"
                className="rounded-md border border-surface-border px-5 py-2.5 text-[13px] font-medium transition hover:-translate-y-0.5 hover:border-gold/50 hover:bg-surface"
              >
                Hablemos
              </a>
            </div>
          </motion.div>
        </section>

        <section id="universo" className="scroll-mt-24 py-24">
          <SectionLabel index="01 —">Universo</SectionLabel>
          <div className="rounded-2xl border border-surface-border bg-[#0d0d0f] p-4 sm:p-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {interests.map((item) => (
                <InterestCard key={item.title} item={item} onOpen={() => setSelected(item)} />
              ))}
            </div>
          </div>
        </section>

        <section id="proyectos" className="scroll-mt-24 border-t border-surface-border py-24">
          <SectionLabel index="02 —">Proyectos</SectionLabel>
          <div className="mb-10 max-w-2xl">
            <h2 className="font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Lo que construyo.</h2>
            <p className="mt-4 text-[13px] leading-[1.8] text-muted-foreground">
              Proyectos reales que amplían el universo sin convertir el sitio en un portafolio genérico.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <motion.a
                key={project.title}
                href={project.href}
                target={project.external ? "_blank" : undefined}
                rel={project.external ? "noreferrer" : undefined}
                whileHover={{ y: -4 }}
                className="group rounded-xl border border-surface-border bg-surface/35 p-7 transition-colors hover:border-gold/45"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="font-serif text-4xl text-foreground/15 transition-colors group-hover:text-gold/45">{project.n}</span>
                  <span className="text-right text-[9px] uppercase tracking-[0.24em] text-gold">{project.type}</span>
                </div>
                <h3 className="mt-12 font-serif text-3xl font-semibold">{project.title}</h3>
                <p className="mt-4 text-[13px] leading-[1.8] text-muted-foreground">{project.desc}</p>
                <div className="mt-8 text-[10px] uppercase tracking-[0.24em] text-gold">{project.cta} ↗</div>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="sobre" className="scroll-mt-24 border-t border-surface-border py-24">
          <SectionLabel index="03 —">Sobre mí</SectionLabel>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <h2 className="font-serif text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
                No colecciono cosas al azar. <span className="text-gold">Colecciono mundos.</span>
              </h2>
              <p className="mt-7 max-w-2xl text-[14px] leading-[1.9] text-muted-foreground">
                Soy DelCaribe. Me interesan las conexiones entre cultura, música, máquinas, imágenes e historias. La programación es otra forma de explorar lo mismo: entender cómo están construidas las cosas y crear las mías.
              </p>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface/35 p-7">
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Construyendo con</div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["HTML / CSS", "JavaScript", "Git", "Next.js", "Tailwind", "Framer Motion"].map((skill) => (
                  <span key={skill} className="rounded-md border border-surface-border px-3 py-2 text-[11px] text-muted-foreground">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-24 border-t border-surface-border py-24">
          <SectionLabel index="04 —">Contacto</SectionLabel>
          <div className="rounded-2xl border border-surface-border bg-surface/30 p-8 sm:p-10">
            <h2 className="font-serif text-5xl font-semibold sm:text-6xl">Hablemos.</h2>
            <p className="mt-5 text-[13px] text-muted-foreground">Ideas, código, fotografía, música o simplemente una buena conversación.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:hola@delcaribe.dev" className="rounded-md border border-surface-border px-5 py-2.5 text-[13px] font-medium transition hover:border-gold/50 hover:bg-surface">Email ↗</a>
              <a href="https://github.com/DelCaribeX" target="_blank" rel="noreferrer" className="rounded-md bg-gold px-5 py-2.5 text-[13px] font-medium text-background transition hover:bg-gold-soft">GitHub ↗</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-surface-border">
        <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-3 px-6 py-7 text-[11px] text-muted-foreground sm:px-8">
          <span>© 2026 <b className="text-foreground">DelCaribe</b></span>
          <span className="uppercase tracking-[0.16em]">Built with curiosity, code & caffeine.</span>
        </div>
      </footer>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => event.currentTarget === event.target && setSelected(null)}
            className="fixed inset-0 z-[95] flex items-end justify-center bg-black/80 p-3 backdrop-blur-md sm:items-center sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="w-full max-w-xl rounded-2xl border border-surface-border bg-[#0d0d0f] p-7 sm:p-9"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-3xl">{selected.icon}</div>
                  <div className="mt-5 text-[10px] uppercase tracking-[0.32em] text-gold">{selected.tag}</div>
                </div>
                <button onClick={() => setSelected(null)} className="h-10 w-10 rounded-full border border-surface-border text-muted-foreground" aria-label="Cerrar">×</button>
              </div>
              <h2 className="mt-7 font-serif text-4xl font-semibold sm:text-5xl">{selected.title}</h2>
              <p className="mt-5 text-[14px] leading-[1.9] text-muted-foreground">{selected.body}</p>
              <div className="mt-8 border-t border-surface-border pt-7">
                {selected.href ? (
                  <a href={selected.href} className="rounded-md bg-gold px-5 py-2.5 text-[13px] font-medium text-background transition hover:bg-gold-soft">Abrir archivo ↗</a>
                ) : (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Este universo seguirá creciendo.</span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
