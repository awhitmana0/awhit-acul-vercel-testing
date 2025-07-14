import React from "react";
import Card from "@/common/Card";
import { useLoginIdManager } from "./hooks/useLoginIdManager";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import IdentifierForm from "./components/IdentifierForm";
import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";

const LoginIdScreen: React.FC = () => {
  const { loginIdInstance, pageTitle } = useLoginIdManager();

  document.title = pageTitle;

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(loginIdInstance);

  return (
    // Removed the outer div with classes like "min-h-screen flex items-center justify-center px-10 py-20".
    // The parent layout (in App.tsx) will now control the positioning and sizing.
    // The Card component itself will be styled to fit within the .acul-right-panel.
    <Card className="w-full max-w-[400px]">
      <Header />
      <IdentifierForm />
      <Footer />
      <AlternativeLogins />
    </Card>
  );
};

export default LoginIdScreen;
