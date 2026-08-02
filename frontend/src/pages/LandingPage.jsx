import Footer from "../components/Footer.jsx";
import GameProviders from "../components/GameProviders.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import HottestCasinoGames from "../components/HottestCasinoGames.jsx";
import Navbar from "../components/Navbar.jsx";
import NoPurchaseCTA from "../components/NoPurchaseCTA.jsx";
import PlayerVoices from "../components/PlayerVoices.jsx";
import WhiteLabelLeasing from "../components/WhiteLabelLeasing.jsx";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background font-sans text-cream">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_26%_16%,rgba(212,175,55,0.16),transparent_30%),radial-gradient(circle_at_80%_42%,rgba(231,184,69,0.1),transparent_28%)]" aria-hidden="true" />
      <Navbar />
      <div className="relative z-10">
        <HeroBanner />
        <HottestCasinoGames />
        <NoPurchaseCTA />
        <GameProviders />
        <PlayerVoices />
        {/* <WhiteLabelLeasing /> */}
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
