<script setup lang="ts">
import { PublisherForm } from '@/features/publisher-form'
import { PageTitle } from '@/shared/ui/page-title'
</script>

<template>
  <PageTitle title="добавить издательство" />
  <Toast />
  <PublisherForm mode="create" />
</template>
