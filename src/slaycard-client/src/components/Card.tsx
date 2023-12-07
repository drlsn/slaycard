"use client";

import { createShadow, clearCanvas } from "@/core/canvas/CanvasFunctions";
import { useCardSelectionState } from "@/state/CardSelectedState";
import { use, useEffect, useRef, useState } from "react";

export type CardProps = {
  id: number;
  name: string;
  hp: number;
  energy: number;
  attack: number;
  isOfPlayer: boolean;
  isSelected: boolean;
  onSelected?: (card: CardProps) => void;
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
    window.removeEventListener("touchmove", onTouchMove);
  };

  useEffect(() => {
    if (!isSelectedLocal) return;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("keydown", onKeyDown);
    return unselect;
  }, [isSelectedLocal]);

  const onMouseMove = (ev: MouseEvent) => {
    drawLine(ev.clientX, ev.clientY);
  };

  const onTouchMove = (ev: TouchEvent) => {
    drawLine(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
  };

  const drawLine = (x1: number, y1: number) => {
    if (!ref.current || !canvasRef.current) return;

    const rect = ref.current.getBoundingClientRect();

    clearCanvas(canvasRef.current);
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height * 0.05;

    createShadow(canvasRef.current, { x, y, x1, y1 });
  };

  const onKeyDown = (ev: KeyboardEvent) => {
    setSelectedLocal(false);
  };

  return (
    <div
      ref={ref}
      onClick={() => {
        props.onSelected && props.onSelected(props);
      }}
      className={`relative bg-slate-700 h-full rounded-lg flex flex-col items-center pt-10 shadow-2xl
        ${isSelectedLocal && "z-10"} ${
          (props.isSelected ||
            !isSelected ||
            (isSelected && !props.isOfPlayer)) &&
          "cursor-pointer hover:bg-slate-800 active:bg-slate-900"
        }
        ${
          props.isSelected && "bg-slate-900 outline-lime-600 outline outline-2"
        }`}
      style={{ aspectRatio: 1 / 1.5 }}
    >
      <div
        className="hp absolute top-[3%] left-[6%] w-[20%] flex justify-center items-center bg-red-500 rounded-md"
        style={{ aspectRatio: 1 / 1 }}
      >
        <span
          className="absolute text-white font-bold"
          style={{ fontSize: "1.3cqh" }}
        >
          {props.hp}
        </span>
      </div>
      <div
        className="hp absolute top-[3%] right-[6%] w-[20%] flex justify-center items-center bg-black rounded-md"
        style={{ aspectRatio: 1 / 1 }}
      >
        <span
          className="absolute text-white font-bold"
          style={{ fontSize: "1.3cqh" }}
        >
          {props.attack}
        </span>
      </div>
      <div
        className="hp absolute bottom-[3%] left-[6%] w-[20%] flex justify-center items-center bg-yellow-600 rounded-md"
        style={{ aspectRatio: 1 / 1 }}
      >
        <span
          className="absolute text-white font-bold"
          style={{ fontSize: "1.3cqh" }}
        >
          {props.energy}
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
