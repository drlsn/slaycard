"use client";

import { createShadow, clearCanvas } from "@/app/core/canvas/CanvasFunctions";
import { useCardSelectionState } from "@/app/state/CardSelectedState";
import Image from "next/image";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export type ActionCardProps = {
  id: number;
  name: string;
  index: number;
  imagePath: string;
  color: string;
};

export type CardRef = {
  el: HTMLDivElement | undefined;
  props: ActionCardProps;
};

enum BorderColor {
  Red = "border-red-300",
  Green = "border-green-300",
}

enum BgColor {
  Red = "bg-red-300",
  Green = "bg-green-300",
}

enum ShadowColor {
  Red = "box-shadow-red",
  Green = "box-shadow-green",
}

enum HueColor {
  Red = "hue-red",
  Green = "hue-green",
}

function strToBorderColor(str: string): BorderColor {
  return Object.values(BorderColor).find(c => c.includes(str)) || BorderColor.Red
}

function strToBgColor(str: string): BgColor {
  return Object.values(BgColor).find(c => c.includes(str)) || BgColor.Red
}

function strToShadowColor(str: string): ShadowColor {
  return Object.values(ShadowColor).find(c => c.includes(str)) || ShadowColor.Red
}

function strToHueColor(str: string): HueColor {
  return Object.values(HueColor).find(c => c.includes(str)) || HueColor.Red
}

type CardBorderProps = {
  borderColor: BorderColor;
  blurColor: BgColor;
  shadowColor: ShadowColor;
}

function CardBorder(props: CardBorderProps) {
  return (
    <>
      <div className={`absolute w-[15%] h-0 ${props.borderColor} border-1 -top-[1px] -left-[1px] ${props.shadowColor}`} />
      <div className={`absolute w-0 h-[15%] ${props.borderColor} border-1 -top-[1px] -left-[1px] ${props.shadowColor}`}/>
      <div className={`absolute w-[15%] h-0 ${props.borderColor} border-1 -bottom-[1px] -right-[1px] ${props.shadowColor}`}/>
      <div className={`absolute w-0 h-[15%] ${props.borderColor} border-1 -bottom-[1px] -right-[1px] ${props.shadowColor}`}/>
      <div className={`w-1/2 h-1/2 ${props.blurColor} blur-lg opacity-100 pointer-events-none`} />
    </>
  )
}

export const ActionCard = forwardRef<CardRef, ActionCardProps>(
  (props, fRef) => {
    const ref = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isSelectedLocal, setSelectedLocal] = useState(false);
    const { isSelected, setSelected } = useCardSelectionState();

    useImperativeHandle(
      fRef,
      () => {
        return { el: ref.current as HTMLDivElement, props: props };
      },
      [fRef]
    );

    const select = () => {
      if (!ref || isSelected) return;
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
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", unselect);
    };

    useEffect(() => {
      if (!isSelectedLocal) return;
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("mouseup", unselect);
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

    return (
      <>
        <div
          ref={ref}
          onTouchStart={() => select()}
          onTouchEnd={() => unselect()}
          onMouseDown={select}
          onMouseUp={unselect}
          className={`relative bg-slate-700 h-[50%] flex flex-col items-center justify-center shadow-md ${strToShadowColor(props.color)}
        ${isSelectedLocal && "z-10 "} ${
          !isSelected &&
          "cursor-pointer hover:bg-slate-800 active:bg-slate-900"
        }`}
          style={{ aspectRatio: 1 / 1 }}
        >
          {props.imagePath && (
            <Image
              className="absolute w-full h-full -z-10 pointer-events-none"
              // src={`${props.imagePath}`}
              src="/bgs/skill-icon-bg.jpg"
              alt="Dope"
              layout="fill"
              objectFit="cover"
            />
          )}

          <CardBorder 
            borderColor={strToBorderColor(props.color)} 
            blurColor={strToBgColor(props.color)} 
            shadowColor={strToShadowColor(props.color)} />

          <div className="absolute w-[75%] h-[75%] pointer-events-none">
            {props.imagePath && (
              <>
                {/* <Image
                  className="absolute pointer-events-none opacity-60 hue-red-blur blur-sm"
                  src="/skills/weapons/swords.png"
                  // src="/skills/orbs/row-1-column-3.jpg"
                  alt="Dope"
                  layout="fill"
                  objectFit="cover"
                /> */}
                <Image
                  className={`absolute pointer-events-none ${strToHueColor(props.color)}`}
                  src="/skills/weapons/swordz.png"
                  // src="/skills/orbs/row-1-column-3.jpg"
                  alt="Dope"
                  layout="fill"
                  objectFit="cover"
                />
                {/* <div className="w-full h-full bg-red-500" /> */}
              </>
            )}
          </div>

          <div className={`${isSelectedLocal && "z-10"} ${
              !isSelected &&
              "fixed cursor-pointer bg-slate-800 opacity-0 hover:opacity-40 w-full h-full -z-10"
            }`} />
          <span
            className="text-white font-bold w-full text-center"
            style={{ fontSize: "1.3cqh" }}
          >
            {/*   {props.name} */}
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
);
