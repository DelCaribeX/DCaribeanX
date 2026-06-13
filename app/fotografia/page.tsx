export default function Fotografia() {
  return (
    <main className="min-h-screen bg-black text-white px-10 py-20">
<a href="/" className="inline-block mb-10 text-zinc-400 hover:text-white transition">
  ← Volver al portafolio
</a>
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold">
          Galería Fotográfica
        </h1>

        <p className="mt-4 text-zinc-400">
          Entender el presente leyendo el pasado a través de la imagen.
        </p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        <img src="/fotos/foto1.png" className="w-full rounded-xl" />
        <img src="/fotos/foto2.jpeg" className="w-full rounded-xl" />
        <img src="/fotos/foto3.jpeg" className="w-full rounded-xl" />
        <img src="/fotos/foto4.jpeg" className="w-full rounded-xl" />
        <img src="/fotos/foto5.jpeg" className="w-full rounded-xl" />
        <img src="/fotos/foto6.jpeg" className="w-full rounded-xl" />
        <img src="/fotos/foto7.jpeg" className="w-full rounded-xl" />
      </div>

    </main>
  )
}
