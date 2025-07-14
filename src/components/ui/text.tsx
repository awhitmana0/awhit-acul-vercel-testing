"use client";

import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming cn utility is available

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)} // Basic text styling
      {...props}
    />
  )
);
Text.displayName = "Text";

export { Text };
