"use client";

import ActionCard from "@/components/ActionCard";
import Card, { CardProps } from "@/components/Card";
import { useCombatState } from "@/state/CombatState";
import { useState } from "react";

export default function () {
  const {
    turn,
    enemyDeck,
    playerDeck,
    playerTurnState,
    setSelectedCardForActionState,
  } = useCombatState();
  const [_, refreshView] = useState<any>(null);

  const onCardSelected = (props: CardProps) => {
    setSelectedCardForActionState(props);
    refreshView({});
  };

  return (
    <div className="flex w-full h-full justify-center p-10 select-none">
      <div className="w-full h-full flex flex-col gap-1">
        <div className="relative h-full flex gap-1 justify-center"></div>
        <div className="relative h-full flex gap-1 justify-center">
          {enemyDeck.characterCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              isOfPlayer={false}
              isSelected={false}
              hp={card.hp}
              energy={card.energy}
              attack={card.attack}
            />
          ))}
        </div>
        <div className="relative h-full flex gap-1 justify-center"></div>
        <div className="relative h-full flex gap-1 justify-center">
          {playerDeck.actionCards.map((card) => (
            <ActionCard key={card.id} id={card.id} name={card.name} />
          ))}
        </div>
        <div className="relative h-full flex gap-1 justify-center">
          {playerDeck.characterCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              isOfPlayer={true}
              isSelected={playerTurnState.selectedCardForAction?.id === card.id}
              onSelected={onCardSelected}
              hp={card.hp}
              energy={card.energy}
              attack={card.attack}
            />
          ))}
        </div>
        <div className="relative h-full flex gap-1 justify-center" />
      </div>
    </div>
  );
}
