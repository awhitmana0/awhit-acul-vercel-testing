import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./custom-acul-styles.css"; // Ensure your custom styles are imported
import { loadAndSetMockContext } from "@/utils/screen/mockContextLoader";

async function initializeApp() {
  // ACUL Integration Note:
  // This script dynamically creates a 'div' (rootElement),
  // appends it to Auth0's document.body, and then mounts the React application onto this div.
  // This is only done if the current URL path indicates an ACUL screen should be rendered.

  // Check the current URL path
  const currentPath = window.location.pathname;

  // Define paths that correspond to ACUL screens.
  // This is a simplified check. You might need a more robust way
  // to determine if the current page is an Auth0 ACUL screen,
  // possibly by checking for specific query parameters or Auth0's own context.
  const isAculScreenPath =
    currentPath.includes("/login-id") ||
    currentPath.includes("/login-password") ||
    currentPath.includes("/login-passwordless-email-code");
    // Add other ACUL screen paths as needed

  if (isAculScreenPath) {
    // Load mock context only for ACUL screens if needed for development/testing
    await loadAndSetMockContext();

    let rootElement = document.getElementById("root");

    // If the root element doesn't exist (e.g., in a minimal Auth0 template), create it
    if (!rootElement) {
      rootElement = document.createElement("div");
      rootElement.id = "root";
      document.body.appendChild(rootElement);
    }

    // Ensure the root element is empty before rendering React (only if React is mounting)
    rootElement.innerHTML = ''; 

    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } else {
    // If not an ACUL screen path (e.g., homepage), ensure React doesn't try to mount
    // and allow the static HTML content in public/index.html to be visible.
    console.log("Not an ACUL screen path, allowing static content.");
    // REMOVED: rootElement.innerHTML = ''; from this else block
  }
}

initializeApp();
