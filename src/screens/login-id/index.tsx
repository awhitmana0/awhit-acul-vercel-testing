import { ChangeEvent } from "react";
import { LoginId as ScreenProvider } from "@auth0/auth0-acul-js";

// UI Components
// These will now be your actual Shadcn components
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Link } from "@/components/ui/link";
import {
  Card, // <--- Import Card itself
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function LoginId() {
  const screenProvider = new ScreenProvider();

  const formSubmitHandler = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const identifierInput = event.target.querySelector(
      "input#identifier"
    ) as HTMLInputElement;
    screenProvider.login({ username: identifierInput?.value });
  };

  return (
    // <Card> is now the outer wrapper for the entire form
    <Card className="mx-auto max-w-sm"> {/* Added Card component with styling */}
      <form noValidate onSubmit={formSubmitHandler}>
        <CardHeader className="space-y-1"> {/* Added space-y-1 as in Shadcn example */}
          <CardTitle className="mb-2 text-3xl font-medium text-center">
            {screenProvider.screen.texts?.title ?? "Welcome"}
          </CardTitle>
          <CardDescription className="mb-8 text-center">
            {screenProvider.screen.texts?.description ?? "Login to continue"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4"> {/* Added space-y-4 wrapper for form fields */}
            <div className="space-y-2">
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
                  ""
                }
              />
            </div>
            <Button type="submit" className="w-full">
              {screenProvider.screen.texts?.buttonText ?? "Continue"}
            </Button>
          </div> {/* End space-y-4 */}

          {/* Moved these out of space-y-4 as they don't seem to be part of the main form fields in the example */}
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
    </Card> // <--- Close Card component
  );
}