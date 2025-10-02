const STORAGE_KEY = "kanban.v1";

export function readStore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const db = { boards: [], columns: [], cards: [] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return db;
  }
  try {
    const db = JSON.parse(raw);
    // ensure arrays exist
    db.boards = db.boards || [];
    db.columns = db.columns || [];
    db.cards = db.cards || [];
    return db;
  } catch (e) {
    if (confirm("Storage corrupted. Reset to empty DB?")) {
      const db = { boards: [], columns: [], cards: [] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      return db;
    }
    // if user cancels, return a safe empty DB
    return { boards: [], columns: [], cards: [] };
  }
}

export function writeStore(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}
