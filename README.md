# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    # cmed-fe — Vite + React + TypeScript

    Small Vite + React + TypeScript frontend scaffold with Microsoft Entra ID (MSAL) integration, ESLint + Prettier, Vitest unit tests and Husky + lint-staged pre-commit hooks.

    What is included
    - Vite + React + TypeScript starter
    - Microsoft Entra ID (MSAL) wiring (see `src/authConfig.ts`, `src/auth.ts`, `src/App.tsx`)
    - ESLint + Prettier integration (`eslint.config.js`, `.prettierrc`) with `prettier` run as an ESLint rule
    - Unit tests with Vitest (`src/__tests__/auth.test.ts`)
    - Husky + lint-staged pre-commit hook that runs `eslint --fix` on staged files

    Quick start

    1. Install deps

    ```powershell
    npm install
    ```

    2. Run dev server

    ```powershell
    npm run dev
    ```

    3. Build for production

    ```powershell
    npm run build
    ```

    Tests

    ```powershell
    npm test
    ```

    Linting

    ```powershell
    npm run lint
    ```

    Pre-commit hooks

    Husky and lint-staged are configured. On `git commit` the project will run `eslint --fix` for staged `*.ts, *.tsx, *.js, *.jsx` files and re-stage fixes automatically. The relevant config lives in `package.json` (`lint-staged`) and `.husky/pre-commit`.

    MSAL (Microsoft Entra ID) notes

    - App registration clientId used in this repo: `be2e9c5d-7a77-4d7d-8bb1-4bf9c03f0b23` (see `src/authConfig.ts`).
    - Current configuration uses `authority: https://login.microsoftonline.com/common` (multi-tenant). For single-tenant apps replace `common` with your tenant ID.
    - Make sure Redirect URIs for development (http://localhost:5173 or http://localhost:5174) are added in the Azure App Registration portal. The app uses `redirectUri: '/'`, so the full redirect URI is `http://localhost:<port>/`.
    - Authentication wiring:
      - `src/authConfig.ts` exports `msalInstance`.
      - `src/auth.ts` contains a small typed wrapper around `msalInstance` with `signInPopup`, `signOutPopup`, and `getActiveAccount`.
      - `src/App.tsx` demonstrates signing in with MSAL using `@azure/msal-react`'s `MsalProvider` (in `src/main.tsx`) and basic login/logout buttons.

    Testing auth logic

    - Unit tests for the auth wrapper are in `src/__tests__/auth.test.ts` and use Vitest to mock `msalInstance` methods.

    Editor integration

    - `.prettierrc` is present for Prettier settings. Example VS Code settings were added to `.vscode/settings.json` to enable `formatOnSave` and run ESLint fixes on save.

    Recommended next steps

    - Update the Azure App Registration redirect URIs for local development.
    - Optionally switch from popup to redirect flows if popups are blocked in your target browsers.
    - Add protected API examples using `acquireTokenSilent` and tests for token retrieval.

    Contact

    If you want, I can:
    - add Prettier into the `lint-staged` pipeline so formatting runs before ESLint;
    - add a `pre-push` hook to run tests before pushing;
    - implement a React context / hook for auth state with unit tests.
