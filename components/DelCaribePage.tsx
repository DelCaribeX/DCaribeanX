"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const interests = [
  { icon: "🎵", tag: "SONIDO", title: "Música", desc: "Distintos géneros, un solo idioma." },
  { icon: "⛩️", tag: "CULTURA", title: "Anime", desc: "Arte, narrativa y filosofía en movimiento." },
  { icon: "📖", tag: "LETRAS", title: "Literatura", desc: "Corrientes artísticas, no solo páginas." },
  { icon: "📷", tag: "FOTOS", title: "Fotografía", desc: "Entender el presente leyendo el pasado a través de la imagen." },
  { icon: "🏍️", tag: "VELOCIDAD", title: "Motos", desc: "Libertad sobre dos ruedas." },
  { icon: "🎮", tag: "MUNDOS", title: "Videojuegos", desc: "Narrativa interactiva llevada al límite." },
  { icon: "👁️", tag: "PSIQUE", title: "Terror", desc: "Horror psicológico y misterios de la red." },
  { icon: "🚗", tag: "COLECCIÓN", title: "Autos 1:64", desc: "Diseño en miniatura, precisión a escala." },
  { icon: "💻", tag: "BUILD", title: "Programación", desc: "Aprendiendo a construir con código." },
  { icon: "🖋️", tag: "ARTE", title: "Tattoos", desc: "La piel como lienzo permanente." },
];

const skills = ["HTML / CSS", "JavaScript", "Git", "Curiosidad"];
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const cardVariant: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

function Loader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div exit={{ y: -20, opacity: 0, transition: { duration: 0.6, ease: EASE } }} className="flex flex-col items-center gap-6">
            <div className="font-serif text-3xl tracking-tight">Del<span className="text-gold">Caribe</span></div>
            <div className="relative h-px w-40 overflow-hidden bg-surface-border">
              <span className="absolute inset-y-0 left-0 w-1/3 bg-gold dc-loader-bar" />
            </div>
            <div className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase">Cargando universo</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionLabel({ children, index }: { children: string; index?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="flex items-center gap-4 mb-10"
    >
      {index && <span className="text-[10px] tabular-nums tracking-[0.3em] text-gold">{index}</span>}
      <span className="text-[11px] tracking-[0.32em] text-muted-foreground uppercase">{children}</span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
        style={{ transformOrigin: "left" }}
        className="flex-1 h-px bg-gradient-to-r from-surface-border via-surface-border to-transparent"
      />
    </motion.div>
  );
}

function InterestCard({ it }: { it: (typeof interests)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--rx", `${((y / r.height) - 0.5) * -4}deg`);
    el.style.setProperty("--ry", `${((x / r.width) - 0.5) * 4}deg`);
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.setProperty("--rx", `0deg`); el.style.setProperty("--ry", `0deg`);
  };
  return (
    <motion.div
      ref={ref}
      variants={cardVariant}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -5, transition: { duration: 0.35, ease: EASE } }}
      style={{ transform: "perspective(700px) rotateX(var(--rx,0)) rotateY(var(--ry,0))", transformStyle: "preserve-3d" }}
      className="group relative rounded-lg bg-surface border border-surface-border/60 p-5 overflow-hidden transition-[border-color,background,box-shadow] duration-500 hover:border-gold/50 hover:shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--gold)_50%,transparent)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(260px circle at var(--mx,50%) var(--my,0%), color-mix(in oklab, var(--gold) 14%, transparent), transparent 60%)" }}
      />
      <div className="relative">
        <motion.div className="text-2xl mb-5" whileHover={{ scale: 1.18, rotate: -6 }} transition={{ type: "spring", stiffness: 280, damping: 16 }}>
          {it.icon}
        </motion.div>
        <div className="text-[10px] tracking-[0.32em] text-gold uppercase mb-2">{it.tag}</div>
        <div className="text-[15px] font-semibold mb-1.5 tracking-tight">{it.title}</div>
        <div className="text-[12px] text-muted-foreground leading-relaxed">{it.desc}</div>
      </div>
      <span className="pointer-events-none absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
    </motion.div>
  );
}

