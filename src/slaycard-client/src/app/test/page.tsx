"use client";

import { Coords, clearCanvas, createLine, createShadow } from "@/core/canvas/CanvasFunctions";
import { useEffect, useRef, useState } from "react";

export default function Test() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coords, setCoords] = useState<Coords>({
    x: 10,
    y: 10,
    x1: 100,
    y1: 200,
  });
  const [bob, setBob] = useState(false);

  //const canvasContext: CanvasRenderingContext2D

  const onMouseMove = (ev: MouseEvent) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();

    clearCanvas(canvasRef.current);
    coords.x1 = ev.clientX - rect.x;
    coords.y1 = ev.clientY - rect.y;
    setCoords(coords);

    //createLine(canvasRef.current, coords, { width: 1, color: "rgba(255, 0, 0, 1)" });
    createShadow(canvasRef.current, coords, { width: 1, color: "rgba(255, 0, 0, 1)" });
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className="fixed h-full w-full flex justify-center items-center">
      <canvas
        ref={canvasRef}
        id="canvas"
        className="bg-slate-300 h-full full"
        style={{top: 0}}
      ></canvas>
    </div>
  );
}
