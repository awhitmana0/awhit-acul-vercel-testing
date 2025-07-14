import React from 'react';

// Make sure 'export' is present here
export const Link = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a ref={ref} className={`font-medium text-indigo-600 hover:text-indigo-500 ${className}`} {...props} />
  )
);
Link.displayName = "Link";