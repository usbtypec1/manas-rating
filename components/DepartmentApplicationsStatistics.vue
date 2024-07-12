<template>
  <div class="text-center text-lg font-bold">
    <p>Минимальный балл: {{ applicationStatistics.minPrimaryScore }}</p>
    <p>Максимальный балл: {{ applicationStatistics.maxPrimaryScore }}</p>
    <p>Общий средний балл : {{ applicationStatistics.averagePrimaryScore }}</p>

    <template v-if="applicationStatistics.applicationsCount > quota">
      <p>Минимальный проходной балл: {{ applicationStatistics.minPrimaryScore }}</p>
      <p>Средний балл среди тех кто прошёл: {{ applicationStatistics.averagePrimaryScore }}</p>
    </template>

    <p>Квота: {{ quota }}</p>
    <p>Подалось абитуриентов: {{ applicationStatistics.applicationsCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computeApplicationsStatistics } from '~/services/statistics.js'

const props = defineProps<{
  applications: Application[],
  quota: number,
}>()

const applicationStatistics = computed((): DepartmentStatistics => computeApplicationsStatistics(props.applications ?? []))
</script>