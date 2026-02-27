import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Members from "./components/Members";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <hr className="section-divider" />
        <Features />
        <hr className="section-divider" />
        <Members />
        <hr className="section-divider" />
        <Stats />
        <hr className="section-divider" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
