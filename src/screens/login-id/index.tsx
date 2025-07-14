import { ChangeEvent } from "react";
import { LoginId as ScreenProvider } from "@auth0/auth0-acul-js";

// UI Components - Ensure these paths are correct based on your setup
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

export default function LoginId() {
  // Initialize the SDK for this screen
  const screenProvider = new ScreenProvider();

  // Handle the submit action
  const formSubmitHandler = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // grab the value from the form
    const identifierInput = event.target.querySelector(
      "input#identifier"
    ) as HTMLInputElement;

    // Call the SDK
    screenProvider.login({ username: identifierInput?.value });
  };

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
              (screenProvider.screen.data?.username as string | undefined) ??
              (screenProvider.untrustedData.submittedFormData?.username as string | undefined) ??
              "" // Provide an empty string fallback if both are null/undefined
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