# React + Vite

## Connecting to the API

Run the Express API from `Server` on port `5000` and the frontend from `Frontend`.
Vite proxies `/api` requests to `http://localhost:5000` during development.
For a separately hosted API, set `VITE_API_URL` to its API base URL (including
`/api`) and set `CLIENT_URL` on the server to the frontend origin.

Frontend API requests use the shared Axios client in `src/services/api.js`.
Keep endpoint calls in the corresponding service module (`authService.js`,
`productService.js`, `cartService.js`, or `orderService.js`) and call those
functions from pages and components.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
