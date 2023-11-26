const config = {
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["tlg.js", "getStripe.js", "startBot.js", "deletereminder/[id].tsx", "updatereminder/[id].tsx"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // Add or modify rules as needed
       // Add or modify rules as needed
       "noEmitOnError": "off",           // Treat errors as warnings
       "noImplicitAny": false       // Allow implicit 'any' types
  },
};

module.exports = config;