<template>
  <DataTable
    scrollable
    :value="applications">

    <template #header>
      <div class="text-center">
        <h2 class="text-xl font-bold">{{ facultyName }}</h2>
        <p class="text-lg font-bold">{{ departmentName }}</p>
      </div>
    </template>

    <Column field="rating" header="Рейтинг" sortable=""/>

    <Column field="applicantId" header="Рег.номер"/>

    <Column
      field="applicantId"
      header="Фото"
    >
      <template #body="slotProps">
        <template v-if="isAllowedToShowPhoto(slotProps.data.applicantId)">
          <Image
            v-show="isPhotosShown"
            :src="buildApplicantPhotoUrl(slotProps.data.applicantId)"
            width="100"
            preview
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

    <Column field="primaryScore" header="Осн.баллы" sortable/>

    <Column field="secondaryScore" header="ОРТ/Англ" sortable/>

    <Column field="createdAt" header="Дата подачи" sortable>
      <template #body="slotProps">
        {{ new Date(slotProps.data.createdAt).toLocaleString() }}
      </template>
    </Column>

    <Column field="isPassed" header="Прошёл">
      <template #body="slotProps">
        <Tag v-if="slotProps.data.isPassed" severity="primary" value="Да"/>
        <Tag v-else severity="danger" value="Нет"/>
      </template>
    </Column>

  </DataTable>
</template>

<script setup lang="ts">
import {
  buildApplicantPhotoUrl,
  PHOTOS_BLACKLIST_APPLICATION_NUMBERS,
} from '~/services/photos.js'

const confirm = useConfirm()

const onShowPhotos = () => {
  confirm.require({
    header: 'Показать фотографии всех абитуриентов?',
    message: 'Внимание! Вы сами несёте ответственность за просмотр фотографий других абитуриентов. Продолжить?',
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

const isAllowedToShowPhoto = (applicantId: string): boolean => !PHOTOS_BLACKLIST_APPLICATION_NUMBERS.includes(applicantId)

defineProps<{
  facultyName: string,
  departmentName: string,
  applications: Application[],
}>()
</script>