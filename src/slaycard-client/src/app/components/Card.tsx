"use client";

import { useCardSelectionState } from "@/app/state/CardSelectedState";
import { useRef, useState } from "react";
import Image from "next/image";
import { CardBorder, strToBgColor, strToBorderColor, strToShadowColor } from "./ActionCard";

export type CardProps = {
  id: number;
  name: string;
  hp: number;
  energy: number;
  attack: number;
  isOfPlayer: boolean;
  isSelected: boolean;
  imagePath?: string;
  onSelected?: (card: CardProps) => void;
};

export default function Card(props: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSelectedLocal, setSelectedLocal] = useState(false);
  const { isSelected, setSelected } = useCardSelectionState();

  return (
    <div
      ref={ref}
      onClick={() => {
        props.onSelected && props.onSelected(props);
      }}
      className={`relative bg-slate-700 h-full flex flex-col items-center shadow-2xl 
        ${isSelectedLocal && "z-10"} ${
          (props.isSelected ||
            !isSelected ||
            (isSelected && !props.isOfPlayer)) &&
          "cursor-pointer hover:bg-slate-800 active:bg-slate-900"
        }
        ${
          (props.isSelected && strToShadowColor("blue")) || strToShadowColor("white")
        }`}
      style={{ aspectRatio: 1 / 1.5 }}
    >
     
      <div className="relative w-full h-full overflow-clip flex flex-col justify-center items-center">
        {props.imagePath && (
          <Image
            className="absolute bg-repeat-y h-full w-full top-0 pointer-events-none"
            src="/bgs/skill-icon-bg.jpg"
            alt="Dope"
            layout="fill"
            objectFit="cover"
          />
        )}
        <div className={`w-1/2 h-1/2 bg-white blur-lg opacity-100 pointer-events-none`} />
        {props.imagePath && (
          <Image
            className="absolute hue-white scale-[175%] translate-y-20"
            src={`${props.imagePath}`}
            alt="Dope"
            layout="fill"
            unoptimized
          />
        )}
      </div>


      <div className={`absolute w-[15%] h-0 ${strToBorderColor("white")} border-1 -top-[1px] -left-[1px] ${strToShadowColor("white")}`} />
      <div className={`absolute w-0 h-[10%] ${strToBorderColor("white")} border-1 -top-[1px] -left-[1px] ${strToShadowColor("white")}`}/>
      <div className={`absolute w-[15%] h-0 ${strToBorderColor("white")} border-1 -bottom-[1px] -right-[1px] ${strToShadowColor("white")}`}/>
      <div className={`absolute w-0 h-[10%] ${strToBorderColor("white")} border-1 -bottom-[1px] -right-[1px] ${strToShadowColor("white")}`}/>
      <div className={`absolute w-[15%] h-0 ${strToBorderColor("white")} border-1 -top-[1px] -right-[1px] ${strToShadowColor("white")}`} />
      <div className={`absolute w-0 h-[10%] ${strToBorderColor("white")} border-1 -top-[1px] -right-[1px] ${strToShadowColor("white")}`}/>
      <div className={`absolute w-[15%] h-0 ${strToBorderColor("white")} border-1 -bottom-[1px] -left-[1px] ${strToShadowColor("white")}`}/>
      <div className={`absolute w-0 h-[10%] ${strToBorderColor("white")} border-1 -bottom-[1px] -left-[1px] ${strToShadowColor("white")}`}/>

      {/* <div
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
      </div> */}
      {/* <span
        className="text-white font-bold w-full text-center"
        style={{ fontSize: "1.3cqh" }}
      >
        {props.name}
      </span> */}
    </div>
  );
}
