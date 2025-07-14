import { ChangeEvent } from "react";
import { Login as ScreenProvider } from "@auth0/auth0-acul-js"; // Note: Using Login as ScreenProvider

// UI Components
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
import Card from "@/common/Card"; // <-- Import the main Card component

export default function Login() {
  // Initialize the SDK for this screen
  const screenProvider = new ScreenProvider();

  // Handle the submit action
  const formSubmitHandler = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // grab the values from the form
    const identifierInput = event.target.querySelector(
      "input#identifier"
    ) as HTMLInputElement;
    const passwordInput = event.target.querySelector(
      "input#password"
    ) as HTMLInputElement;

    // Call the SDK
    screenProvider.login({
      username: identifierInput?.value,
      password: passwordInput?.value,
    });
  };

  // Render the form
  return (
    // Outer div for centering the card on the page, similar to LoginIdScreen and LoginPasswordScreen
    <div className="min-h-screen flex items-center justify-center px-10 py-20">
      {/* Wrap the form within the Card component for consistent styling */}
      <Card className="w-full max-w-[400px] rounded-lg shadow-xl"> {/* Added rounded-lg and shadow-xl for modern look */}
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
                // defaultValue={
                //   screenProvider.screen.data?.username ??
                //   screenProvider.untrustedData.submittedFormData?.username
                // }
              />
            </div>
            <div className="mb-2 space-y-2">
              <Label htmlFor="password">
                {screenProvider.screen.texts?.passwordPlaceholder ?? "Password"}
              </Label>
              <Input type="password" id="password" name="password" />
            </div>
            <Button type="submit" className="w-full">
              {screenProvider.screen.texts?.buttonText ?? "Continue"}
            </Button>
            <Text className="mb-2">
              {screenProvider.screen.texts?.footerText ?? "Don't have an account yet?"}
              <Link className="ml-1" href={screenProvider.screen.signupLink ?? "#"}>
                {screenProvider.screen.texts?.footerLinkText ?? "Create your account"}
              </Link>
            </Text>
            <Text>
              Need Help?
              <Link className="ml-1" href={screenProvider.screen.resetPasswordLink ?? "#"}>
                {screenProvider.screen.texts?.forgottenPasswordText ?? "Forgot your Password?"}
              </Link>
            </Text>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
