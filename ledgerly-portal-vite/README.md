Ledgerly — React + Vite

This folder contains a small component-based React app built with Vite. It mirrors the previous simple SPA, but componentized and using Vite for dev and build.

Run locally
1. From project root (ledgerly-portal-vite):

```powershell
npm install
npm run dev
```

2. Open the URL printed by Vite (default http://localhost:5173).

Notes
- The app fetches data from the mock API at http://localhost:4000/api (run server/server.js from the other folder).
- Tailwind is included via CDN in `index.html` for quick styling during development.
- For production, replace CDN Tailwind with a proper Tailwind build pipeline.
