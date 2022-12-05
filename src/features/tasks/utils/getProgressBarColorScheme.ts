export const getProgressBarColorScheme = (percentage: number): string => {
  switch (true) {
    case percentage < 40:
      return 'red'
    case percentage >= 40 && percentage <= 99:
      return 'orange'
    case percentage > 99:
      return 'green'
    default:
      return 'green'
  }
}
