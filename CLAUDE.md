# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # dev server
npm run build    # production build
npm test         # run all tests (watch mode)
npm test -- --watchAll=false  # run tests once
```

There is no separate lint command; ESLint runs as part of `react-scripts` (extends `react-app`).

## Architecture

This is a React/TypeScript single-page app (Create React App) that generates printable word search puzzles.

**State management** uses Redux Toolkit with three slices in [src/features/](src/features/):
- `wordbank` — up to 10 user-entered words and their placement status
- `grid` — the 10×10 letter grid and word positions
- `settings` — toggles for diagonal words, backwards words, and animations

**Word placement algorithm** lives entirely in [src/features/grid/gridUtil.ts](src/features/grid/gridUtil.ts). `findPosition()` is the core function: it sorts words by length (longest first), then for each word tries random row/column positions across allowed directions (`Direction`: HORIZONTAL, VERTICAL, DIAGONAL) and orders (`Order`: FORWARDS, BACKWARDS). `isWordAllowed()` validates a candidate placement against existing grid letters. Empty cells are filled with random letters after all words are placed.

**Generation flow**: [GenerateButton.tsx](src/components/wordbank/GenerateButton.tsx) dispatches the generate action → `gridSlice` calls the placement algorithm → grid state updates → [Grid.tsx](src/components/grid/Grid.tsx) re-renders.

**Typed Redux hooks** (`useAppSelector`, `useAppDispatch`) are defined in [src/app/hooks.ts](src/app/hooks.ts) — always use these instead of the raw hooks.

Tests are colocated with the code they test (e.g., [src/features/grid/gridUtil.test.ts](src/features/grid/gridUtil.test.ts)).
