import { listCards, createCard } from "../repo/cardsRepo.js";
import { renderCard } from "./cardView.js";
import { validate, CardCreate } from "../utils/validation.js";

export function renderColumn(column) {
  const colEl = document.createElement("div");
  colEl.className = "column";
  colEl.id = column.id;
  colEl.dataset.id = column.id;

  colEl.innerHTML = `
    <h2>${column.name}</h2>
    <div class="cards"></div>
    <button>Add Card</button>
  `;

  const cardsEl = colEl.querySelector(".cards");
  listCards(column.boardId, column.id).forEach(card => cardsEl.appendChild(renderCard(card)));

  colEl.querySelector("button").addEventListener("click", () => {
    const title = prompt("Card title?");
    if (!title) return;
    try {
      const cardData = validate(CardCreate, { title });
      createCard({ boardId: column.boardId, columnId: column.id, ...cardData });
      cardsEl.appendChild(renderCard(listCards(column.boardId, column.id).slice(-1)[0]));
    } catch (err) {
      alert(`Error: ${err}`);
    }
  });

  return colEl;
}
