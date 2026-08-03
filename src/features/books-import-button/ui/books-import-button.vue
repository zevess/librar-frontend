<script setup lang="ts">
import { useImportBooks } from '@/entities/book'
import { FileImportDialog } from '@/features/file-import-dialog'

const { importBooks, isBooksImporting, isBooksImported, isBooksError } = useImportBooks()
</script>

<template>
  <FileImportDialog
    title="Импортировать"
    trigger-title="Импортировать"
    dialog-header="Импортировать книги"
    :is-importing="isBooksImporting"
    :is-imported="isBooksImported"
    :is-error="isBooksError"
    :import-file="importBooks"
    example-table-variant="books"
  />
</template>
