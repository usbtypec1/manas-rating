<template>
  <Button
    v-if="isPhotosShown"
    @click="isPhotosShown = false"
    label="Cкрыть фото обратно"
    class="w-full mb-4 mt-2"
    outlined
    severity="help"
  />
  <p v-if="applicants.length === 0" class="text-center font-semibold text-2xl">Нет данных</p>
  <DataTable v-else :value="applicants">
    <Column
      field="id"
      header="Рег.номер"
    />
    <Column
      field="rating"
      header="Рейтинг"
      :sortable="isColumnsSortable"
    />
    <Column
      header="Фото"
    >
      <template #body="slotProps">
        <template v-if="isAllowedToShowPhoto(slotProps.data.id)">
          <NuxtImg
            v-show="isPhotosShown"
            :src="slotProps.data.photo_url"
            loading="lazy"
          />
          <Button
            v-show="!isPhotosShown"
            label="Показать"
            outlined
            rounded
            severity="help"
            @click="onShowPhotos"
          />
        </template>
      </template>
    </Column>

    <Column
      field="natural_sciences_score"
      header="Ест.баллы"
      :sortable="isColumnsSortable"
    />
    <Column
      field="humanitarian_sciences_score"
      header="Гум.баллы"
      :sortable="isColumnsSortable"
    />
    <Column
      field="general_sciences_score"
      header="Общ.баллы"
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
      field="stage"
      header="Тур"
      :sortable="isColumnsSortable"
    />
  </DataTable>
</template>

<script setup lang="ts">
import type { SportsAndArtApplicant } from '~/types/applications'
import { isAllowedToShowPhoto } from '~/services/photos'

const isColumnsSortable = computed((): boolean => props.applicants.length > 1)

const confirm = useConfirm()

const onShowPhotos = () => {
  confirm.require({
    header: 'Показать фотографии всех абитуриентов?',
    message: 'Внимание! Вы сами несёте ответственность за просмотр фотографий других абитуриентов. Если вы считаете что ваша фотография не должна быть здесь видна, просьба написать разработчику. Продолжить?',
    accept: () => {
      isPhotosShown.value = true
    },
    acceptProps: {
      severity: 'danger',
      label: 'Да',
    },
    rejectProps: {
      severity: 'secondary',
      label: 'Нет',
    },
  })
}

const isPhotosShown = ref<boolean>(false)

const props = defineProps<{
  applicants: SportsAndArtApplicant[],
}>()
</script>
