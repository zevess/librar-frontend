<script setup lang="ts">
import { FileUpload, type FileUploadSelectEvent } from 'primevue'
import { ref, watch } from 'vue'

const src = ref<string | null>(null)
const image = ref<File | null>(null)
function onFileSelect(event: FileUploadSelectEvent) {
  const file = event.files[0]

  image.value = file
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

watch(image, () => {
  console.log(image)
})
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
    <span v-if="!image">Изображение не выбрано</span>
    <img
      v-if="src"
      @click="clearImage()"
      :src="src"
      alt="Image"
      class="shadow-md rounded w-full max-h-52"
    />
  </div>
</template>
