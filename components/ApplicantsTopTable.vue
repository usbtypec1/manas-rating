<template>
  <DataTable :value="applicants">
    <Column field="rating" header="Рейтинг" sortable/>
    <Column field="id" header="Рег.номер"/>
    <Column field="primaryScore" header="Осн.баллы" sortable/>
    <Column field="departmentName" header="Направление"/>
    <Column field="isPassed" header="Прошёл">
      <template #body="slotProps">
        <Tag v-if="slotProps.data.isPassed" severity="primary" value="Да"/>
        <Tag v-else severity="danger" value="Нет"/>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
defineProps<{
  applicants: GlobalRatingApplicant[],
}>()
</script>
