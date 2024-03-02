import { useEffect } from "react";
import Features from "@/components/about/Features";
import FrequentlyAskedQuestions from "@/components/about/FrequentlyAskedQuestions";
import Hero from "@/components/about/Hero";
import Footer from "@/components/about/Footer";
import Nav from "@/components/about/Nav";

export default function About() {

  useEffect(() => {
    const hostnames = ["penumbra.app", "www.penumbra.app"];
    const currentDomain = window.location.hostname;
    if (hostnames.includes(currentDomain)) {
      const script = document.createElement("script");
      script.defer = true;
      script.dataset.domain = "penumbra.app";
      script.src = "https://plausible.io/js/script.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="font-sans">
      <Nav />
      <Hero />
      <Features />
      <FrequentlyAskedQuestions />
      <Footer />
    </div>
  )
}
