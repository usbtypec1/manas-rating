import { computeApplicationsStatistics } from '~/services/statistics'

export const useRatingsStore = defineStore('departmentsStatistics', () => {
  const facultiesDepartments = ref<FacultyDepartments[]>()
  const departmentsRatings = ref<DepartmentRatings[]>()

  const setFacultiesDepartments = (data: FacultyDepartments[]) => facultiesDepartments.value = data
  const setDepartmentsRatings = (data: DepartmentRatings[]) => departmentsRatings.value = data

  const facultiesDepartmentsStatistics = computed(() => {
    if (!facultiesDepartments.value || !departmentsRatings.value) return []

    const departmentIdToStatistics = new Map()
    for (const { departmentId, quota, applications } of departmentsRatings.value) {
      const departmentStatistics = computeApplicationsStatistics(applications)
      departmentIdToStatistics.set(departmentId, { ...departmentStatistics, quota })
    }

    return facultiesDepartments.value.map(({ facultyName, departments }) => {
      const departmentsWithStatistics = departments.map(department => {
        return {
          ...department,
          statistics: departmentIdToStatistics.get(department.id),
        }
      })
      return { facultyName, departments: departmentsWithStatistics }
    })
  })

  return {
    facultiesDepartments,
    setFacultiesDepartments,
    departmentsRatings,
    setDepartmentsRatings,
    facultiesDepartmentsStatistics,
  }
})