/**
 * Get the percentage out of two numbers
 *
 * @param partial - The partial number
 * @param total - The total number
 * @returns The percentage number
 *
 * @example
 * getPercentage(30, 150) returns 20
 */

export const getPercentage = (partial: number, total: number): number =>
  Math.floor((partial / total) * 100)
