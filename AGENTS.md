# AGENTS.md

## Stack

This project uses Node.js 20+, Vite, React, Vitest, React Testing Library, and Cypress. The UI is plain JSX and CSS with no component library.

## Layout

- `src/App.jsx`: application state, filtering, totals, and delete behavior.
- `src/components/`: one React component per file.
- `src/utils/expenses.js`: pure validation, filtering, and total logic.
- `src/*.test.jsx` and `src/**/*.test.js`: unit and component tests.
- `cypress/e2e/`: browser journey tests.

## Commands

- `npm install`: install dependencies.
- `npm run dev`: start the Vite development server.
- `npm run build`: create a production build.
- `npm run lint`: run Oxlint.
- `npm run test:run`: run Vitest once.
- `npm run test:coverage`: run Vitest with coverage.
- `npm run cy:open`: open Cypress interactively after starting the dev server.
- `npm run cy:run`: run Cypress headlessly against `http://localhost:5173`.

## Conventions

- Keep application state in `App`; pass data and callbacks through props.
- Keep one component per file.
- Prefer pure functions for business rules and test them independently.
- Use `data-cy` attributes for end-to-end selectors.
- Do not add a dependency without asking first.
- Work on a branch; do not make feature changes directly on `main`.
- Summarize behavior changes, tests, and review notes in the pull request.
