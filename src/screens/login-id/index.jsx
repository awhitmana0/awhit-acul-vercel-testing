// src/screens/login-id/index.jsx
import React, { ChangeEvent, useEffect } from "react";
import { LoginId as ScreenProvider } from "@auth0/auth0-acul-js";

// UI Components - now imported from "@/components/ui"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "@/components/ui/link";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function LoginIdScreen() {
  // Initialize the SDK for this screen
  const screenProvider = new ScreenProvider();

  // Handle the submit action
  // Note: Using 'event' directly instead of 'ChangeEvent<HTMLFormElement>' for JS compatibility
  const formSubmitHandler = (event) => {
    event.preventDefault();

    // grab the value from the form
    // Note: Removed 'as HTMLInputElement' for JS compatibility
    const identifierInput = event.target.querySelector("input#identifier");

    // Call the SDK
    screenProvider.login({ username: identifierInput?.value });
  };

  // Log component mount and initial state
  useEffect(() => {
    console.log('LoginIdScreen component mounted.');
    console.log('Screen Data:', screenProvider.screen);
    console.log('Transaction Data:', screenProvider.transaction);
    console.log('Untrusted Data:', screenProvider.untrustedData);
  }, []);

  // Render the form
  return (
    <form noValidate onSubmit={formSubmitHandler}>
      <CardHeader>
        <CardTitle className="mb-2 text-3xl font-medium text-center">
          {screenProvider.screen.texts?.title ?? "Welcome"}
        </CardTitle>
        <CardDescription className="mb-8 text-center">
          {screenProvider.screen.texts?.description ?? "Login to continue"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 space-y-2">
          <Label htmlFor="identifier">
            {screenProvider.screen.texts?.emailPlaceholder ??
              "Enter your email"}
          </Label>
          <Input
            type="text"
            id="identifier"
            name="identifier"
            defaultValue={
              screenProvider.screen.data?.username ??
              screenProvider.untrustedData.submittedFormData?.username
            }
          />
        </div>
        <Button type="submit" className="w-full">
          {screenProvider.screen.texts?.buttonText ?? "Continue"}
        </Button>
        <Text className="mb-2">
          {screenProvider.screen.texts?.footerText ??
            "Don't have an account yet?"}
          <Link className="ml-1" href={screenProvider.screen.signupLink ?? "#"}>
            {screenProvider.screen.texts?.footerLinkText ??
              "Create your account"}
          </Link>
        </Text>
        <Text>
          Need Help?
          <Link
            className="ml-1"
            href={screenProvider.screen.resetPasswordLink ?? "#"}
          >
            {screenProvider.screen.texts?.forgottenPasswordText ??
              "Forgot your Password?"}
          </Link>
        </Text>
      </CardContent>
    </form>
  );
}
