// @ts-check
/// <reference types="@prettier/plugin-pug/src/prettier" />

/**
 * @type {import('prettier').Options}
 */
module.exports = {
  plugins: [require.resolve('@prettier/plugin-pug')],
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  semi: true,
  pugSingleQuote: true,
  trailingComma: 'all',
  pugAttributeSeparator: 'none',
};
