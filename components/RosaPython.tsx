"use client";

import { useEffect, useRef } from "react";

export default function RosaPython() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.translate(canvas.width / 2, canvas.height / 2);

    const colores = ["white", "#ffcb7d", "#FFA216"];

    for (let i = 0; i < 360; i++) {
      const colorIndex = Math.floor(i / 15) % 3;
      ctx.strokeStyle = colores[colorIndex];
      ctx.lineWidth = 2;

      const r = 5 + i / 2;

      ctx.beginPath();

      for (let a = 0; a < 360; a += 2) {
        const t = (a * Math.PI) / 180;

        const x =
          Math.cos(t) *
          r *
          Math.sin((i + a) * Math.PI / 180);

        const y =
          Math.sin(t) *
          r *
          Math.sin((i + a) * Math.PI / 180);

        if (a === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      ctx.rotate((Math.PI / 180) * 2);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        className="rounded-2xl border border-zinc-800"
      />
    </div>
  );
}
