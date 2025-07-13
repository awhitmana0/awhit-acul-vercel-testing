// src/screens/login-id/index.jsx
import React from 'react';
import { Button } from '../../common/Button/Button.jsx'; // Corrected import path

function LoginIdScreen() {
  // This is the UI for your custom login-id page
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center border border-gray-200">
      <div className="mb-6">
        {/* Placeholder for your logo. Auth0 Lock will use its own logo setting. */}
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

      {/* This is the crucial div where Auth0's Universal Login will inject its form. */}
      <div id="auth0-login-container" className="space-y-4">
        <p className="text-gray-500">Loading Auth0 login form...</p>
        <Button className="w-full mt-4" variant="outline" onClick={() => console.log('Custom action button clicked!')}>
          Need Help?
        </Button>
      </div>
    </div>
  );
}

export default LoginIdScreen;
