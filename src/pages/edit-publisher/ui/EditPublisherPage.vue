<script setup lang="ts">
import { useGetPublisher } from '@/entities/publisher'
import { PublisherForm } from '@/features/publisher-form'
import { useGetParams } from '@/shared/lib'
import { Message } from '@/shared/ui/message'
import { PageTitle } from '@/shared/ui/page-title'
import { ConfirmDialog, Toast } from 'primevue'
import { watchEffect } from 'vue'

const { slug } = useGetParams()
const { publisher } = useGetPublisher(slug)
watchEffect(() => {
  const title = publisher.value?.data?.name
  document.title = title ? 'Изменить ' + title : 'Загрузка...'
})
</script>

<template>
  <PageTitle title="изменить издательство" />
  <ConfirmDialog></ConfirmDialog>
  <PublisherForm v-if="publisher?.success" :publisher="publisher?.data" mode="edit" />
  <Message v-if="!publisher?.success">Издательство не найдено</Message>
</template>
