"use client";

import { NextIntlClientProvider } from "next-intl";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};
