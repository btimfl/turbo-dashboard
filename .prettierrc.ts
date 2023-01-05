module.exports = {
  printWidth: 180,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: false,
  quoteProps: "consistent",
  bracketSpacing: true,
  trailingComma: "all",
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrder: ["^@core/(.*)$", "^@server/(.*)$", "^@ui/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
