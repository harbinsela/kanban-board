import { readStore, writeStore } from "../utils/storage.js";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

export function listCards(boardId) {
  const db = readStore();
  db.cards = db.cards || [];
  return db.cards
    .filter(c => c.boardId === boardId)
    .sort((a, b) => a.order - b.order);
}

export function createCard(boardId, title, description = "", severity = "Low") {
  const db = readStore();
  db.cards = db.cards || [];
  const now = dayjs().toISOString();
  const order = (db.cards.filter(c => c.boardId === boardId).slice(-1)[0]?.order || 0) + 1;
  const card = {
    id: uuid(),
    boardId,
    title,
    description,
    severity, // "High", "Medium", "Low"
    order,
    createdAt: now,
    updatedAt: now
  };
  db.cards.push(card);
  writeStore(db);
  return card;
}


export function moveCard(cardId, newBoardId, newIndex) {
  const db = readStore();
  db.cards = db.cards || [];
  const card = db.cards.find(c => c.id === cardId);
  if (!card) return;

  const oldBoardId = card.boardId;

  // Update the card's board and tentative order
  card.boardId = newBoardId;
  card.order = newIndex;
  card.updatedAt = dayjs().toISOString();

  // DESTINATION: build ordered list including the moved card at newIndex
  const destList = db.cards
    .filter(c => c.boardId === newBoardId && c.id !== cardId)
    .sort((a, b) => a.order - b.order);

  // Insert card object reference at position newIndex-1
  destList.splice(newIndex - 1, 0, card);

  // Re-assign orders for dest board
  destList.forEach((c, i) => (c.order = i + 1));

  // SOURCE: fix ordering for the old board (remove the moved card)
  const srcList = db.cards
    .filter(c => c.boardId === oldBoardId && c.id !== cardId)
    .sort((a, b) => a.order - b.order);
  srcList.forEach((c, i) => (c.order = i + 1));

  writeStore(db);
  return card;
}

export function deleteCard(cardId) {
  const db = readStore();
  db.cards = db.cards || [];
  db.cards = db.cards.filter(c => c.id !== cardId);
  writeStore(db);
}
