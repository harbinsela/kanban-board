import { renderBoardUI } from "./ui/boardView.js";
import Sortable from "sortablejs";
import { moveCard } from "./repo/cardsRepo.js";

function enableDragAndDrop() {
  document.querySelectorAll(".cards").forEach(container => {
    if (container._sortable) {
      try { container._sortable.destroy(); } catch (e) {}
      container._sortable = null;
    }

    container._sortable = new Sortable(container, {
      group: "boards", // allows moving between boards
      animation: 150,
      ghostClass: "dragging",
      onEnd: evt => {
        const cardId = evt.item.dataset.id;
        const toBoardEl = evt.to.closest(".board");
        const toBoardId = toBoardEl?.dataset?.id;
        const newIndex = evt.newIndex + 1;

        if (!cardId || !toBoardId) return;

        moveCard(cardId, toBoardId, newIndex);

        renderAndEnable(); // refresh UI + rebind
      }
    });
  });
}

export function renderAndEnable() {
  renderBoardUI();
  enableDragAndDrop();
}

// Initial render
renderAndEnable();
