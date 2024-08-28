<template>
  <div>
    <div class="flex justify-center md:justify-end my-3">
      <SelectButton v-model="stageOption" :options="stagesOptions"/>
    </div>
    <BachelorApplicantsTable :applicants="applicants"/>
    <FloatingCornerButton page-name="index" severity="primary"/>
  </div>
</template>

<script setup lang="ts">
import { useBachelorFacultiesStore } from '~/stores/ratings'
import type { Stage } from '~/types/stages'
import type { BachelorApplicant } from '~/types/applications'

const stagesOptions = [
  'Первый тур',
  'Второй тур',
  'Вместе',
]

const stageOption = ref<string>(stagesOptions.at(0))

const { params } = useRoute()

const departmentId = parseInt(params.id)

const bachelorFacultiesStore = useBachelorFacultiesStore()

if (!bachelorFacultiesStore.faculties) {
  await bachelorFacultiesStore.fetchAll()
}

const department = bachelorFacultiesStore.getDepartmentById(departmentId)


const applicants = computed((): BachelorApplicant[] => {
  department?.stages.forEach(stage => {
    stage.applicants.forEach(applicant => {
      applicant.stage = stage.number
    })
  })

  const optionToFilterPredicate = {
    'Первый тур': (stage: Stage<BachelorApplicant>): boolean => stage.number === 1,
    'Второй тур': (stage: Stage<BachelorApplicant>): boolean => stage.number === 2,
    'Вместе': (stage: Stage<BachelorApplicant>): boolean => true,
  }

  const filterPredicate = optionToFilterPredicate[stageOption.value]

  const stages = department?.stages.filter(filterPredicate)

  return stages.flatMap((stage: Stage<BachelorApplicant>) => stage.applicants)
})
</script>
