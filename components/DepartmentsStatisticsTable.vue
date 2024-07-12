<template>
  <DataTable
    v-for="{ facultyName, departments } in facultiesDepartmentsStatistics"
    :value="departments"
    striped-rows
    style="margin-bottom: 4rem"
  >
    <template #header>
      <h3 class="text-center text-xl font-bold">{{ facultyName }}</h3>
    </template>
    <Column header="Направление">
      <template #body="slotProps">
        <NuxtLink :to="{ name: 'departments-id', params: { id: slotProps.data.id } }">
          <span class="text-violet-500">{{ slotProps.data.name }}</span>
        </NuxtLink>
      </template>
    </Column>
    <Column field="statistics.maxPrimaryScore" header="Макс.балл" sortable/>
    <Column field="statistics.minPrimaryScore" header="Мин.балл" sortable/>
    <Column field="statistics.averagePrimaryScore" header="Ср.балл" sortable/>
    <Column field="statistics.passedMinPrimaryScore" header="Мин.проходной балл" sortable/>
    <Column field="statistics.passedAveragePrimaryScore" header="Ср.проходной балл" sortable/>
    <Column field="statistics.quota" header="Квота" sortable/>
    <Column field="statistics.applicationsCount" header="Кол-во абитуриентов" sortable/>
  </DataTable>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

defineProps<{
  facultiesDepartmentsStatistics: FacultyDepartmentsStatistics[],
}>()
</script>