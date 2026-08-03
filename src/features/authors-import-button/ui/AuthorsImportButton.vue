<script setup lang="ts">
import { useImportAuthors } from '@/entities/author'
import { FileImportDialog } from '@/features/file-import-dialog'

const { importAuthors, isAuthorsImported, isAuthorsError, isAuthorsImporting } = useImportAuthors()
</script>

<template>
  <FileImportDialog
    title="Импортировать"
    trigger-title="Импортировать"
    dialog-header="Импортировать авторов"
    :is-importing="isAuthorsImporting"
    :is-imported="isAuthorsImported"
    :is-error="isAuthorsError"
    :import-file="importAuthors"
    example-table-variant="authors"
  />
</template>
