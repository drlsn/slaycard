import { CardProps } from "@/components/Card";
import { create } from "zustand";

type CombatState = {
  turn: Turn
  playerTurnState: PlayerTurnState
  setCombatState: (turn: Turn) => void
  setSelectedCardForActionState: (card: CardProps) => void
}

export const useCombatState = create<CombatState>()((set, get) => ({
  turn: Turn.Player,
  playerTurnState: { selectedCardForAction: undefined },
  setCombatState: (turn: Turn) => set({ turn, playerTurnState: get().playerTurnState }),
  setSelectedCardForActionState: (card: CardProps) => {
    const prev = get()
    prev.playerTurnState.selectedCardForAction = card
    set(prev)
  }
}))

enum Turn { Player, Enemy }

type PlayerTurnState = { 
  selectedCardForAction: CardProps | undefined
}
