<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<script setup>
import 'primeicons/primeicons.css'
import { useRatingsStore } from '~/stores/ratings'
import facultiesDepartments from '~/assets/facultiesDepartments.json'

const ratingsStore = useRatingsStore()

ratingsStore.setFacultiesDepartments(facultiesDepartments)
</script>
