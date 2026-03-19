"use client"
import Hero from "./_components/Hero";
import How from "./_components/how";
import Why from "./_components/why";
import Footer from "./_components/footer";
import { useSharedState } from "./SharedStateContext";
export default function Home() {
 const {bgColor} = useSharedState()
  return (
    <div className={`flex  flex-col gap-12 pt-12 overflow-x-hidden bg-${bgColor}`}>
      <Hero />
      <How />
      <Why />
      <Footer />
    </div>
  );
}
