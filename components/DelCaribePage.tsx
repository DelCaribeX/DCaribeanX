"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Interest = {
  index: string;
  tag: string;
  title: string;
  desc: string;
  body: string;
  keywords: string[];
  href?: string;
};

const interests: Interest[] = [
  { index: "01", tag: "SONIDO", title: "Música", desc: "Géneros, texturas y estados de ánimo.", body: "La música es arquitectura invisible: ritmo, capas y silencios capaces de cambiar por completo la lectura de un momento.", keywords: ["electrónica", "atmósfera", "ritmo"] },
  { index: "02", tag: "CULTURA", title: "Anime", desc: "Arte, narrativa y filosofía en movimiento.", body: "Me interesa cuando la animación deja de ser solo estética y se convierte en una forma distinta de hablar sobre identidad, conflicto y memoria.", keywords: ["dirección de arte", "narrativa", "Japón"] },
  { index: "03", tag: "LETRAS", title: "Literatura", desc: "Ideas, corrientes y mundos escritos.", body: "Leer es entrar en sistemas de pensamiento ajenos. Busco textos que construyan mundos y también los que cuestionan cómo entendemos el nuestro.", keywords: ["ficción", "ensayo", "historia"] },
  { index: "04", tag: "FOTOS", title: "Fotografía", desc: "Memoria, instante y lectura visual.", body: "Fotografiar es decidir qué merece permanecer. Me atraen el detalle, la textura y las escenas cotidianas que cambian cuando se observan con más tiempo.", keywords: ["archivo", "calle", "memoria"], href: "/fotografia" },
  { index: "05", tag: "VELOCIDAD", title: "Motos", desc: "Diseño, mecánica y libertad.", body: "Las motos mezclan ingeniería, estética y experiencia física. Me interesan tanto por la máquina como por la cultura que se construye alrededor de ella.", keywords: ["mecánica", "diseño", "rutas"] },
  { index: "06", tag: "MUNDOS", title: "Videojuegos", desc: "Narrativa interactiva y dirección de arte.", body: "Un videojuego no solo cuenta una historia: te obliga a habitarla. Me interesan los mundos donde diseño, música y mecánicas funcionan como un solo lenguaje.", keywords: ["worldbuilding", "gameplay", "inmersión"] },
  { index: "07", tag: "PSIQUE", title: "Terror", desc: "Horror psicológico y misterios de la red.", body: "El terror funciona mejor cuando sugiere más de lo que muestra. Me atraen lo psicológico, lo extraño y los rincones de internet donde una historia puede sentirse demasiado real.", keywords: ["horror", "ARG", "misterio"] },
  { index: "08", tag: "1:64", title: "Autos a escala", desc: "Diseño automotriz reducido al detalle.", body: "Coleccionar a escala es estudiar diseño industrial en miniatura: proporciones, líneas, épocas y pequeñas decisiones que hacen reconocible a un auto.", keywords: ["die-cast", "1:64", "colección"] },
  { index: "09", tag: "BUILD", title: "Programación", desc: "Construir, romper y corregir.", body: "El código se volvió otra forma de entender cómo están construidas las cosas. Aprendo haciendo interfaces y convirtiendo ideas en algo que se pueda usar.", keywords: ["Next.js", "JavaScript", "UI"] },
  { index: "10", tag: "ARTE", title: "Tattoos", desc: "Símbolos, composición y memoria.", body: "Me atrae el tatuaje como memoria visual: una mezcla de símbolo, composición e historia personal que existe sobre un soporte vivo.", keywords: ["símbolos", "composición", "blackwork"] },
];

const projects = [
  { n: "01", type: "FOTOGRAFÍA / ARCHIVO", title: "Archivo Fotográfico", desc: "Una selección visual de escenas, detalles y memoria dentro del universo DelCaribe.", href: "/fotografia", cta: "Abrir archivo" },
  { n: "02", type: "WEB / IDENTIDAD", title: "DCaribeanX", desc: "Este portafolio como experimento continuo de identidad, interfaz y movimiento construido con Next.js.", href: "https://github.com/DelCaribeX/DCaribeanX", cta: "Ver código", external: true },
];

const nav = [["#universo", "Universo"], ["#proyectos", "Proyectos"], ["#sobre", "Sobre mí"], ["#contacto", "Contacto"]];

function SectionLabel({ n, children }: { n: string; children: string }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="text-[10px] font-semibold tracking-[0.3em] text-gold">{n}</span>
      <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{children}</span>
      <span className="h-px flex-1 bg-surface-border" />
    </div>
  );
}

