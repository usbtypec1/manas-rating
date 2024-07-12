<template>
  <div>
    <div class="flex justify-center">
      <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-1/2"/>
    </div>
    <ApplicantsTopTable class="mt-4" :applicants="applicantsTop"/>
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


const applicantsCountByDepartmentNames = computed((): { data: number[], labels: string[] } => {
  if (applicantsTop.value.length === 0) return { data: [], labels: [] }

  const applicantsCountByDepartmentNames = applicantsTop.value.reduce((acc, applicant) => {
    if (acc[applicant.departmentName] === undefined) {
      acc[applicant.departmentName] = 1
    } else {
      acc[applicant.departmentName] += 1
    }
    return acc
  }, {} as Record<string, number>)

  return {
    data: Object.values(applicantsCountByDepartmentNames),
    labels: Object.keys(applicantsCountByDepartmentNames),
  }
})

const BACKGROUND_COLORS = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFA1',
  '#A133FF', '#FFA133', '#57FF33', '#5733FF', '#FF3357',
  '#33A1FF', '#A1FF33', '#FF57A1', '#33FFA1', '#A1FF57',
  '#FF33FF', '#33FF33', '#FF3357', '#57FF57', '#FF5733',
  '#5733A1', '#33A1A1', '#A15733', '#57A1FF', '#FFA157',
  '#57FFA1', '#A1FFA1', '#33A1FF', '#A1FF33', '#33FF57',
  '#A133FF', '#FFA1FF', '#A1FFA1', '#FF57A1', '#33FFA1',
  '#A1FF57', '#FF33FF', '#33FF33', '#FF3357', '#57FF57',
];

const HOVER_BACKGROUND_COLORS = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFA1',
  '#A133FF', '#FFA133', '#57FF33', '#5733FF', '#FF3357',
  '#33A1FF', '#A1FF33', '#FF57A1', '#33FFA1', '#A1FF57',
  '#FF33FF', '#33FF33', '#FF3357', '#57FF57', '#FF5733',
  '#5733A1', '#33A1A1', '#A15733', '#57A1FF', '#FFA157',
  '#57FFA1', '#A1FFA1', '#33A1FF', '#A1FF33', '#33FF57',
  '#A133FF', '#FFA1FF', '#A1FFA1', '#FF57A1', '#33FFA1',
  '#A1FF57', '#FF33FF', '#33FF33', '#FF3357', '#57FF57',
];

const chartData = computed(() => {
  return {
    labels: applicantsCountByDepartmentNames.value.labels,
    datasets: [
      {
        data: applicantsCountByDepartmentNames.value.data,
        backgroundColor: BACKGROUND_COLORS.slice(0, applicantsCountByDepartmentNames.value.data.length),
        hoverBackgroundColor: HOVER_BACKGROUND_COLORS.slice(0, applicantsCountByDepartmentNames.value.data.length),
      },
    ],
  }
})
const chartOptions = ref({
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        color: '#000',
      },
    },
  },
})

</script>
