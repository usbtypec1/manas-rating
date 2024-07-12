export {}

declare global {
  interface Application {
    rating: number
    applicantId: string
    primaryScore: number
    secondaryScore: number
    createdAt: string
    isPassed: boolean
  }

  interface DepartmentStatistics {
    applicationsCount: number
    minPrimaryScore: number
    maxPrimaryScore: number
    averagePrimaryScore: number
    passedMinPrimaryScore: number
    passedAveragePrimaryScore: number
  }

  interface Department {
    id: string
    name: string
  }

  interface FacultyDepartments {
    facultyName: string
    departments: Department[]
  }

  interface NameKGAndRU {
    kg: string
    ru: string
  }

  interface DepartmentRatings {
    departmentId: number
    departmentName: NameKGAndRU
    facultyName: NameKGAndRU
    quota: number
    applications: Application[]
  }

  interface DepartmentWithStatistics {
    id: number
    name: NameKGAndRU
    quota: number
    applicationsCount: number
    minPrimaryScore: number
    maxPrimaryScore: number
    averagePrimaryScore: number
    passedMinPrimaryScore: number
    passedAveragePrimaryScore: number

  }

  interface FacultyDepartmentsStatistics {
    facultyName: string
    departments: DepartmentWithStatistics[]
  }
}
