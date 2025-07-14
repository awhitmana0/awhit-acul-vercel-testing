import React from 'react';

// Make sure 'export' is present here
export const Text = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={`text-sm text-gray-600 ${className}`} {...props} />
  )
);
Text.displayName = "Text";