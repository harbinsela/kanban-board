import { readStore, writeStore } from "../utils/storage.js";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";

export function listBoards() {
  const db = readStore();

  // If first time, create the 3 static boards
  if (!db.boards.length) {
    const now = dayjs().toISOString();
    ["Backlog", "In Progress", "Done"].forEach(name => {
      db.boards.push({
        id: uuid(),
        name,
        createdAt: now,
        updatedAt: now
      });
    });
    writeStore(db);
  }

  return db.boards;
}

export function createBoard(name) {
  const db = readStore();
  const now = dayjs().toISOString();
  const board = { id: uuid(), name, createdAt: now, updatedAt: now };
  db.boards.push(board);
  writeStore(db);
  return board;
}

export function renameBoard(boardId, newName) {
  const db = readStore();
  const board = db.boards.find(b => b.id === boardId);
  if (!board) return null;
  board.name = newName;
  board.updatedAt = dayjs().toISOString();
  writeStore(db);
  return board;
}

export function deleteBoard(boardId) {
  const db = readStore();
  // Don't delete if fewer than 3 (keep the static ones safe)
  if (db.boards.length <= 3) return false;
  db.boards = db.boards.filter(b => b.id !== boardId);
  writeStore(db);
  return true;
}
