"use client";
import { useEffect } from "react";
import CTA from "./components/cta";
import Feature01 from "./components/feature01";
import Feature02 from "./components/feature02";
import Footer from "./components/footer";
import Hero from "./components/hero/main";
import Header from "./components/navbar";
import Pricing from "./components/pricing";
import Spacer from "./components/spacer";

type Message = {
  text: string;
  sender: "bot" | "user";
};

export default function Index() {
  useEffect(() => {
    const handleHashLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleHashLinkClick);

    return () => {
      document.removeEventListener("click", handleHashLinkClick);
    };
  }, []);

  return (
    <>
      <Header />

      <Spacer />

      <Hero />

      <Feature01 />

      <Feature02 />

      <Pricing />

      <CTA />

      <Footer />
    </>
  );
}
