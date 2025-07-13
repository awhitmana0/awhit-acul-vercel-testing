// src/App.jsx
import React from 'react';
import { Button } from './components/ui/button'; // Keep Shadcn/ui Button for custom UI elements

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center border border-gray-200">
        <div className="mb-6">
          {/* Your custom logo for the login page */}
          <img
            src="https://placehold.co/120x60/667EEA/FFFFFF?text=Your+Logo"
            alt="Company Logo"
            className="mx-auto"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Our Service!</h1>
        <p className="text-gray-600 mb-8">
          This is your custom login page. The Auth0 login form will appear below.
        </p>

        {/* This is the crucial div where Auth0's Universal Login will inject its form.
            Your React app provides the container, and Auth0 fills it. */}
        <div id="auth0-login-container" className="space-y-4">
          {/* You can add a loading message or placeholder here if you wish,
              which will be replaced by Auth0's form once it loads. */}
          <p className="text-gray-500">Loading Auth0 login form...</p>
          {/* Any other custom UI elements (e.g., links to signup, forgot password)
              that are *outside* the Auth0 injected form can go here. */}
          <Button className="w-full mt-4" variant="outline" onClick={() => console.log('Custom action button clicked!')}>
            Need Help?
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
