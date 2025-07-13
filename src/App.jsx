// src/App.jsx
import React from 'react';
import LoginIdScreen from './screens/login-id/index.jsx'; // Import the specific screen

function App() {
  // In a real ACUL setup, you might determine which screen to render
  // based on Auth0's context data (e.g., universal_login_context.screen.name)
  // For now, we'll directly render the login-id screen.
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      {/* This div acts as the main container for your custom UI */}
      <LoginIdScreen />
    </div>
  );
}

export default App;
