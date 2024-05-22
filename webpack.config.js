const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  // Other webpack configuration options...
  plugins: [new Dotenv()],
};
