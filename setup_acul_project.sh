#!/bin/bash

# --- Project Setup Script for Auth0 Advanced Custom Login Views (ACUL) ---
# This script creates/updates all necessary files and directories for a React
# project using Shadcn/ui and path aliases, ready for Vercel deployment.

echo "Starting Auth0 ACUL project setup..."

# 1. Create necessary directories
echo "Creating directories..."
mkdir -p public
mkdir -p src/components/ui
mkdir -p src/screens/login-id
mkdir -p src/utils
mkdir -p src/lib # New directory for the shim

# 2. Create package.json
echo "Creating package.json..."
cat << 'EOF' > package.json
{
  "name": "awhit-acul-vercel-testing",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.3.0",
    "tailwindcss-animate": "^1.0.7",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-label": "^1.1.0",
    "@auth0/auth0-acul-js": "file:./src/lib/auth0-acul-js.js"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.2",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.1"
  }
}
EOF

# 3. Create jsconfig.json
echo "Creating jsconfig.json..."
cat << 'EOF' > jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/ui/*": ["./src/components/ui/*"],
      "@/common/*": ["./src/common/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/lib/*": ["./src/lib/*"]
    },
    "jsx": "react-jsx",
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowJs": true,
    "checkJs": true,
    "isolatedModules": true,
    "strict": true,
    "noEmit": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
EOF

# 4. Create vite.config.js
echo "Creating vite.config.js..."
cat << 'EOF' > vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    }
  }
});
EOF

# 5. Create tailwind.config.js
echo "Creating tailwind.config.js..."
cat << 'EOF' > tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx}",
    "./src/screens/**/*.{js,ts,jsx,tsx}",
    "./src/common/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}
EOF

# 6. Create postcss.config.js
echo "Creating postcss.config.js..."
cat << 'EOF' > postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# 7. Create .gitignore
echo "Creating .gitignore..."
cat << 'EOF' > .gitignore
# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
.pnpm-store/

# Dependency directories
node_modules/
jspm_packages/

# Build artifacts
dist/
build/
.vite/

# Environment variables
.env
.env.local
.env.*.local

# IDE-specific files
.idea/
.vscode/
*.iml
.DS_Store
EOF

# 8. Create index.html (now at the root)
echo "Creating index.html in the root directory..."
cat << 'EOF' > index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Custom Auth0 Login (React + Shadcn/ui)</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
EOF

# 9. Create src/index.css
echo "Creating src/index.css..."
cat << 'EOF' > src/index.css
/* src/index.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Shadcn/ui CSS Variables */
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 20% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;

    --border: 214.3 31.4% 91.4%;
    --input: 214.3 31.4% 91.4%;
    --ring: 221.2 83.2% 53.3%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 20% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 20% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 20% 98%;

    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.4% 91.2%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 217.2 32.4% 91.2%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --accent: 217.2 32.4% 91.2%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 20% 98%;

    --border: 217.2 32.4% 91.4%;
    --input: 217.2 32.4% 91.4%;
    --ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
EOF

# 10. Create src/utils/cn.js
echo "Creating src/utils/cn.js..."
cat << 'EOF' > src/utils/cn.js
// src/utils/cn.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
EOF

# 11. Create src/lib/auth0-acul-js.js (NEW SHIM FILE)
echo "Creating src/lib/auth0-acul-js.js..."
cat << 'EOF' > src/lib/auth0-acul-js.js
// src/lib/auth0-acul-js.js

// This is a shim/mock for the @auth0/auth0-acul-js SDK
// It provides placeholder classes and methods to allow local development
// when the full Auth0 Universal Login context is not available.

