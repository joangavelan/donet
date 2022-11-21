/**
 * Reorder items in an array
 *
 * @param array The array with items to reorder
 * @param startIndex The index of the item to be relocated
 * @param endIndex The index at which the item should be relocated
 * @returns A new array with the items reordered
 *
 * @example
 * const array = ['a', 'b', 'c']
 * const startIndex = 1
 * const endIndex = 2
 * reorderArray(array, startIndex, endIndex) returns ['a', 'c', 'b']
 */

export const reorderArray = <T>(array: T[], startIndex: number, endIndex: number): T[] => {
  const newArray = [...array]
  const [removedItem] = newArray.splice(startIndex, 1)

  newArray.splice(endIndex, 0, removedItem)

  return newArray
}
