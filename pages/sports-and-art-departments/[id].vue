<template>
  <div>
    <div class="flex justify-center md:justify-end my-3">
      <SelectButton v-model="stageOption" :options="stagesOptions"/>
    </div>
    <SportsAndArtApplicantsTable :applicants="applicants"/>
    <FloatingCornerButton page-name="index" severity="primary"/>
  </div>
</template>

<script setup lang="ts">
import type { Stage } from '~/types/stages'
import type { SportsAndArtApplicant } from '~/types/applications'
import { useSportsAndArtFacultiesStore } from '~/stores/sportsAndArtFaculties'

const stagesOptions = [
  'Первый тур',
  'Второй тур',
  'Вместе',
]

const stageOption = ref<string>(stagesOptions.at(0))

const { params } = useRoute()

const departmentId = parseInt(params.id)

const sportsAndArtFacultiesStore = useSportsAndArtFacultiesStore()

if (!sportsAndArtFacultiesStore.faculties) {
  await sportsAndArtFacultiesStore.fetchAll()
}

const department = sportsAndArtFacultiesStore.getDepartmentById(departmentId)


const applicants = computed((): BachelorApplicant[] => {
  department?.stages.forEach(stage => {
    stage.applicants.forEach(applicant => {
      applicant.stage = stage.number
    })
  })

  const optionToFilterPredicate = {
    'Первый тур': (stage: Stage<SportsAndArtApplicant>): boolean => stage.number === 1,
    'Второй тур': (stage: Stage<SportsAndArtApplicant>): boolean => stage.number === 2,
    'Вместе': (stage: Stage<SportsAndArtApplicant>): boolean => true,
  }

  const filterPredicate = optionToFilterPredicate[stageOption.value]

  const stages = department?.stages.filter(filterPredicate)

  return stages.flatMap((stage: Stage<SportsAndArtApplicant>) => stage.applicants)
})
</script>
