<template>
  <div>
    <FacultyList
      :bachelor-faculties="bachelorFacultiesData.body"
      :myo-faculties="myoFacultiesData.body"
      :sports-and-art-faculties="sportsAndArtFacultiesData.body"
    />
  </div>
</template>

<script setup lang="ts">
import type { Faculty } from '~/types/faculties'
import type { BachelorApplicant } from '~/types/applications'
import FacultyList from '~/components/faculties/FacultyList.vue'


const { data: bachelorFacultiesData } = await useAsyncData('bachelor', () => queryContent<Faculty<BachelorApplicant>[]>('2024', 'bachelor').findOne())
const { data: myoFacultiesData } = await useAsyncData('myo', () => queryContent<Faculty<BachelorApplicant>[]>('2024', 'myo').findOne())
const { data: sportsAndArtFacultiesData } = await useAsyncData('sports_and_art', () => queryContent<Faculty<BachelorApplicant>[]>('2024', 'sports_and_art').findOne())
</script>