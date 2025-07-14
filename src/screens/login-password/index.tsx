import { ChangeEvent } from "react";
import { LoginPassword as ScreenProvider } from "@auth0/auth0-acul-js";

// UI Components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "@/components/ui/link";
import { // Ensure Card is imported from common, and sub-components from ui
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Card from "@/common/Card"; // <-- Import the main Card component

export default function LoginPassword() {
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
    // Outer div for centering the card on the page, similar to LoginIdScreen
    <div className="min-h-screen flex items-center justify-center px-10 py-20">
      {/* Wrap the form within the Card component for consistent styling */}
      <Card className="w-full max-w-[400px] rounded-lg shadow-xl"> {/* Added rounded-lg and shadow-xl for modern look */}
        <form noValidate onSubmit={formSubmitHandler}>
          <CardHeader>
            <CardTitle className="mb-2 text-3xl font-medium text-center">
              {screenProvider.screen.texts?.title ?? "Enter Your Password"}
            </CardTitle>
            <CardDescription className="mb-8 text-center">
              {screenProvider.screen.texts?.description ??
                "Enter your password to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Text className="mb-4 text-large">
              <span className="inline-block">
                Log in as
                <span className="inline-block ml-1 font-bold">
                  {screenProvider.screen.data?.username}.
                </span>
              </span>
              <Link
                href={screenProvider.screen.editIdentifierLink ?? "#"}
                className="ml-2"
              >
                {screenProvider.screen.texts?.editEmailText ?? "Edit Email"}
              </Link>
            </Text>
            <Input
              type="hidden"
              name="identifier"
              id="identifier"
              value={screenProvider.screen.data?.username}
            />
            <div className="mb-2 space-y-2">
              <Label htmlFor="password">
                {screenProvider.screen.texts?.passwordPlaceholder ?? "Password"}
              </Label>
              <Input type="password" id="password" name="password" />
            </div>
            <Button type="submit" className="w-full">
              {screenProvider.screen.texts?.buttonText ?? "Continue"}
            </Button>
            <Text>
              Need Help?
              <Link
                href={screenProvider.screen.resetPasswordLink ?? "#"}
                className="ml-1"
              >
                {screenProvider.screen.texts?.forgottenPasswordText ??
                  "Forgot your Password?"}
              </Link>
            </Text>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
