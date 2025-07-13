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
