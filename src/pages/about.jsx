import Features from "@/components/about/Features";
import FrequentlyAskedQuestions from "@/components/about/FrequentlyAskedQuestions";
import Hero from "@/components/about/Hero";
import Footer from "@/components/about/Footer";
import Nav from "@/components/about/Nav";

export default function About() {

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