export default function DelCaribePage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 950); return () => clearTimeout(t); }, []);

  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 90]);
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0.25]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, reduce ? 1 : 0.96]);
  const glowY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : -120]);

  const { scrollYProgress: pageProgress } = useScroll();
  const progress = useSpring(pageProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <div className="dc-grain min-h-screen bg-background text-foreground font-sans antialiased relative">
      <Loader done={loaded} />

      <motion.div style={{ scaleX: progress, transformOrigin: "left" }} className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-gradient-to-r from-gold via-gold-soft to-gold" />

      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-background/65 border-b border-surface-border/40"
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <a href="#top" className="text-[15px] font-semibold tracking-tight">Del<span className="text-gold">Caribe</span></a>
          <nav className="flex items-center gap-6 sm:gap-8 text-[13px] text-muted-foreground">
            {[
              { href: "#universo", label: "Intereses" },
              { href: "#sobre", label: "Sobre mí" },
              { href: "#contacto", label: "Contacto" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="relative hover:text-foreground transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-gold after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </motion.header>

      <main id="top" className="max-w-5xl mx-auto px-6 sm:px-8 relative z-[2]">
        <motion.section ref={heroRef} style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="pt-24 pb-28 relative">
          <motion.div variants={stagger} initial="hidden" animate={loaded ? "show" : "hidden"} className="relative">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-12">
              <motion.span initial={{ scaleX: 0 }} animate={loaded ? { scaleX: 1 } : {}} transition={{ duration: 1, ease: EASE, delay: 0.3 }} style={{ transformOrigin: "left" }} className="block w-12 h-px bg-gold" />
              <span className="text-[11px] tracking-[0.32em] text-gold uppercase">Portafolio Personal</span>
            </motion.div>

            <h1 className="font-serif font-black leading-[0.92] text-[68px] sm:text-[104px] tracking-[-0.045em]">
              <motion.span variants={fadeUp} className="block text-foreground">Del</motion.span>
              <motion.span variants={fadeUp} className="block">
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                  style={{
                    backgroundImage: "linear-gradient(120deg, var(--gold), var(--gold-soft) 45%, var(--gold) 90%)",
                    backgroundSize: "200% 100%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Caribe
                </motion.span>
              </motion.span>
            </h1>

            <motion.p variants={fadeUp} className="mt-12 max-w-md text-[14.5px] leading-[1.85] text-muted-foreground">
              Coleccionista de mundos. <span className="text-foreground font-medium">Música, anime, literatura, terror, códigos.</span> Encuentro patrones donde los demás ven caos — ya sea en la historia, en una pista, o en un bug de las 3am.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-12 flex flex-wrap gap-3">
              <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.25, ease: EASE }} href="#sobre" className="px-5 py-2.5 rounded-md bg-gold text-background text-[13px] font-medium shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--gold)_70%,transparent)] hover:bg-gold-soft transition-colors">
                Conocerme
              </motion.a>
              <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.25, ease: EASE }} href="#contacto" className="px-5 py-2.5 rounded-md border border-surface-border text-[13px] font-medium hover:bg-surface hover:border-gold/40 transition-colors">
                Hablemos
              </motion.a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 1.3 }} className="mt-20 flex items-center gap-3 text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
              <span>Scroll</span>
              <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="block w-px h-6 bg-gradient-to-b from-gold to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div aria-hidden style={{ y: glowY }} className="pointer-events-none absolute -top-24 -right-16 w-[520px] h-[520px] opacity-50 blur-3xl">
            <div className="w-full h-full" style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--gold) 22%, transparent), transparent)" }} />
          </motion.div>
        </motion.section>

        <hr className="border-surface-border" />

        <section id="universo" className="py-24 scroll-mt-24">
          <SectionLabel index="01 —">Universo</SectionLabel>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: EASE }} className="rounded-2xl border border-surface-border bg-surface/30 p-4 sm:p-6 backdrop-blur-sm">
         <motion.div
  variants={stagger}
  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
