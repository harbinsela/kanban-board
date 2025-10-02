# Kanban Board

A **frontend-only Kanban Board** built with **JavaScript** and **Vite**, designed to manage boards and cards dynamically in the browser. The app demonstrates modular JavaScript, drag-and-drop functionality, validation, and localStorage persistence. Perfect for practicing frontend architecture and DOM manipulation.  

---

## Project Description

This Kanban Board allows you to **create, rename, and delete boards**, as well as **create, move, and delete cards** within those boards. Cards can be **dragged across boards** thanks to the **SortableJS** library, giving a smooth and interactive user experience.  

All data is stored in **localStorage** under a single key (`kanban.v1`), meaning that your boards and cards **persist across browser refreshes** without the need for a backend.  

The project uses the following libraries:  

- **[SortableJS](https://sortablejs.github.io/Sortable/)** – For drag-and-drop functionality of cards across boards.  
- **[Day.js](https://day.js.org/)** – For generating timestamps for created/updated cards and boards.  
- **[UUID](https://www.npmjs.com/package/uuid)** – To generate unique IDs for boards and cards.  
- **[Zod](https://zod.dev/)** – For validating card inputs to ensure proper titles, descriptions, severity, and more.  
- **[Vitest](https://vitest.dev/)** – For testing repository functionality like creating and deleting cards.  
- **[jsdom](https://github.com/jsdom/jsdom)** – Simulates browser environment in tests.  

---

## Features

- **Boards**  
  - Create new boards with a custom name.  
  - Rename existing boards.  
  - Delete boards (minimum one board remains).  

- **Cards**  
  - Create cards with title, description, and severity level.  
  - Drag and drop cards across boards to reorganize workflow.  
  - Delete cards when no longer needed.  

- **Persistence**  
  - All data is saved to localStorage automatically.  
  - Corrupted localStorage data is handled gracefully with a reset option.  

- **Validation**  
  - Input validation via Zod ensures correct card data (lengths, email format, tags, severity).  

- **Testing**  
  - Vitest tests check critical functionality like creating and deleting cards.  

---

## Demo

![Kanban Demo](assets/Animation.gif)

---

## Installation and Setup

1. **Clone the repository** to your local machine:

```bash
git clone https://github.com/harbinsela/kanban-board.git
cd kanban-board
