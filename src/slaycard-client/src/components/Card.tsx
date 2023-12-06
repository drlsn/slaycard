"use client";

import { createShadow, clearCanvas } from "@/core/canvas/CanvasFunctions";
import { useCardSelectionState } from "@/state/CardSelectedState";
import { use, useEffect, useRef, useState } from "react";

export type CardProps = {
  name: string;
  isOfPlayer: boolean;
};

export default function Card(props: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSelectedLocal, setSelectedLocal] = useState(false);
  const { isSelected, setSelected } = useCardSelectionState();

  const select = () => {
    if (!ref.current || isSelected) return;
    if (isSelectedLocal) {
      unselect();
      return;
    }

    setSelectedLocal(!isSelectedLocal);
    setSelected(true, undefined);
  };

  const unselect = () => {
    setSelectedLocal(false);
    setSelected(false, undefined);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("keydown", onKeyDown);
  };

  useEffect(() => {
    if (!isSelectedLocal) return;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown);
    return unselect;
  }, [isSelectedLocal]);

  const onMouseMove = (ev: MouseEvent) => {
    if (!ref.current || !canvasRef.current) return;

    const rect = ref.current.getBoundingClientRect();

    clearCanvas(canvasRef.current);
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height * 0.05;
    const x1 = ev.clientX;
    const y1 = ev.clientY;

    createShadow(canvasRef.current, { x, y, x1, y1 });
  };

  const onKeyDown = (ev: KeyboardEvent) => {
    setSelectedLocal(false);
  };

  return (
    <div
      ref={ref}
      //onClick={select}
      className={`relative bg-slate-700 h-full rounded-lg flex flex-col items-center pt-8 
        ${isSelectedLocal && "z-10"} ${
          !isSelected ||
          (isSelected &&
            !props.isOfPlayer &&
            "cursor-pointer hover:bg-slate-800 active:bg-slate-900 ")
        }`}
      style={{ aspectRatio: 1 / 1.5 }}
    >
      <div
        className="absolute top-[3%] left-[6%] w-[20%] flex justify-center items-center bg-black rounded-md"
        style={{ aspectRatio: 1 / 1 }}
      >
        <span
          className="absolute text-white font-bold -translate-x-[5%] translate-y-[3%]"
          style={{ fontSize: "1.3cqh" }}
        >
          7
        </span>
      </div>
      <span
        className="text-white font-bold w-full text-center"
        style={{ fontSize: "1.3cqh" }}
      >
        {props.name}
      </span>
    </div>
  );
}