>
{interests.map((it) => (
  <div key={it.title}>
    {it.tag === "FOTOS" ? (
      <a href="/fotografia">
        <InterestCard it={it} />
    )}
  </div>
))}
</motion.div>
          </motion.div>
</section>
        <section id="sobre" className="py-24 scroll-mt-24">
          <SectionLabel index="02 —">Sobre mí</SectionLabel>
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: EASE }} className="rounded-2xl border border-surface-border bg-surface/30 p-7 sm:p-10">
            <div className="text-[11px] tracking-[0.32em] text-muted-foreground uppercase mb-6">Quién soy</div>
            <p className="text-[16px] leading-[1.9] text-muted-foreground max-w-3xl">
              Soy <span className="text-foreground font-medium">DelCaribe</span> — alguien que vive entre épocas y formatos. No colecciono cosas al azar: cada interés tiene un hilo conector. El terror psicológico y la historia comparten la misma pregunta: <span className="text-foreground">¿por qué los humanos hacemos lo que hacemos?</span> Los autos a escala y el anime tienen la misma respuesta: el detalle importa.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div variants={cardVariant} whileHover={{ y: -3 }} transition={{ duration: 0.3, ease: EASE }} className="rounded-2xl border border-surface-border bg-surface/30 p-7 hover:border-gold/30 transition-colors">
              <div className="text-[11px] tracking-[0.32em] text-muted-foreground uppercase mb-6">Skills</div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <motion.span key={s} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.45, ease: EASE, delay: i * 0.07 }} whileHover={{ y: -2 }} className="px-3 py-1.5 rounded-md border border-gold/40 text-gold text-[12px] cursor-default hover:bg-gold/5 transition-colors">
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={cardVariant} whileHover={{ y: -3 }} transition={{ duration: 0.3, ease: EASE }} className="rounded-2xl border border-surface-border bg-surface/30 p-7 hover:border-gold/30 transition-colors">
              <div className="text-[11px] tracking-[0.32em] text-muted-foreground uppercase mb-6">Actualmente</div>
              <p className="text-[13.5px] text-muted-foreground leading-[1.9]">
                Iniciando en programación, construyendo proyectos pequeños y explorando la web.
              </p>
            </motion.div>
          </motion.div>
        </section>

        <section id="contacto" className="py-24 scroll-mt-24">
          <SectionLabel index="03 —">Contacto</SectionLabel>
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: EASE }} className="relative rounded-2xl border border-surface-border bg-surface/30 p-8 sm:p-12 overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 w-[400px] h-[400px] opacity-40 blur-3xl" style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--gold) 22%, transparent), transparent)" }} />
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-3 tracking-[-0.025em]">Hablemos</h2>
            <p className="text-[13.5px] text-muted-foreground mb-8">Siempre abierto a buenas conversaciones.</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "✉ EMAIL", href: "mailto:hola@delcaribe.dev" },
                { label: "↗ TWITTER", href: "#" },
                { label: "↗ GITHUB", href: "#" },
              ].map((b, i) => (
                <motion.a key={b.label} href={b.href} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE, delay: i * 0.09 }} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="px-4 py-2 rounded-md border border-surface-border text-[12px] tracking-[0.2em] hover:bg-surface hover:border-gold/50 hover:text-gold transition-colors">
                  {b.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-surface-border mt-8 relative z-[2]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-7 flex flex-wrap justify-between gap-3 text-[12px] text-muted-foreground">
          <div>© 2026 <span className="text-foreground">DelCaribe</span>. Todos los derechos reservados.</div>
          <div className="tracking-wider">Construido con intención BITCH.</div>
        </div>
      </footer>
    </div>
  );
}
