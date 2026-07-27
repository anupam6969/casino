import { useEffect } from "react";
import Footer from "../components/Footer.jsx";
import FAQSection from "../components/FAQSection.jsx";
import Navbar from "../components/Navbar.jsx";

function setMetaDescription(content) {
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

export default function FAQPage() {
  useEffect(() => {
    document.title = "FAQ | GoldenSweep";
    setMetaDescription("Find answers to common GoldenSweep account, payment, game transfer, redemption, and support questions.");
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background font-sans text-cream">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_26%_16%,rgba(212,175,55,0.16),transparent_30%),radial-gradient(circle_at_80%_42%,rgba(231,184,69,0.1),transparent_28%)]" aria-hidden="true" />
      <Navbar />
      <div className="relative z-10 pt-24 sm:pt-28">
        <FAQSection />
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
