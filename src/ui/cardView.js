// src/ui/cardView.js
import { deleteCard } from "../repo/cardsRepo.js";
import { renderAndEnable } from "../main.js";

export function renderCard(card) {
  const cardEl = document.createElement("div");
  cardEl.className = "card";
  cardEl.dataset.id = card.id;

  // Severity color
  let severityColor = "#a0e7a0"; // default Low green
  if (card.severity === "Medium") severityColor = "#fef38a"; // yellow
  else if (card.severity === "High") severityColor = "#f28b82"; // red

  cardEl.innerHTML = `
    <div class="card-title"><strong>${card.title ?? ""}</strong></div>
    <div class="card-desc">${card.description ?? ""}</div>
    <div class="card-severity" style="color:${severityColor}"><em>Severity: ${card.severity ?? "Low"}</em></div>
    <div style="text-align: right; margin-top: 5px;">
      <button class="delete-card">Delete</button>
    </div>
  `;

  // Delete card handler
  cardEl.querySelector(".delete-card").addEventListener("click", () => {
    if (confirm("Delete this card?")) {
      deleteCard(card.id);
      renderAndEnable();
    }
  });

  return cardEl;
}
