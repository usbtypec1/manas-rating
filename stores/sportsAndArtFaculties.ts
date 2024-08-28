export const useSportsAndArtFacultiesStore = defineStore('sportsAndArtFacultiesStore', () => {
  const faculties = ref<Faculty<SportsAndArtApplicant>[]>()

  const fetchAll = async () => {
    const { data } = await useAsyncData('sportsAndArt', () => queryContent<Faculty<SportsAndArtApplicant>[]>('2024', 'sports_and_art').findOne())
    faculties.value = data.value.body
  }

  const getDepartmentById = (departmentId: number): Department<SportsAndArtApplicant> | undefined => {
    return faculties.value
      ?.flatMap(faculty => faculty.departments)
      ?.find(department => department.id === departmentId)
  }

  return {
    faculties,
    fetchAll,
    getDepartmentById,
  }
})