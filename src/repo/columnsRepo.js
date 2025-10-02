import { readStore } from "../utils/storage.js";

export function listColumns(boardId) {
  const db = readStore();
  return db.columns.filter(c => c.boardId === boardId).sort((a,b) => a.order - b.order);
}
