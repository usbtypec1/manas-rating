<template>
  <div
    v-for="faculty in bachelorFaculties"
    :key="faculty.id"
    class="my-6"
  >
    <BachelorFacultyTable :faculty="faculty"/>
  </div>

  <div
    v-for="faculty in myoFaculties"
    :key="faculty.id"
    class="my-6"
  >
    <MYOFacultyTable :faculty="faculty"/>
  </div>

  <div
    v-for="faculty in sportsAndArtFaculties"
    :key="faculty.id"
    class="my-6"
  >
    <SportsAndArtFacultyTable :faculty="faculty"/>
  </div>
</template>

<script setup lang="ts">
import type { Faculty } from '~/types/faculties'
import type { BachelorApplicant, MYOApplicant, SportsAndArtApplicant } from '~/types/applications'
import BachelorFacultyTable from '~/components/faculties/BachelorFacultyTable.vue'
import MYOFacultyTable from '~/components/faculties/MYOFacultyTable.vue'
import SportsAndArtFacultyTable from '~/components/faculties/SportsAndArtFacultyTable.vue'

defineProps<{
  bachelorFaculties: Faculty<BachelorApplicant>[],
  myoFaculties: Faculty<MYOApplicant>[],
  sportsAndArtFaculties: Faculty<SportsAndArtApplicant>[],
}>()
</script>
