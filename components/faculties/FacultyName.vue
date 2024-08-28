<template>
  <h2 class="font-semibold my-3 text-center text-2xl">{{ emoji }} {{ name[language] }}</h2>
</template>

<script setup lang="ts">
import type { KgAndRu } from '~/types/common'

defineProps<{ name: KgAndRu, emoji: string }>()

const language: 'ru' | 'kg' = inject('language')
</script>
