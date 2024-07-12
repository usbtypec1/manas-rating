export const computeAverage = (numbers: number[]): number => {
  const average = numbers.reduce((sum, num) => sum + num, 0) / numbers.length
  return Math.round((average + Number.EPSILON) * 100) / 100
}


export const computeApplicationsStatistics = (applications: Application[]): DepartmentStatistics => {
  const passedApplications = applications.filter(({ isPassed }) => isPassed)

  const applicationsCount = applications.length

  const allPrimaryScores = applications.map(application => application.primaryScore)
  const passedPrimaryScores = passedApplications.map(application => application.primaryScore)

  const minPrimaryScore = Math.min(...allPrimaryScores)
  const maxPrimaryScore = Math.max(...allPrimaryScores)
  const averagePrimaryScore = computeAverage(allPrimaryScores)

  const passedMinPrimaryScore = Math.min(...passedPrimaryScores)
  const passedAveragePrimaryScore = computeAverage(passedPrimaryScores)

  return {
    applicationsCount,
    minPrimaryScore,
    maxPrimaryScore,
    averagePrimaryScore,
    passedMinPrimaryScore,
    passedAveragePrimaryScore,
  }
}