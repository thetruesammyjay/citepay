import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn("glass rounded-lg p-6 transition duration-300 hover:-translate-y-1", className)} {...props}>
      {children}
    </div>
  );
}
