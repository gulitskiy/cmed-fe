import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import type { PopupRequest } from "@azure/msal-browser";

function App() {
  const [count, setCount] = useState(0);
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const loginRequest: PopupRequest = {
    scopes: ["User.Read"],
  };

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch {
      // ignore for now; in real app show error
    }
  };

  const handleLogout = async () => {
    try {
      await instance.logoutPopup();
    } catch {
      // fallback to redirect if popup fails
      instance.logoutRedirect();
    }
  };

  const account = accounts && accounts[0];

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div style={{ marginBottom: 16 }}>
        {isAuthenticated ? (
          <>
            <div>Signed in as: {account?.username || account?.name}</div>
            <button onClick={handleLogout}>Sign out</button>
          </>
        ) : (
          <button onClick={handleLogin}>Sign in with Microsoft</button>
        )}
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
