export const getSubtaskPlaceholder = (index: number): string | undefined => {
  const placeholders = ['Make coffee', 'Drink coffee & smile', 'Wash the cup']
  return placeholders[index] && `e.g: ${placeholders[index]}`
}
