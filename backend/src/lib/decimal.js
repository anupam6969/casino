// decimal helper
const Decimal = require("decimal.js");

Decimal.set({ precision: 24, rounding: Decimal.ROUND_DOWN });

module.exports = Decimal;
