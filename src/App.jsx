// src/App.jsx
import React from 'react';
import { Button } from './components/ui/button'; # Import the Shadcn/ui Button

function App() {
  // This is where your Auth0 Lock/Login.js initialization logic would go
  // when you integrate it into the React component lifecycle, e.g., in a useEffect hook.
  // For now, we'll just display a placeholder.

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center border border-gray-200">
        <div className="mb-6">
          {/* Placeholder for your logo */}
          <img
            src="https://placehold.co/120x60/667EEA/FFFFFF?text=Your+Logo"
            alt="Company Logo"
            className="mx-auto"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome Back!</h1>
        <p className="text-gray-600 mb-8">
          This is your custom login page built with React and Shadcn/ui.
        </p>

        {/* This div will eventually host the Auth0 login form */}
        <div id="auth0-login-container" className="space-y-4">
          {/* Example Shadcn/ui Button */}
          <Button className="w-full" onClick={() => console.log('Login button clicked!')}>
            Continue to Login
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            (This UI is rendered by React using Shadcn/ui components.)
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
