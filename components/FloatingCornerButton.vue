<template>
  <div class="fixed bottom-5 right-5">
    <NuxtLink :to="{ name: pageName }">
      <Button class="my-4" raised rounded size="large" icon="pi pi-arrow-left" :severity="severity"/>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ pageName: string, severity: string }>()
</script>
