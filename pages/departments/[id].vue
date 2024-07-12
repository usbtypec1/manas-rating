<template>
  <div>
    <DepartmentApplicationsTable
      :applications="data.applications"
      :facultyName="data.facultyName.ru"
      :departmentName="data.departmentName.ru"
    />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

const route = useRoute()

const url = `https://manas-ratings.vercel.app/api/departments/${route.params.id}`
const { data }: { data: Ref<DepartmentRatings> } = await useFetch(url)
</script>
