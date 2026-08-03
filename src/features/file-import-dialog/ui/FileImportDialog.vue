<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { ImportTableExample } from '@/shared/ui/import-table-example'
import { Button, Dialog, FileUpload, type FileUploadSelectEvent } from 'primevue'
import { ref, watch } from 'vue'

const props = defineProps<{
  triggerTitle: string
  title: string
  dialogHeader: string
  isImporting: boolean
  isImported: boolean
  isError: boolean
  importFile: Function
  exampleTableVariant?: 'books' | 'authors' | 'publishers'
}>()

const visible = ref(false)

const file = ref<File | null>(null)

const onFileSelect = (event: FileUploadSelectEvent) => {
  const selectedFile = event.files[0] || null
  file.value = selectedFile
}

const clearFile = () => {
  file.value = null
}

const onSubmit = () => {
  if (!file.value) return
  props.importFile(file.value)
}
watch(
  () => props.isImported,
  () => {
    if (props.isImported) {
      clearFile()
      visible.value = false
    }
  },
)
</script>

<template>
  <div class="flex justify-center">
    <ActionButton variant="blue" class="flex items-center gap-2" @click="visible = true"
      >{{ triggerTitle }} <span class="pi pi-file-import"></span
    ></ActionButton>
    <Dialog
      v-model:visible="visible"
      modal
      :header="dialogHeader"
      :dismissable-mask="!isImporting"
      :closable="!isImporting"
    >
      <div class="w-full max-w-70 sm:max-w-80 md:max-w-full">
        <div v-if="!file">
          <span>Загрузите Excel-документ с полями:</span>
          <ImportTableExample :variant="exampleTableVariant" class="my-4" />
        </div>

        <div class="card flex flex-col md:flex-row items-center gap-6">
          <div v-if="!file" class="w-full">
            <FileUpload
              :disabled="Boolean(file)"
              mode="basic"
              accept=".xlsx"
              @select="onFileSelect"
              customUpload
              auto
              chooseLabel="Выбрать"
              class="p-button-outlined w-full!"
              style="border-color: #d1ebe9; border-radius: 6px; border-width: 2px; color: #a4c8c6"
            />
          </div>
          <div
            v-if="file"
            class="relative w-full flex justify-between items-center bg-gray-100 py-3 px-2"
          >
            <div>{{ file.name }}</div>
            <span
              @click="clearFile()"
              class="pi pi-times transition hover:bg-red-400 p-2 rounded-full cursor-pointer"
            ></span>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-col gap-3 w-full">
          <div class="flex w-full justify-between">
            <Button
              severity="secondary"
              variant="outlined"
              :disabled="isImporting"
              @click="visible = false"
              >Закрыть</Button
            >
            <ActionButton
              variant="blue"
              :disabled="isImporting || !file"
              class="flex items-center gap-2"
              @click="onSubmit"
              >{{ title }} <span class="pi pi-file-import"></span
            ></ActionButton>
          </div>
          <span v-if="isError" class="text-red-400">
            Возникла ошибка при импорте. Повторите позже
          </span>
        </div>
      </template>
    </Dialog>
  </div>
</template>
