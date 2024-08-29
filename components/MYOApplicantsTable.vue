<template>
  <p v-if="applicants.length === 0" class="text-center font-semibold text-2xl">Нет данных</p>
  <DataTable v-else :value="applicants">
    <Column
      field="ort_certificate_number"
      header="Номер сертификата ОРТ"
    />
    <Column
      field="rating"
      header="Рейтинг"
      :sortable="isColumnsSortable"
    />
    <Column
      field="ort_score"
      header="ОРТ баллы"
      :sortable="isColumnsSortable"
    />
    <Column
      field="created_at"
      header="Дата подачи"
      :sortable="isColumnsSortable"
    >
      <template #body="slotProps">
        {{ new Date(slotProps.data.created_at).toLocaleString() }}
      </template>
    </Column>
    <Column
      field="is_passed"
      header="Прошел"
      :sortable="isColumnsSortable"
    >
      <template #body="slotProps">
        <Tag v-if="slotProps.data.is_passed" severity="primary" value="Да"/>
        <Tag v-else severity="danger" value="Нет"/>
      </template>
    </Column>
    <Column
      field="stage"
      header="Тур"
      :sortable="isColumnsSortable"
    />
  </DataTable>
</template>

<script setup lang="ts">
import type { MYOApplicant } from '~/types/applications'

const isColumnsSortable = computed((): boolean => props.applicants.length > 1)

const props = defineProps<{
  applicants: MYOApplicant[],
}>()
</script>
