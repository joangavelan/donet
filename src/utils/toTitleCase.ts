/**
 * Title case a word or sentence
 *
 * @param text - The text to transform
 * @returns The word or sentence in title case
 *
 * @example
 * toTitleCase('roadmap') returns 'Roadmap'
 * toTitleCase('platform launch') returns 'Platform Launch'
 */

export const toTitleCase = (text: string): string =>
  text.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