class BaseScreenProvider {
  constructor() {
    // Mimic the structure of the context object from Auth0
    // In a real Auth0 environment, this would be populated by Auth0's system.
    this.context = window.universal_login_context || {
      screen: {
        name: 'login-id',
        texts: {
          title: 'Welcome (Local Mock)',
          description: 'Login to continue (Local Mock)',
          emailPlaceholder: 'Enter your email (Local Mock)',
          buttonText: 'Continue (Local Mock)',
          footerText: "Don't have an account yet? (Local Mock)",
          footerLinkText: "Create your account (Local Mock)",
          forgottenPasswordText: "Forgot your Password? (Local Mock)",
        },
        data: {}, // Placeholder for data like pre-filled username
      },
      transaction: {
        isSignupEnabled: true,
        isForgotPasswordEnabled: true,
      },
      untrusted_data: {
        submittedFormData: {}
      }
      // Add other context properties as needed for your screens
    };

    this.screen = this.context.screen;
    this.transaction = this.context.transaction;
    this.untrustedData = this.context.untrusted_data;

    // Log a warning if running outside of Auth0 context
    if (!window.universal_login_context) {
      console.warn(
        "Auth0 ACUL JS: Running in local mock mode. Full Auth0 context is not available."
      );
    }
  }

  getContext(key) {
    return this.context[key];
  }
}

export class LoginId extends BaseScreenProvider {
  constructor() {
    super();
    console.log("LoginId Manager Initialized (Local Mock)");
  }

  async login(formData) {
    console.log("LoginId.login() called with:", formData);
    // Simulate a successful submission or a redirect
    // In a real Auth0 environment, this would trigger a form submission/redirect.
    alert("Login attempt (local mock): " + JSON.stringify(formData));
    // For local testing, you might want to simulate a delay or an error
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // throw new Error('Local mock login failed!');
  }

  async socialLogin(provider) {
    console.log("LoginId.socialLogin() called with:", provider);
    alert(`Social login with ${provider} (local mock)`);
  }
}
EOF

# 12. Create Shadcn/ui components in src/components/ui
echo "Creating Shadcn/ui components in src/components/ui..."

# src/components/ui/label.jsx
cat << 'EOF' > src/components/ui/label.jsx
// src/components/ui/label.jsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
EOF

# src/components/ui/input.jsx
cat << 'EOF' > src/components/ui/input.jsx
// src/components/ui/input.jsx
import * as React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
EOF

# src/components/ui/button.jsx
cat << 'EOF' > src/components/ui/button.jsx
// src/components/ui/button.jsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
EOF

# src/components/ui/text.jsx
cat << 'EOF' > src/components/ui/text.jsx
// src/components/ui/text.jsx
import * as React from "react";
import { cn } from "@/utils/cn";

const Text = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("relative text-gray-800 leading-tight mt-4", className)}
    {...props}
  />
));
Text.displayName = "Text";

export { Text };
EOF

# src/components/ui/link.jsx
cat << 'EOF' > src/components/ui/link.jsx
// src/components/ui/link.jsx
import * as React from "react";
import { cn } from "@/utils/cn";

const Link = React.forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("text-inherit underline inline-block", className)}
    {...props}
  />
));
Link.displayName = "Link";

export { Link };
EOF

# src/components/ui/card.jsx
cat << 'EOF' > src/components/ui/card.jsx
// src/components/ui/card.jsx
import * as React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
EOF

# 13. Create src/screens/login-id/index.jsx
echo "Creating src/screens/login-id/index.jsx..."
cat << 'EOF' > src/screens/login-id/index.jsx
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
EOF

# 14. Create src/App.jsx
echo "Creating src/App.jsx..."
cat << 'EOF' > src/App.jsx
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
EOF

# 15. Create src/main.jsx
echo "Creating src/main.jsx..."
cat << 'EOF' > src/main.jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

let rootElement = document.getElementById('root');
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
  console.log('Dynamically created #root element.');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
EOF

echo "All files and directories created successfully!"
echo "Next steps:"
echo "1. Navigate into the project directory (if you're not already there)."
echo "2. Run 'npm install' to install dependencies."
echo "3. Commit your changes to Git and push to your GitHub repository."
echo "4. Vercel will automatically deploy the updated project."
