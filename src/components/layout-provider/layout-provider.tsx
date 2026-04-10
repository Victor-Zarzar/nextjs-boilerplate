"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import type React from "react";
import { useEffect, useState } from "react";
import CookieConsentComponent from "@/components/cookie-consent/cookie-consent";
import { Toaster } from "@/components/ui/sonner";
import Footer from "../footer-component/footer-component";
import DevToolsGuard from "../guard/disable-dev-tools";
import Navbar from "../navbar-component/navbar-component";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasConsented, setHasConsented] = useState(false);
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const);

  useEffect(() => {
    if (document.cookie.includes("cookieConsent=true")) {
      setHasConsented(true);
    }
  }, []);

  function handleAccept() {
    setHasConsented(true);
  }

  function handleDecline() {
    setHasConsented(false);
  }

  return (
    <>
      <ThemeProvider
        scriptProps={scriptProps}
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Toaster position="top-right" expand={true} />
        {hasConsented && <Analytics />}
        <SpeedInsights />
        <DevToolsGuard />
        <CookieConsentComponent
          onAcceptAction={handleAccept}
          onDeclineAction={handleDecline}
        />
        <Footer />
      </ThemeProvider>
    </>
  );
}
