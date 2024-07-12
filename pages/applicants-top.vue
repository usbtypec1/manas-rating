<template>
  <div>
    <ApplicantsTopTable :applicants="applicantsTop"/>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch<DepartmentRatings[]>('https://manas-ratings.vercel.app/api/departments')


const applicantsTop = computed((): GlobalRatingApplicant[] => {
  if (data.value === null) return []
  const allApplicationsWithDepartmentNames = data.value.flatMap((department) => department.applications.map((application) => ({
    id: application.applicantId,
    departmentName: department.departmentName.ru,
    primaryScore: application.primaryScore,
    isPassed: application.isPassed,
  })))
  const sortedByPrimaryScore = allApplicationsWithDepartmentNames.toSorted((a, b) => b.primaryScore - a.primaryScore)
  const applicantsWithRating = sortedByPrimaryScore.map((application, index) => ({ ...application, rating: index + 1 }))
  return applicantsWithRating.slice(0, 100)
})
</script>
