import RosaPython from "@/components/RosaPython";

export default function RosaPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <a
        href="/"
        className="text-zinc-400 hover:text-white"
      >
        ← Volver
      </a>

      <h1 className="text-6xl font-bold text-center mb-8">
        Rosa en Python
      </h1>

      <p className="text-center text-zinc-400 mb-10">
        Conversión de Turtle a Canvas.
      </p>

      <RosaPython />
    </main>
  );
}
