<script setup lang="ts">
import { useGetPublisher } from '@/entities/publisher'
import { PublisherForm } from '@/features/publisher-form'
import { NotFound } from '@/shared/ui/not-found'
import { PageTitle } from '@/shared/ui/page-title'
import { useRoute } from 'vue-router'

const route = useRoute()
const { publisher } = useGetPublisher(String(route.params.publisherSlug))
</script>

<template>
  <PageTitle title="изменить издательство" />
  <PublisherForm v-if="publisher?.success" :publisher="publisher?.data" mode="edit" />
  <NotFound v-if="!publisher?.success">Издательство не найдено</NotFound>
</template>
