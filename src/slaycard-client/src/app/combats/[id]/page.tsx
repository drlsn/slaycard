"use client";

import ActionCard from "@/components/ActionCard";
import Card, { CardProps } from "@/components/Card";
import { useCombatState } from "@/state/CombatState";
import { useState } from "react";

export default function () {
  const { turn, playerTurnState, setSelectedCardForActionState } = useCombatState();
  const [_, refreshView] = useState<any>(null)

  const onCardSelected = (props: CardProps) => {
    setSelectedCardForActionState(props)
    refreshView({})
  };

  return (
    <div className="flex w-full h-full justify-center p-10 select-none">
      <div className="w-full h-full flex flex-col gap-1">
        <div className="relative h-full flex gap-1 justify-center"></div>
        <div className="relative h-full flex gap-1 justify-center">
          <Card id={0} name="bandit" isOfPlayer={false} isSelected={false} />
          <Card id={0} name="imp" isOfPlayer={false} isSelected={false} />
          <Card id={0} name="ghul" isOfPlayer={false} isSelected={false} />
        </div>
        <div className="relative h-full flex gap-1 justify-center"></div>
        <div className="relative h-full flex gap-1 justify-center">
          <ActionCard name="Mid Melee" />
          <ActionCard name="Big Melee" />
          <ActionCard name="Mid Blast" />
          <ActionCard name="Mid Blast" />
          <ActionCard name="Big Blast" />
        </div>
        <div className="relative h-full flex gap-1 justify-center">
          <Card
            id={11}
            name="Cedric"
            isOfPlayer={true}
            isSelected={playerTurnState.selectedCardForAction?.id === 11}
            onSelected={onCardSelected}
          />
          <Card
            id={12}
            name="Elessandra"
            isOfPlayer={true}
            isSelected={playerTurnState.selectedCardForAction?.id === 12}
            onSelected={onCardSelected}
          />
          <Card
            id={13}
            name="Gurdoc"
            isOfPlayer={true}
            isSelected={playerTurnState.selectedCardForAction?.id === 13}
            onSelected={onCardSelected}
          />
        </div>
        <div className="relative h-full flex gap-1 justify-center" />
      </div>
    </div>
  );
}
