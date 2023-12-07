"use client";

import { ActionCard, CardRef } from "@/components/ActionCard";
import Card, { CardProps } from "@/components/Card";
import { useCombatState } from "@/state/CombatState";
import { useEffect, useState } from "react";

export default function () {
  const actionCards: (CardRef | null)[] = [];

  const {
    turn,
    enemyDeck,
    playerDeck,
    playerTurnState,
    setSelectedCardForActionState,
  } = useCombatState();
  const [_, refreshView] = useState<any>(null);

  useEffect(() => {
    actionCards
    .sort((x) => (x ? x?.props.id : 0))
    .forEach((card, i) => {
      if (!card || !card.el) return;
      const durationMs = 50 * (i + 1);

      card.el.style.opacity = "0";
      card.el.style.left = "0px";
      card.el.style.transitionDuration = `0ms`;
      card.el.style.transitionTimingFunction =
        "cubic-bezier(0.4, 0, 0.2, 1)";
      card.el.style.transform = "translateX(0px)";

      setTimeout(() => {
        if (!card.el) return;
        card.el.style.opacity = "1";
        card.el.style.left = "500px";
        card.el.style.transitionDuration = `${durationMs}ms`;
        card.el.style.transitionProperty = `transform, opacity`;
        card.el.style.transitionTimingFunction =
          "cubic-bezier(0.4, 0, 0.2, 1)";
        card.el.style.transform = "translateX(-500px)";
      }, durationMs);
    });
  }, [_])

  const onCardSelected = (props: CardProps) => {
    setSelectedCardForActionState(props);
    refreshView({});
  };

  return (
    <div className="flex w-full h-full justify-center p-10 select-none transition-transform">
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
        <div className="relative h-full flex gap-1 justify-center overflow-clip">
          {playerTurnState.selectedCardForAction &&
            playerDeck.characterCards
              .find((c) => c.id === playerTurnState.selectedCardForAction?.id)
              ?.actionCards?.map((card, i) => (
                <ActionCard
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  index={i}
                  ref={(ref) =>
                    !actionCards.find((x) => x?.props.id === card.id) &&
                    actionCards.push(ref)
                  }
                />
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
