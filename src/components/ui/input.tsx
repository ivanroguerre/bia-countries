import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-dark-gray placeholder:text-sm text-dark-gray selection:bg-primary selection:text-primary-foreground dark:bg-dark-blue dark:placeholder:text-white flex h-12 w-full min-w-0 rounded-md bg-white px-4 py-4 text-sm shadow-(--input-shadow) transition-[color,box-shadow]  file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        type !== "text" && "border-input border",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
