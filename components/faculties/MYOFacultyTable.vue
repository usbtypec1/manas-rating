<template>
  <FacultyName :name="faculty.name" :emoji="faculty.emoji"/>
  <DataTable :value="departments">
    <Column field="name" header="Направление"/>
    <Column
      field="firstStageStatistics.minPassingPrimaryScore.label"
      sort-field="firstStageStatistics.minPassingPrimaryScore.value"
      :sortable="isColumnsSortable"
      header="Проходной балл (1 этап)"
    />
    <Column
      field="firstStageStatistics.maxPrimaryScore.label"
      sort-field="firstStageStatistics.maxPrimaryScore.value"
      header="Макс. балл (1 этап)"
      :sortable="isColumnsSortable"
    />
    <Column
      field="secondStageStatistics.minPassingPrimaryScore.label"
      sort-field="secondStageStatistics.minPassingPrimaryScore.value"
      header="Проходной балл (2 этап)"
      :sortable="isColumnsSortable"
    />
    <Column
      field="secondStageStatistics.maxPrimaryScore.label"
      sort-field="secondStageStatistics.maxPrimaryScore.value"
      header="Макс. балл (2 этап)"
      :sortable="isColumnsSortable"
    />
  </DataTable>
</template>

<script setup lang="ts">
import type { Faculty } from '~/types/faculties'
import type { MYOApplicant } from '~/types/applications'
import FacultyName from '~/components/faculties/FacultyName.vue'
import type { Stage } from '~/types/stages'

const props = defineProps<{
  faculty: Faculty<MYOApplicant>
}>()

const isColumnsSortable = computed((): boolean => props.faculty.departments.length > 1)

const computeStatistics = (stages: Stage<MYOApplicant>[]) => {
  let firstStageStatistics
  let secondStageStatistics

  stages.forEach(stage => {
    const passedApplicants = stage.applicants.filter(({ is_passed }) => is_passed)
    const passedApplicantsPrimaryScores = passedApplicants.map(({ ort_score }) => ort_score)
    const primaryScores = stage.applicants.map(({ ort_score }) => ort_score)

    let minPassingPrimaryScoreLabel
    let minPassingPrimaryScoreValue
    let maxPrimaryScoreLabel
    let maxPrimaryScoreValue

    if (passedApplicantsPrimaryScores.length === 0) {
      minPassingPrimaryScoreLabel = '-'
      minPassingPrimaryScoreValue = 0
    } else {
      minPassingPrimaryScoreLabel = Math.min(...passedApplicantsPrimaryScores)
      minPassingPrimaryScoreValue = minPassingPrimaryScoreLabel
    }

    if (primaryScores.length === 0) {
      maxPrimaryScoreLabel = '-'
      maxPrimaryScoreValue = 0
    } else {
      maxPrimaryScoreLabel = Math.max(...primaryScores)
      maxPrimaryScoreValue = maxPrimaryScoreLabel
    }

    const statistics = {
      minPassingPrimaryScore: {
        label: minPassingPrimaryScoreLabel,
        value: minPassingPrimaryScoreValue,
      },
      maxPrimaryScore: {
        label: maxPrimaryScoreLabel,
        value: maxPrimaryScoreValue,
      },
    }

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