export default function DelCaribePage() {
  const [selected, setSelected] = useState<Interest | null>(null);
  const [menu, setMenu] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.2 });

  useEffect(() => {
    document.body.style.overflow = selected || menu ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSelected(null); setMenu(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [selected, menu]);

  return (
    <div className="dc-grain min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <motion.div style={{ scaleX: progress, transformOrigin: "left" }} className="fixed left-0 right-0 top-0 z-[100] h-[2px] bg-gold" />

      <header className="sticky top-0 z-[80] border-b border-surface-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="relative z-[90] text-sm font-semibold">Del<span className="text-gold">Caribe</span></a>
          <nav className="hidden gap-7 text-[12px] text-muted-foreground sm:flex">
            {nav.map(([href, label]) => <a key={href} href={href} className="dc-nav-link">{label}</a>)}
          </nav>
          <button onClick={() => setMenu(!menu)} className="relative z-[90] rounded-full border border-surface-border px-3 py-2 text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:hidden" aria-expanded={menu}>{menu ? "Cerrar" : "Menú"}</button>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-background/95 px-5 pt-28 backdrop-blur-xl sm:hidden">
            <nav className="flex flex-col">
              {nav.map(([href, label], i) => (
                <a key={href} href={href} onClick={() => setMenu(false)} className="border-b border-surface-border py-5 font-serif text-4xl">
                  <span className="mr-3 text-[10px] font-sans tracking-[0.2em] text-gold">0{i + 1}</span>{label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="top" className="relative z-[2] mx-auto max-w-6xl px-5 sm:px-8">
        <section className="relative flex min-h-[88vh] items-center py-20 sm:py-28">
          <div className="dc-hero-grid absolute inset-0 -z-10 opacity-45" />
          <div className="absolute -right-64 top-8 -z-10 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[120px]" />
          <div className="grid w-full gap-14 lg:grid-cols-[1fr_300px] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-9 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-gold"><span className="h-px w-12 bg-gold" />Universo personal / 2026</div>
              <h1 className="font-serif font-black uppercase leading-[0.82] tracking-[-0.06em]">
                <span className="block text-[18vw] sm:text-[116px] lg:text-[138px]">DelCaribe</span>
                <span className="block text-[15vw] text-gold sm:text-[98px] lg:text-[116px]">Colecciona</span>
                <span className="block text-[18vw] sm:text-[116px] lg:text-[138px]">Mundos.</span>
              </h1>
              <p className="mt-10 max-w-xl text-[14px] leading-[1.9] text-muted-foreground">Música, cultura, fotografía, motor, terror y código. Distintos formatos para explorar una misma obsesión: <span className="text-foreground">el detalle y las historias detrás de las cosas.</span></p>
              <div className="mt-9 flex flex-wrap gap-3"><a href="#proyectos" className="dc-button-primary">Ver proyectos ↘</a><a href="#universo" className="dc-button-secondary">Explorar universo</a></div>
            </motion.div>
            <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl border border-surface-border bg-surface/40 p-5">
              <div className="mb-7 flex items-center justify-between"><span className="text-[9px] uppercase tracking-[0.3em] text-gold">Transmisión actual</span><span className="dc-pulse h-2 w-2 rounded-full bg-gold" /></div>
              <div className="space-y-5 text-[12px]">
                <p><span className="block text-muted-foreground">Construyendo</span>DCaribeanX</p>
                <p><span className="block text-muted-foreground">Aprendiendo</span>Frontend & interacción</p>
                <p><span className="block text-muted-foreground">Documentando</span>Fotografía</p>
              </div>
            </motion.aside>
          </div>
        </section>

        <section id="universo" className="scroll-mt-24 border-t border-surface-border py-24">
          <SectionLabel n="01 —">Universo</SectionLabel>
          <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end"><h2 className="font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Diez obsesiones.<br />Un mismo archivo.</h2><p className="max-w-xl text-[13px] leading-[1.85] text-muted-foreground lg:justify-self-end">Cada tarjeta abre una pequeña pieza del universo. Son intereses que explican cómo miro, colecciono y construyo.</p></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {interests.map((item, i) => (
              <motion.button key={item.title} onClick={() => setSelected(item)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.035 }} whileHover={{ y: -5 }} className="group min-h-[210px] rounded-2xl border border-surface-border bg-surface/40 p-5 text-left hover:border-gold/45">
                <div className="flex items-start justify-between"><span className="font-serif text-4xl text-foreground/20 group-hover:text-gold/55">{item.index}</span><span className="rounded-full border border-surface-border px-2 py-1 text-[8px] tracking-[0.22em] text-gold">{item.tag}</span></div>
                <div className="mt-10"><h3 className="font-semibold">{item.title}</h3><p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{item.desc}</p><div className="mt-5 text-[9px] uppercase tracking-[0.22em] text-gold">Entrar ↗</div></div>
              </motion.button>
            ))}
          </div>
        </section>

        <section id="proyectos" className="scroll-mt-24 border-t border-surface-border py-24">
          <SectionLabel n="02 —">Selected works</SectionLabel>
          <h2 className="font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Lo que ya existe.</h2>
          <p className="mt-4 max-w-2xl text-[13px] leading-[1.85] text-muted-foreground">El portafolio crece con proyectos reales. Sin relleno.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <motion.a key={project.title} href={project.href} target={project.external ? "_blank" : undefined} rel={project.external ? "noreferrer" : undefined} whileHover={{ y: -5 }} className="group rounded-3xl border border-surface-border bg-surface/35 p-7 hover:border-gold/45 sm:p-8">
                <div className="mb-14 flex items-start justify-between"><span className="font-serif text-5xl text-foreground/15 group-hover:text-gold/45">{project.n}</span><span className="text-right text-[9px] uppercase tracking-[0.24em] text-muted-foreground">{project.type}</span></div>
                <h3 className="font-serif text-3xl font-semibold sm:text-4xl">{project.title}</h3><p className="mt-4 text-[13px] leading-[1.8] text-muted-foreground">{project.desc}</p><div className="mt-8 text-[10px] uppercase tracking-[0.26em] text-gold">{project.cta} ↗</div>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="sobre" className="scroll-mt-24 border-t border-surface-border py-24">
          <SectionLabel n="03 —">Sobre mí</SectionLabel>
          <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
            <div className="rounded-3xl border border-surface-border bg-surface/30 p-7 sm:p-10"><p className="font-serif text-3xl font-semibold leading-tight sm:text-5xl">No colecciono cosas al azar. <span className="text-gold">Colecciono mundos.</span></p><p className="mt-8 max-w-2xl text-[14px] leading-[1.9] text-muted-foreground">Soy DelCaribe. Me interesan las conexiones entre cultura, diseño, máquinas, imágenes e historias. La programación se volvió otra forma de explorar lo mismo: entender cómo están construidas las cosas y crear las mías.</p></div>
            <div className="rounded-3xl border border-surface-border bg-surface/30 p-7 sm:p-8"><div className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Stack actual</div><div className="mt-6 flex flex-wrap gap-2">{["HTML / CSS", "JavaScript", "Git", "Next.js", "Tailwind", "Framer Motion"].map((skill) => <span key={skill} className="rounded-full border border-gold/30 px-3 py-1.5 text-[11px] text-gold">{skill}</span>)}</div><p className="mt-9 border-t border-surface-border pt-6 text-[12px] leading-relaxed text-muted-foreground">Aprendiendo mediante proyectos pequeños, interfaces y experimentación visual.</p></div>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-24 border-t border-surface-border py-24">
          <SectionLabel n="04 —">Contacto</SectionLabel>
          <div className="relative overflow-hidden rounded-3xl border border-surface-border bg-surface/35 p-8 sm:p-12"><div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/10 blur-[90px]" /><div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><div className="mb-5 text-[9px] uppercase tracking-[0.3em] text-gold">¿Algo interesante?</div><h2 className="font-serif text-5xl font-semibold sm:text-7xl">Hablemos.</h2><p className="mt-5 text-[13px] text-muted-foreground">Ideas, código, fotografía o simplemente una buena conversación.</p></div><div className="flex flex-wrap gap-3"><a href="mailto:hola@delcaribe.dev" className="dc-button-secondary">Email ↗</a><a href="https://github.com/DelCaribeX" target="_blank" rel="noreferrer" className="dc-button-primary">GitHub ↗</a></div></div></div>
        </section>
      </main>

      <footer className="border-t border-surface-border"><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-5 py-7 text-[11px] text-muted-foreground sm:px-8"><span>© 2026 <b className="text-foreground">DelCaribe</b></span><span className="uppercase tracking-[0.16em]">Built with curiosity, code & caffeine.</span></div></footer>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.currentTarget === e.target && setSelected(null)} className="fixed inset-0 z-[95] flex items-end justify-center bg-black/75 p-3 backdrop-blur-md sm:items-center sm:p-6">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-surface-border bg-background p-7 sm:p-10" role="dialog" aria-modal="true">
              <div className="dc-dialog-grid absolute inset-0 opacity-35" /><div className="relative"><div className="flex items-start justify-between"><div><span className="text-[9px] uppercase tracking-[0.3em] text-gold">Universo {selected.index} / {selected.tag}</span><div className="mt-4 font-serif text-6xl text-foreground/15">{selected.index}</div></div><button onClick={() => setSelected(null)} className="h-10 w-10 rounded-full border border-surface-border text-muted-foreground" aria-label="Cerrar">×</button></div><h2 className="mt-8 font-serif text-4xl font-semibold sm:text-6xl">{selected.title}</h2><p className="mt-6 text-[14px] leading-[1.9] text-muted-foreground">{selected.body}</p><div className="mt-7 flex flex-wrap gap-2">{selected.keywords.map((k) => <span key={k} className="rounded-full border border-surface-border px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{k}</span>)}</div><div className="mt-9 border-t border-surface-border pt-7">{selected.href ? <a href={selected.href} className="dc-button-primary">Abrir archivo ↗</a> : <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Archivo en construcción — este universo seguirá creciendo.</span>}</div></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
