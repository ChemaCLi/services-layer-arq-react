export const errorReporter = () => {
  return {
    report: (error) => {
      console.error(error)
    }
  }
}