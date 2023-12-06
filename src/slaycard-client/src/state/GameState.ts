import { RowType } from "@/app/types/types";
import { create } from "zustand";

const cardsData: CardVM[] = [
  { id: 0, points: 3, imagePath:"bardock-ki-blast-1.jpg", rowType: RowType.Distant },
  { id: 1, points: 5, imagePath:"goku-genki-dama-1.jpg", rowType: RowType.Huge },
  { id: 2, points: 1, imagePath:"goku-kamehame-1.jpg", rowType: RowType.Huge },
  { id: 3, points: 5, imagePath:"vegeta-final-flash-1.jpg", rowType: RowType.Huge },
  { id: 4, points: 4, imagePath:"krillin-disc-1.jpg", rowType: RowType.Distant },
  { id: 5, points: 7, imagePath:"gohan-kame-1.png", rowType: RowType.Huge },
  { id: 6, points: 5, imagePath:"picollo-strike.jpg", rowType: RowType.Melee },
  { id: 7, points: 8, imagePath:"trunks-rage-1.jpg", rowType: RowType.Melee },
  { id: 9, points: 7, imagePath:"yamucha-wolf-1.jpg", rowType: RowType.Melee },
  { id: 10, points: 9, imagePath:"18-ball-1.jpg", rowType: RowType.Distant },
  { id: 11, points: 3, imagePath:"brolly-strike.png", rowType: RowType.Melee },
  { id: 12, points: 2, imagePath:"17-shield-1.jpg", rowType: RowType.Melee },
  { id: 13, points: 3, imagePath:"gotenks-kamikaze-1.png", rowType: RowType.Distant },
  { id: 14, points: 2, imagePath:"bulma.jpg", rowType: RowType.MeleeOrDistant },
  { id: 15, points: 1, imagePath:"ub-blast.png", rowType: RowType.Distant },
]

type CardRowVM = {
  cards: CardVM[];
};

type CardVM = {
  id: number;
  points: number;
  imagePath: string;
  rowType: RowType
};

type GameState = {
  cardRows: CardRowVM[];
  addCard: (cardId: number, targetRow: number) => void;
};

export const useGameState = create<GameState>()((set, get) => ({
  cardRows: [
    { cards: [] },
    { cards: [] },
    { cards: [] },
    { cards: [] },
    { cards: [] },
    { cards: [] },
    { cards: cardsData },
  ],

  addCard: (cardId: number, targetRowIndex: number) => {
    const oldState = get();
    const state = { cardRows: oldState.cardRows, addCard: oldState.addCard };

    const row = state.cardRows.find((row) =>
      row.cards.find((x) => x.id === cardId)
    );

    const card = row?.cards
      .map((card, i) => ({ value: card, i }))
      .find((card) => card.value.id === cardId);

    if (!row || !card) return;
    row?.cards.splice(card.i, 1);
    state.cardRows[targetRowIndex].cards.push(card.value);

    set(state);
  },
}));
