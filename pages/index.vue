<template>
  <div>
    <div class="text-center">
      <ContactInfo/>
    </div>
    <DepartmentsStatisticsTable
      :faculties-departments-statistics="ratingsStore.facultiesDepartmentsStatistics"
    />
  </div>
</template>

<script setup lang="ts">
import { useRatingsStore } from '~/stores/ratings'
import type { Ref } from 'vue'

const {
  data,
}: { data: Ref<DepartmentRatings[]> } = await useFetch('https://manas-ratings.vercel.app/api/departments')

const ratingsStore = useRatingsStore()

ratingsStore.setDepartmentsRatings(data.value)
</script>