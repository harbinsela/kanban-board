export function showModal(content) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `<div class="modal-content">${content}<button>Close</button></div>`;
  document.body.appendChild(modal);
  modal.querySelector("button").addEventListener("click", () => modal.remove());
}
