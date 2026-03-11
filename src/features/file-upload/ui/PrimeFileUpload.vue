<script setup lang="ts">
import { StoredImage } from '@/shared/ui/stored-image'
import { FileUpload, type FileUploadSelectEvent } from 'primevue'

const src = defineModel<string | null>('src')
const image = defineModel<File | null>('image')
function onFileSelect(event: FileUploadSelectEvent) {
  const file = event.files[0]
  if (file) {
    image.value = file
  }
  const reader = new FileReader()

  reader.onload = async (e: ProgressEvent<FileReader>) => {
    src.value = e.target?.result as string
  }

  reader.readAsDataURL(file)
}

function clearImage() {
  src.value = null
  image.value = null
}
</script>

<template>
  <div class="card flex flex-col md:flex-row items-center gap-6">
    <FileUpload
      mode="basic"
      accept="image/*"
      @select="onFileSelect"
      customUpload
      auto
      chooseLabel="Выбрать"
      class="p-button-outlined"
      style="border-color: #d1ebe9; border-radius: 6px; border-width: 2px; color: #a4c8c6"
    />
    <span v-if="!image && !src">Изображение не выбрано</span>
    <div v-if="src" class="relative">
      <img v-if="image" :src="src" alt="Обложка" class="max-h-52" />

      <StoredImage v-if="!image" :url="src" alt="Image" styles="max-h-52" />

      <span
        @click="clearImage()"
        class="pi pi-times absolute top-0 right-0 bg-red-400 p-2 cursor-pointer"
      ></span>
    </div>
  </div>
</template>
