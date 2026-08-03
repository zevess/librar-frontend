<script setup lang="ts">
import { useImportAuthors } from '@/entities/author'
import { useImportPublishers } from '@/entities/publisher'
import { FileImportDialog } from '@/features/file-import-dialog'

const { importPublishers, isPublishersError, isPublishersImported, isPublishersImporting } =
  useImportPublishers()
</script>

<template>
  <FileImportDialog
    title="Импортировать"
    trigger-title="Импортировать"
    dialog-header="Импортировать издателей"
    :is-importing="isPublishersImporting"
    :is-imported="isPublishersImported"
    :is-error="isPublishersError"
    :import-file="importPublishers"
    example-table-variant="publishers"
  />
</template>
