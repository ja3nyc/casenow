import { cn } from "@/lib/utils";
import React from "react";
import CurrencyInput, {
  CurrencyInputOnChangeValues,
} from "react-currency-input-field";

const CurrencyInputField = React.forwardRef<
  React.ElementRef<typeof CurrencyInput>,
  React.ComponentPropsWithoutRef<typeof CurrencyInput>
>(({ className, ...props }, ref) => (
  <CurrencyInput
    ref={ref}
    className={cn(
      "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));

CurrencyInputField.displayName = "CurrencyInputField";

export { CurrencyInputField, type CurrencyInputOnChangeValues };
