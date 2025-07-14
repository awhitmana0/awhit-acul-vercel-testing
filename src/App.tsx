import React, { useEffect, Suspense } from "react";
import { getCurrentScreen } from "@auth0/auth0-acul-js";

// Lazy load screen components for better performance
const LoginIdScreen = React.lazy(() => import("./screens/login-id"));
// const LoginPasswordScreen = React.lazy(() => import("./screens/LoginPassword"));
// const LoginPasswordlessEmailCodeScreen = React.lazy(() => import("./screens/LoginPasswordlessEmailCode"));

const App: React.FC = () => {
  const [screen, setScreen] = React.useState("");

  // Effect to get the current screen from Auth0 ACUL SDK and set state
  useEffect(() => {
    const current = getCurrentScreen();
    setScreen(current!);
    console.log("Current screen from Auth0 ACUL:", current);
  }, []);

  // Effect to log screen state changes (as provided by you)
  useEffect(() => {
    console.log("Current screen state:", screen);
  }, [screen]);

  // Function to conditionally render the correct screen component
  const renderScreen = () => {
    switch (screen) {
      case "login-id":
        return <LoginIdScreen />;
      // case "login-password":
      //   return <LoginPasswordScreen />;
      // case "login-passwordless-email-code":
      //   return <LoginPasswordlessEmailCodeScreen />;
      default:
        // Fallback for screens not explicitly handled or initial state
        return <>No screen rendered</>;
    }
  };

  return (
    // This div applies the main split-screen layout.
    // The CSS for 'acul-split-layout', 'acul-left-panel', and 'acul-right-panel'
    // will define the visual appearance.
    <div className="acul-split-layout">
      {/* Left Panel: Contains static branding and optional links */}
      <div className="acul-left-panel">
        <div className="acul-logo">
          Acme Inc
          {/* This 'Login' link is placed here to match the screenshot's top-right of left panel */}
          <a href="#" className="acul-login-link">Login</a>
        </div>
        {/* The quote text would go here if desired, but is removed as per request */}
      </div>

      {/* Right Panel: Contains the dynamically rendered login/signup screen */}
      <div className="acul-right-panel">
        {/* Suspense is used for lazy-loaded components */}
        <Suspense fallback={<div>Loading...</div>}>
          {renderScreen()}
        </Suspense>
      </div>
    </div>
  );
};

export default App;
