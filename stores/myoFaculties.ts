import type { Faculty } from '~/types/faculties'
import type { MYOApplicant } from '~/types/applications'

export const useMyoFacultiesStore = defineStore('myoFacultiesStore', () => {
  const faculties = ref<Faculty<MYOApplicant>>()

  const fetchAll = async () => {
    const { data } = await useAsyncData('myo', () => queryContent<Faculty<MYOApplicant>>('2024', 'myo').findOne())
    faculties.value = data.value.body
  }

  const getDepartmentById = (departmentId: number): Department<MYOApplicant> | undefined => {
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
