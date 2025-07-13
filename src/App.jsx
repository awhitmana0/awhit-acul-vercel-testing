// src/App.jsx
import React from 'react';
import LoginIdScreen from '@/screens/login-id/index.jsx';
import { Card } from '@/components/ui/card';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      <Card className="w-[512px] p-4 shadow-lg my-12 mx-auto">
        <img
          src="https://placehold.co/120x60/667EEA/FFFFFF?text=Your+Logo"
          alt="Company Logo"
          className="block w-12 mb-6 ml-auto mr-auto"
        />
        <LoginIdScreen />
      </Card>
    </div>
  );
}

export default App;
