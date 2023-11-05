import Features from "@/components/about/Features";
import FrequentlyAskedQuestions from "@/components/about/FrequentlyAskedQuestions";
import Hero from "@/components/about/Hero";

export default function About() {

  return (
    <div className="font-sans">
      <Hero />
      <Features />
      <FrequentlyAskedQuestions />
    </div>
  )
}
