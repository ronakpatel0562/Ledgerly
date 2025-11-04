Ledgerly — Simple Business Portal

A lightweight, single-file frontend mock of the portal shown in your screenshot. It focuses on a clean UI, accessibility, and the core flow: sidebar navigation, favorite quick-actions, and content pages for Purchase, Sales, Accounts, CRM & Settings.

Files
- index.html — main page (uses Tailwind CDN for styles)
- styles.css — small extra styles
- app.js — minimal SPA logic: favorites persistence (localStorage), simple routing, and keyboard-friendly components

Name
Ledgerly — short, easy to pronounce, and suggests "ledger" / accounting functionality.

How to run
1. Open `F:/Learning/Projects/AI/ledgerly-portal/index.html` in a browser (double-click or open in your browser).
2. The UI works without a build step (Tailwind is loaded via CDN).

Notes & next steps
- You can replace mock content with real data and wire API endpoints.
- To add reorder for favorites, implement a drag-and-drop library (or use HTML5 drag/drop).
- For production, convert to a React/Vue app with a build step and bundle assets.

Accessibility & UX
- Favorites are keyboard-focusable and actionable.
- Buttons use clear labels and focus-visible outlines.

