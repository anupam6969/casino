const prisma = require("./prisma");
const { getGames, getGame } = require("./sweeppark");

/**
 * Syncs the game catalogue from SweepPark games-api.
 * Pages through all results using cursor-based pagination.
 * Uses upsert to create or update games by slug.
 * @returns {Promise<{synced: number, errors: Array}>}
 */
async function syncGames() {
  let cursor = null;
  let hasMore = true;
  let synced = 0;
  const errors = [];

  while (hasMore) {
    try {
      const response = await getGames({
        limit: 100,
        cursor,
      });

      const games = response.data || [];
      const pagination = response.pagination || {};

      for (const game of games) {
        try {
          await prisma.game.upsert({
            where: { slug: game.slug },
            create: {
              id: game.id,
              slug: game.slug,
              name: game.name,
              studioSlug: game.studio?.slug || "unknown",
              studioName: game.studio?.name || "Unknown",
              categories: game.categories || [],
              icon: game.icon || null,
              thumbnails: game.thumbnails || null,
              rtp: game.rtp || null,
              volatility: game.volatility ?? null,
              tags: game.tags || [],
              maintenance: game.maintenance ?? false,
            },
            update: {
              id: game.id,
              name: game.name,
              studioSlug: game.studio?.slug || "unknown",
              studioName: game.studio?.name || "Unknown",
              categories: game.categories || [],
              icon: game.icon || null,
              thumbnails: game.thumbnails || null,
              rtp: game.rtp || null,
              volatility: game.volatility ?? null,
              tags: game.tags || [],
              maintenance: game.maintenance ?? false,
            },
          });
          synced++;
        } catch (err) {
          console.error("Failed to save a catalogue game");
          errors.push({ slug: game.slug, error: err.message });
        }
      }

      hasMore = pagination.hasMore === true;
      cursor = pagination.nextCursor || null;
    } catch (err) {
      console.error("Failed to fetch a catalogue page", Number.isInteger(err.status) ? err.status : "");
      errors.push({ cursor, error: err.message });
      break;
    }
  }

  return { synced, errors };
}

/**
 * Syncs a single game by slug from SweepPark games-api.
 * @param {string} slug - Game slug
 * @returns {Promise<object|null>} Synced game data or null if not found
 */
async function syncGame(slug) {
  try {
    const response = await getGame(slug);
    const game = response.data;

    const synced = await prisma.game.upsert({
      where: { slug: game.slug },
      create: {
        id: game.id,
        slug: game.slug,
        name: game.name,
        studioSlug: game.studio?.slug || "unknown",
        studioName: game.studio?.name || "Unknown",
        categories: game.categories || [],
        icon: game.icon || null,
        thumbnails: game.thumbnails || null,
        rtp: game.rtp || null,
        volatility: game.volatility ?? null,
        tags: game.tags || [],
        maintenance: game.maintenance ?? false,
      },
      update: {
        id: game.id,
        name: game.name,
        studioSlug: game.studio?.slug || "unknown",
        studioName: game.studio?.name || "Unknown",
        categories: game.categories || [],
        icon: game.icon || null,
        thumbnails: game.thumbnails || null,
        rtp: game.rtp || null,
        volatility: game.volatility ?? null,
        tags: game.tags || [],
        maintenance: game.maintenance ?? false,
      },
    });

    return synced;
  } catch (err) {
    if (err.status === 404 && err.code === "game.notFound") {
      return null;
    }
    throw err;
  }
}

module.exports = { syncGames, syncGame };