import bgImage from "./images/bg.webp";
import fireImage from "./images/fire.png";
import gameVaultImage from "./images/gamevault.png";
import milkyWayImage from "./images/milky.jpg";
import orionStarsImage from "./images/orion.jpg";
import pandaMasterImage from "./images/panda.jpg";

/**
 * @typedef {Object} Game
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {string} link
 */

/** @type {Game[]} */
export const games = [
  {
    id: "player",
    name: "Player",
    image: bgImage,
    link: "https://example.com/player",
  },
  {
    id: "game-vault",
    name: "Game Vault",
    image: gameVaultImage,
    link: "https://example.com/game-vault",
  },
  {
    id: "mafia",
    name: "Mafia",
    image: bgImage,
    link: "https://example.com/mafia",
  },
  {
    id: "blue-dragon",
    name: "Blue Dragon",
    image: bgImage,
    link: "https://example.com/blue-dragon",
  },
  {
    id: "juwa",
    name: "Juwa",
    image: bgImage,
    link: "https://example.com/juwa",
  },
  {
    id: "vegas-sweeps",
    name: "Vegas Sweeps",
    image: bgImage,
    link: "https://example.com/vegas-sweeps",
  },
  {
    id: "billion-balls",
    name: "Billion Balls",
    image: bgImage,
    link: "https://example.com/billion-balls",
  },
  {
    id: "cash-machine",
    name: "Cash Machine",
    image: bgImage,
    link: "https://example.com/cash-machine",
  },
  {
    id: "milky-way",
    name: "Milky Way",
    image: milkyWayImage,
    link: "https://example.com/milky-way",
  },
  {
    id: "panda-master",
    name: "Panda Master",
    image: pandaMasterImage,
    link: "https://example.com/panda-master",
  },
  {
    id: "fire-kirin",
    name: "Fire Kirin",
    image: fireImage,
    link: "https://example.com/fire-kirin",
  },
  {
    id: "orion-stars",
    name: "Orion Stars",
    image: orionStarsImage,
    link: "https://example.com/orion-stars",
  },
];
