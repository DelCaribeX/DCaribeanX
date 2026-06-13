"use client";

import { useState } from "react";

export default function Fotografia() {
  const fotos = [
    "/fotos/foto1.png",
    "/fotos/foto2.jpeg",
    "/fotos/foto3.jpeg",
    "/fotos/foto4.jpeg",
    "/fotos/foto5.jpeg",
    "/fotos/foto6.jpeg",
    "/fotos/foto7.jpeg",
  ];

  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-10 py-12">

      <a
        href="/"
        className="inline-block mb-10 text-zinc-400 hover:text-white transition"
      >
        ← Volver al portafolio
      </a>

      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold">
          Galería Fotográfica
        </h1>

        <p className="mt-4 text-zinc-400">
          Entender el presente leyendo el pasado a través de la imagen.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {fotos.map((foto, index) => (
          <img
            key={index}
            src={foto}
            alt={`Foto ${index + 1}`}
            onClick={() => setSelected(foto)}
            className="w-full rounded-2xl cursor-pointer hover:scale-[1.02] transition duration-300"
          />
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-8 right-8 text-5xl text-white"
            onClick={() => setSelected(null)}
          >
            ×
          </button>

          <img
            src={selected}
            alt=""
            className="max-h-[90vh] max-w-[90vw] rounded-xl"
          />
        </div>
      )}
    </main>
  );
}
