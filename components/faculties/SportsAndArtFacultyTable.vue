<template>
  <FacultyName :name="faculty.name" :emoji="faculty.emoji"/>
  <DataTable :value="departments">
    <Column
      field="name"
      header="Направление"
      :sortable="isColumnsSortable"
    />
    <Column
      field="firstStageStatistics.quota"
      header="Квота (1 этап)"
      :sortable="isColumnsSortable"
    />
    <Column
      field="firstStageStatistics.applicantsCount"
      header="Кол-во абитуриентов (1 этап)"
      :sortable="isColumnsSortable"
    />
    <Column
      field="secondStageStatistics.quota"
      header="Квота (2 этап)"
      :sortable="isColumnsSortable"
    />
    <Column
      field="secondStageStatistics.applicantsCount"
      header="Кол-во абитуриентов (2 этап)"
      :sortable="isColumnsSortable"
    />
  </DataTable>
</template>

<script setup lang="ts">
import type { Faculty } from '~/types/faculties'
import type { MYOApplicant, SportsAndArtApplicant } from '~/types/applications'
import FacultyName from '~/components/faculties/FacultyName.vue'
import type { Stage } from '~/types/stages'

const props = defineProps<{
  faculty: Faculty<SportsAndArtApplicant>
}>()

const isColumnsSortable = computed((): boolean => props.faculty.departments.length > 1)

const computeStatistics = (stages: Stage<MYOApplicant>[]) => {
  let firstStageStatistics
  let secondStageStatistics

  stages.forEach(stage => {
    const statistics = { quota: stage.quota, applicantsCount: stage.applicants.length }

    if (stage.number === 1) {
      firstStageStatistics = statistics
    } else if (stage.number === 2) {
      secondStageStatistics = statistics
    } else {
      console.error(`Invalid stage: ${stage.number}`)
    }
  })

  return {
    firstStageStatistics,
    secondStageStatistics,
  }
}

const departments = computed(() => {
  return props.faculty.departments.map(department => {
    return {
      id: department.id,
      name: (department.emoji ? `${department.emoji} ` : '') + department.name.ru,
      ...computeStatistics(department.stages),
    }
  })
})
</script>
