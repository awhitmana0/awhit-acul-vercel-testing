"use client";

// Removed Field as FieldPrimitive import
// import { Field as FieldPrimitive } from "@base-ui-components/react";
import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming cn utility is available

// Changed InputProps to extend standard HTML input attributes
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      // Removed FieldPrimitive.Root and FieldPrimitive.Input
      <input
        ref={ref}
        type={type}
        // data-slot="input" // data-slot might not be needed without FieldPrimitive
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
