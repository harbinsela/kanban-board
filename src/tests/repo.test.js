import { describe, it, expect, beforeEach } from "vitest";
import { createCard, deleteCard, listCards } from "../repo/cardsRepo.js";
import { readStore, writeStore } from "../utils/storage.js";

// reset storage before each test
beforeEach(() => {
  const emptyDB = { boards: [], columns: [], cards: [] };
  writeStore(emptyDB);
});

describe("Cards Repo", () => {
  it("should create a new card", () => {
    const boardId = "board1";
    const card = createCard(boardId, "Test Card", "Some description", "High");

    const db = readStore();
    expect(db.cards.length).toBe(1);
    expect(db.cards[0].title).toBe("Test Card");
    expect(db.cards[0].severity).toBe("High");
  });

  it("should delete a card", () => {
    const boardId = "board1";
    const card = createCard(boardId, "Delete Me");

    deleteCard(card.id);

    const db = readStore();
    expect(db.cards.length).toBe(0);
  });
});
