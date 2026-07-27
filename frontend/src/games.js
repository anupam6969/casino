import adventureToTheWestLogo from "./data/games/adventure-to-the-west.png";
import alienSmashLogo from "./data/games/alien-smash.png";
import beachFunLogo from "./data/games/beach-fun.png";
import bigFiveLogo from "./data/games/big-five.png";
import blessingOfIceAndFireLogo from "./data/games/blessing-of-ice-and-fire.png";
import bookOfGizaLogo from "./data/games/book-of-giza.png";
import boxingKingLogo from "./data/games/boxing-king.png";
import callOfTheJungleLogo from "./data/games/call-of-the-jungle.png";
import captainDodgerLogo from "./data/games/caption-dodger.png";
import castleSmashersLogo from "./data/games/castle-smashers.png";
import fortuneMonkeyLogo from "./data/games/fortune-monkey.png";
import pirateQueenLogo from "./data/games/pirates.png";
import sinCityLogo from "./data/games/sin-city.png";

/**
 * @typedef {Object} Game
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {string} link
 */

/**
 * Platform chips used by the white-label and leasing promo mockups.
 * Logos can be wired here when the matching platform assets are added.
 */
export const promoPlatforms = [
  { id: "juwa", name: "JUWA", logo: null },
  { id: "milkyway", name: "MilkyWay", logo: null },
  { id: "orion-stars", name: "Orion Stars", logo: null },
  { id: "vblink", name: "Vblink", logo: null },
  { id: "game-vault", name: "Game Vault", logo: null },
];

/** @type {Game[]} */
export const games = [
];

export const hottestCasinoGames = [
  {
    id: "pirate-queen-2",
    name: "Pirate Queen 2",
    provider: "JILI",
    gradient: "from-rose-500 via-orange-500 to-slate-900",
    logo: pirateQueenLogo,
    redirectLink: "/play/pirate-queen-2",
  },
  {
    id: "sin-city",
    name: "Sin City",
    provider: "JILI",
    gradient: "from-fuchsia-500 via-purple-600 to-slate-900",
    logo: sinCityLogo,
    redirectLink: "/play/sin-city",
  },
  {
    id: "fortune-monkey",
    name: "Fortune Monkey",
    provider: "JILI",
    gradient: "from-yellow-400 via-amber-600 to-slate-900",
    logo: fortuneMonkeyLogo,
    redirectLink: "/play/fortune-monkey",
  },
  {
    id: "boxing-king",
    name: "Boxing King",
    provider: "JILI",
    gradient: "from-red-500 via-stone-700 to-slate-900",
    logo: boxingKingLogo,
    redirectLink: "/play/boxing-king",
  },
  {
    id: "beach-fun",
    name: "Beach Fun",
    provider: "CP",
    gradient: "from-cyan-300 via-blue-500 to-slate-900",
    logo: beachFunLogo,
    redirectLink: "/play/beach-fun",
  },
  {
    id: "bee-workshop",
    name: "Bee Workshop",
    provider: "CP",
    gradient: "from-yellow-300 via-orange-500 to-slate-900",
    logo: "/assets/games/bee-workshop.png",
    redirectLink: "/play/bee-workshop",
  },
  {
    id: "big-five",
    name: "Big Five",
    provider: "CP",
    gradient: "from-lime-400 via-emerald-700 to-slate-900",
    logo: bigFiveLogo,
    redirectLink: "/play/big-five",
  },
  {
    id: "blessing-of-ice-and-fire",
    name: "Blessing of Ice and Fire",
    provider: "CP",
    gradient: "from-sky-300 via-red-500 to-slate-900",
    logo: blessingOfIceAndFireLogo,
    redirectLink: "/play/blessing-of-ice-and-fire",
  },
  {
    id: "adventure-to-the-west",
    name: "Adventure To The West",
    provider: "FASTSPIN",
    gradient: "from-violet-400 via-indigo-700 to-slate-900",
    logo: adventureToTheWestLogo,
    redirectLink: "/play/adventure-to-the-west",
  },
  {
    id: "alien-smash",
    name: "Alien Smash",
    provider: "FASTSPIN",
    gradient: "from-green-300 via-teal-700 to-slate-900",
    logo: alienSmashLogo,
    redirectLink: "/play/alien-smash",
  },
  {
    id: "apollo-ray-of-luck",
    name: "Apollo Ray of Luck",
    provider: "FASTSPIN",
    gradient: "from-yellow-200 via-orange-500 to-slate-900",
    logo: "/assets/games/apollo-ray-of-luck.png",
    redirectLink: "/play/apollo-ray-of-luck",
  },
  {
    id: "book-of-giza",
    name: "Book of Giza",
    provider: "PIXMOVE",
    gradient: "from-amber-300 via-yellow-700 to-slate-900",
    logo: bookOfGizaLogo,
    redirectLink: "/play/book-of-giza",
  },
  {
    id: "call-of-the-jungle",
    name: "Call Of The Jungle",
    provider: "PIXMOVE",
    gradient: "from-emerald-300 via-green-800 to-slate-900",
    logo: callOfTheJungleLogo,
    redirectLink: "/play/call-of-the-jungle",
  },
  {
    id: "captain-dodger",
    name: "Captain Dodger",
    provider: "PIXMOVE",
    gradient: "from-blue-300 via-indigo-700 to-slate-900",
    logo: captainDodgerLogo,
    redirectLink: "/play/captain-dodger",
  },
  {
    id: "castle-smashers",
    name: "Castle Smashers",
    provider: "PIXMOVE",
    gradient: "from-purple-300 via-pink-700 to-slate-900",
    logo: castleSmashersLogo,
    redirectLink: "/play/castle-smashers",
  },
];
