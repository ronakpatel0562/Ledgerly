Ledgerly — React + Vite
This folder contains a small component-based React app built with Vite. It mirrors the previous simple SPA, but componentized and using Vite for dev and build.
## Run locally
From the project root (`ledgerly-portal-vite`):
```powershell
npm install
npm run dev
```
Open the URL printed by Vite (default http://localhost:5173).
## Notes
- The app fetches data from the mock API at `http://localhost:4000/api` (run `server/server.js` from the other folder).
- Tailwind is included via CDN in `index.html` for quick styling during development.
- For production, replace CDN Tailwind with a proper Tailwind build pipeline.
## Build & Deploy to Vercel
1. Create a production build locally:
```powershell
npm install
npm run build
```
This will output the production-ready static site into the `dist/` directory.
2. Deploy options
- Vercel web (recommended): Connect your Git repository to Vercel. Vercel will detect the project. Ensure these values (Vercel usually picks them automatically):
	- Build Command: `npm run build`
	- Output Directory: `dist`
- Vercel CLI:
```powershell
npm i -g vercel
vercel login
vercel --prod
```
This repo includes a `vercel.json` which instructs Vercel to use `@vercel/static-build` with `dist` as the output directory and provides an SPA fallback so client routes resolve to `index.html`.
If you need to customize the Vite `base` for a subdirectory deployment, add `base: '/subpath/'` to `vite.config.js`.
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
