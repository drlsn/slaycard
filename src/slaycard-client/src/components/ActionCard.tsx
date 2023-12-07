"use client";

import { createShadow, clearCanvas } from "@/core/canvas/CanvasFunctions";
import { useCardSelectionState } from "@/state/CardSelectedState";
import { useEffect, useRef, useState } from "react";

export type ActionCardProps = {
  id: number
  name: string
};

export default function ActionCard(props: ActionCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSelectedLocal, setSelectedLocal] = useState(false);
  const { isSelected, setSelected } = useCardSelectionState();

  const select = () => {
    if (!ref.current || isSelected) return;
    if (isSelectedLocal) {
      unselect(); return
    }

    setSelectedLocal(!isSelectedLocal);
    setSelected(true, undefined);
  };

  const unselect = () => {
    console.log('unselect')
    setSelectedLocal(false);
    setSelected(false, undefined);
  };

  useEffect(() => {
    if (!isSelectedLocal) return;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", unselect);
    return unselect
  }, [isSelectedLocal]);

  const onMouseMove = (ev: any) => {
    if (!ref.current || !canvasRef.current) return;
    const rect = ref.current.getBoundingClientRect();

    clearCanvas(canvasRef.current);
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height * 0.05;
    const x1 = ev.clientX;
    const y1 = ev.clientY;

    createShadow(canvasRef.current, { x, y, x1, y1 });
  };

  return (
    <>
      <div
        ref={ref}
        onDrag={ev => onMouseMove(ev)}
        onMouseDown={select}
        onMouseUp={unselect}
        className={`relative bg-slate-700 h-[50%] rounded-lg flex flex-col items-center justify-center shadow-2xl
        ${ isSelectedLocal && "z-10" } ${!isSelected && "cursor-pointer hover:bg-slate-800 active:bg-slate-900 "}`}
        style={{ aspectRatio: 1 / 1 }}
      >
        <span
          className="text-white font-bold w-full text-center"
          style={{ fontSize: "1.3cqh" }}
        >
          {props.name}
        </span>
      </div>
      {isSelectedLocal && (
        <>
          <canvas
            ref={canvasRef}
            className="fixed w-full h-full pointer-events-none cursor-none"
          ></canvas>
        </>
      )}
    </>
  );
}
