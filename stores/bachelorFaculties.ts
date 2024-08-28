import { defineStore } from 'pinia'
import type { Faculty } from '~/types/faculties'
import type { BachelorApplicant } from '~/types/applications'
import type { Department } from '~/types/departments'

export const useBachelorFacultiesStore = defineStore('bachelorFacultiesStore', () => {
  const faculties = ref<Faculty<BachelorApplicant>[]>()

  const fetchAll = async () => {
    const { data } = await useAsyncData('bachelor', () => queryContent<Faculty<BachelorApplicant>[]>('2024', 'bachelor').findOne())
    faculties.value = data.value.body
  }

  const getDepartmentById = (departmentId: number): Department<BachelorApplicant> | undefined => {
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