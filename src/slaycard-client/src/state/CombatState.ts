import { CardProps } from "@/components/Card";
import { create } from "zustand";

const enemyDeck: CardDeckVM = {
  characterCards: [
    { id: 1, name: "Goblin", hp: 6, attack: 3, energy: 5 },
    { id: 2, name: "Imp", hp: 2, attack: 4, energy: 3 },
  ],
  actionCards: [
    { id: 10, name: "Melee", energyCost: 2, damageFactor: 0.8 },
    { id: 11, name: "Blast", energyCost: 2, damageFactor: 0.8 },
    { id: 12, name: "Fire", energyCost: 2, damageFactor: 0.8 },
    { id: 13, name: "Storm", energyCost: 2, damageFactor: 0.8 },
    { id: 14, name: "Bolt", energyCost: 2, damageFactor: 0.8 },
  ],
};

const playerDeck: CardDeckVM = {
  characterCards: [
    { id: 1, name: "Ellesandra", hp: 6, attack: 3, energy: 5 },
    { id: 2, name: "Garmir", hp: 2, attack: 4, energy: 3 },
    { id: 3, name: "Tuvial", hp: 2, attack: 4, energy: 3 },
  ],
  actionCards: [
    { id: 1, name: "Melee", energyCost: 2, damageFactor: 0.8 },
    { id: 2, name: "Blast", energyCost: 2, damageFactor: 0.8 },
    { id: 3, name: "Fire", energyCost: 2, damageFactor: 0.8 },
    { id: 4, name: "Storm", energyCost: 2, damageFactor: 0.8 },
    { id: 5, name: "Bolt", energyCost: 2, damageFactor: 0.8 },
  ],
};

type CombatState = {
  enemyDeck: CardDeckVM;
  playerDeck: CardDeckVM;
  turn: Turn;
  playerTurnState: PlayerTurnState;
  setCombatState: (turn: Turn) => void;
  setSelectedCardForActionState: (card: CardProps) => void;
};

export const useCombatState = create<CombatState>()((set, get) => ({
  enemyDeck: enemyDeck,
  playerDeck: playerDeck,
  turn: Turn.Player,
  playerTurnState: { selectedCardForAction: undefined },
  setCombatState: (turn: Turn) => {
    const state = get();
    state.turn = turn
    set(state);
  },

  setSelectedCardForActionState: (card: CardProps) => {
    const state = get();
    state.playerTurnState.selectedCardForAction = card;
    set(state);
  },
}));

enum Turn {
  Player,
  Enemy,
}

type PlayerTurnState = {
  selectedCardForAction: CardProps | undefined;
};

type CardVM = {
  id: number;
  name: string;
  hp: number;
  attack: number;
  energy: number;
};

type ActionCardVM = {
  id: number;
  name: string;
  energyCost: number;
  damageFactor: number;
};

type CardDeckVM = {
  characterCards: CardVM[];
  actionCards: ActionCardVM[];
};
