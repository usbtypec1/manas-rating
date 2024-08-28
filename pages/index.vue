<template>
  <div>
    <FacultyList
      :bachelor-faculties="bachelorFacultiesStore.faculties"
      :myo-faculties="myoFacultiesData.body"
      :sports-and-art-faculties="sportsAndArtFacultiesStore.faculties"
    />
  </div>
</template>

<script setup lang="ts">
import type { Faculty } from '~/types/faculties'
import type { BachelorApplicant } from '~/types/applications'
import FacultyList from '~/components/faculties/FacultyList.vue'
import { useBachelorFacultiesStore } from '~/stores/bachelorFaculties'
import { useSportsAndArtFacultiesStore } from '~/stores/sportsAndArtFaculties'

const bachelorFacultiesStore = useBachelorFacultiesStore()
const sportsAndArtFacultiesStore = useSportsAndArtFacultiesStore()

if (!bachelorFacultiesStore.faculties) {
  await bachelorFacultiesStore.fetchAll()
}
if (!sportsAndArtFacultiesStore.faculties) {
  await sportsAndArtFacultiesStore.fetchAll()
}

const { data: myoFacultiesData } = await useAsyncData('myo', () => queryContent<Faculty<BachelorApplicant>[]>('2024', 'myo').findOne())
</script>