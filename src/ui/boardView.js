// src/ui/boardView.js
import { listBoards, createBoard, renameBoard, deleteBoard } from "../repo/boardsRepo.js";
import { listCards, createCard } from "../repo/cardsRepo.js";
import { renderCard } from "./cardView.js";
import { renderAndEnable } from "../main.js"; // import for re-binding drag & drop

const boardContainer = document.getElementById("board");
const createBoardBtn = document.getElementById("create-board-btn");

export function renderBoardUI() {
  const boards = listBoards();
  boardContainer.innerHTML = "";

  boards.forEach(board => {
    const boardEl = document.createElement("div");
    boardEl.className = "board";
    boardEl.dataset.id = board.id;

    boardEl.innerHTML = `
      <div class="board-header">
        <h2>${board.name}</h2>
        <div>
          <button class="rename-board">Rename</button>
          <button class="delete-board">Delete</button>
          <button class="add-card">Add Card</button>
        </div>
      </div>
      <div class="cards"></div>
    `;

    // Load cards for this board
    const cards = listCards(board.id);
    const cardsContainer = boardEl.querySelector(".cards");
    cards.forEach(c => cardsContainer.appendChild(renderCard(c)));

    boardContainer.appendChild(boardEl);

    // Rename board
    boardEl.querySelector(".rename-board").addEventListener("click", () => {
      const newName = prompt("Rename board:", board.name);
      if (newName) {
        renameBoard(board.id, newName);
        renderAndEnable(); // re-bind drag & drop
      }
    });

    // Delete board
    boardEl.querySelector(".delete-board").addEventListener("click", () => {
      if (confirm("Delete this board?")) {
        const ok = deleteBoard(board.id);
        if (!ok) alert("You cannot delete the 3 default boards!");
        renderAndEnable(); // re-bind drag & drop
      }
    });

    // Add card (with title, description, severity)
    boardEl.querySelector(".add-card").addEventListener("click", () => {
      const title = prompt("Card title:");
      if (!title) return;

      const description = prompt("Card description:") ?? "";
      const severity = prompt("Severity (High, Medium, Low):", "Low") ?? "Low";

      createCard(board.id, title, description, severity);
      renderAndEnable(); // refresh UI + drag & drop
    });
  });
}

// Global add board
createBoardBtn.addEventListener("click", () => {
  const name = prompt("New board name:");
  if (name) {
    createBoard(name);
    renderAndEnable(); // re-bind drag & drop
  }
});
