export const getProgressBarColorScheme = (percentage: number): string => {
  switch (true) {
    case percentage < 30:
      return 'red'
    case percentage >= 30 && percentage <= 60:
      return 'orange'
    case percentage > 60:
      return 'green'
    default:
      return 'green'
  }
}
