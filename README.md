## Vite/React, MDUI, Cloudflare Worker, TS Template

0. `npm install` in both frontend and backend folders.
1. Create `backend/.dev.vars` and set `environment="development"`
2. Adjust name of backend worker in .wrangler.toml
3. Adjust names in frontend and backend package.json
4. Adjust domains in `frontend/src/helpers/environment_detection.ts` and in `backend/src/index.ts` to be actual site domains, development domains should work as is.
5. In frontend, `npm run dev` to start vite development server
6. In backend, `npx wrangler init` to start cf wroker development server
7. You now have a basic Vite/React site with MDUI toggleable auuto/light/dark theme and Cloudflare worker integration!

Packages: Hono, Oslo, @mui/material, react, etc.

The CF worker has a Cors policy that allows requests from localhost when in development and prodDomains in production.
The frontend has a baseUrl constant to automatically adjust fetches to the cloudflare worker based on local development/production environment.
The frontend also has a isDev constant to detect devMode, which can be used for only console logging in devMode.
