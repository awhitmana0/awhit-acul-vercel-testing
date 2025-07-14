import React, { useEffect, Suspense } from "react";
import { getCurrentScreen } from "@auth0/auth0-acul-js";

// Lazy load screen components for better performance
const LoginIdScreen = React.lazy(() => import("./screens/login-id"));
const LoginPasswordScreen = React.lazy(() => import("./screens/login-password"));
const LoginScreen = React.lazy(() => import("./screens/login"));

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
      case "login-password":
        return <LoginPasswordScreen />;
      case "login":
        return <LoginScreen />;
      default:
        // Fallback for screens not explicitly handled or initial state
        return <>No screen rendered</>;
    }
  };

  return (
    // The App component now directly renders the screen,
    // and the centering/layout will be handled by the screen component itself
    // or global CSS applied to #root/body.
    <Suspense fallback={<div>Loading...</div>}>
      {renderScreen()}
    </Suspense>
  );
};

export default App;
