<template>
  <div class="text-center">
    <h1
      class="text-3xl font-bold my-3 select-none"
      @click="onClick"
    >
      Улучшенный (неофициальный) рейтинг абитуриентов университета Манас
    </h1>
    <span class="my-2 text-xl">Наш чат - <a class="text-violet-500" href="https://t.me/studmanas1"
                                                    target="_blank">@studmanas1</a></span>
    <span>  |  </span>
    <span class="my-2 text-xl">Наш канал - <a class="text-violet-500" href="https://t.me/manashelp"
                                                    target="_blank">@manashelp</a></span>
    <p class="my-2 text-xl">Разработчик - <a class="text-violet-500" href="https://t.me/usbtypec" target="_blank">@usbtypec</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm'

const counter = ref<number>(0)

const confirm = useConfirm()

const isPhotosEnabled = useState('isPhotosEnabled', () => false)

const onClick = () => {
  if (counter.value >= 15 && !isPhotosEnabled.value) {
    confirm.require({
      header: 'Секретная функция',
      message: 'Показать фотографии всех абитуриентов?',
      acceptProps: {
        severity: 'danger',
        label: 'Да',
      },
      rejectProps: {
        severity: 'success',
        label: 'Нет',
      },
      accept: () => {
        isPhotosEnabled.value = true
        counter.value = 0
      },
      reject: () => counter.value = 0
    })
  } else {
    counter.value += 1
  }
}
</script>
