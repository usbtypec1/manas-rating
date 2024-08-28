<template>
  <div>
    <div class="flex justify-center md:justify-end my-3">
      <SelectButton v-model="stageOption" :options="stagesOptions"/>
    </div>
    <MYOApplicantsTable :applicants="applicants"/>
    <FloatingCornerButton page-name="index" severity="primary"/>
  </div>
</template>

<script setup lang="ts">
import type { Stage } from '~/types/stages'
import type { MYOApplicant } from '~/types/applications'
import { useMyoFacultiesStore } from '~/stores/myoFaculties'

const stagesOptions = [
  'Первый тур',
  'Второй тур',
  'Вместе',
]

const stageOption = ref<string>(stagesOptions.at(0))

const { params } = useRoute()

const departmentId = parseInt(params.id)

const myoFacultiesStore = useMyoFacultiesStore()

if (!myoFacultiesStore.faculties) {
  await myoFacultiesStore.fetchAll()
}

const department = myoFacultiesStore.getDepartmentById(departmentId)


const applicants = computed((): MYOApplicant[] => {
  department?.stages.forEach(stage => {
    stage.applicants.forEach(applicant => {
      applicant.stage = stage.number
    })
  })

  const optionToFilterPredicate = {
    'Первый тур': (stage: Stage<MYOApplicant>): boolean => stage.number === 1,
    'Второй тур': (stage: Stage<MYOApplicant>): boolean => stage.number === 2,
    'Вместе': (stage: Stage<MYOApplicant>): boolean => true,
  }

  const filterPredicate = optionToFilterPredicate[stageOption.value]

  const stages = department?.stages.filter(filterPredicate)

  return stages.flatMap((stage: Stage<MYOApplicant>) => stage.applicants)
})
</script>
