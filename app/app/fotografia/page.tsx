export default function FotografiaPage() {
  const fotos = [
    "/fotos/foto1.png",
    "/fotos/foto2.jpeg",
    "/fotos/foto3.jpeg",
    "/fotos/foto4.jpeg",
    "/fotos/foto5.jpeg",
    "/fotos/foto6.jpeg",
    "/fotos/foto7.jpeg",
  ];

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10">
        Galería Fotográfica
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fotos.map((foto) => (
          <img
            key={foto}
            src={foto}
            alt=""
            className="w-full rounded-xl"
          />
        ))}
      </div>
    </main>
  );
}
