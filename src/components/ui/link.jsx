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
