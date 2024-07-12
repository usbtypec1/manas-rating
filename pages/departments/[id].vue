<template>
  <div>
    <DepartmentApplicationsStatistics
      :applications="data.applications"
      :quota="data.quota"
    />
    <div class="flex justify-end mx-3">
      <Button
        label="Обновить"
        outlined
        rounded
        :loading="status === 'pending'"
        @click="refresh"
      />
    </div>
    <DepartmentApplicationsTable
      :applications="data.applications"
      :facultyName="data.facultyName.ru"
      :departmentName="data.departmentName.ru"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const url = `/api/departments/${route.params.id}`
const { data, refresh, status } = await useFetch(url)
</script>
