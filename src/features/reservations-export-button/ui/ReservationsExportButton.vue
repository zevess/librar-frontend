<script setup lang="ts">
import { useExportReservations, type IReservationExportParams } from '@/entities/reservation'
import { ActionButton } from '@/shared/ui/action-button'
import { Input } from '@/shared/ui/input'
import { Button, Dialog } from 'primevue'
import { ref } from 'vue'

const visible = ref(false)
const startDate = ref()
const endDate = ref()
const { exportReservations, isReservationsExporting } = useExportReservations()

const onClick = () => {
  const params: IReservationExportParams = {
    start_date: startDate.value,
    end_date: endDate.value,
  }
  exportReservations(params)
}
</script>
<template>
  <div class="flex justify-center">
    <ActionButton variant="blue" class="flex items-center gap-2" @click="visible = true"
      >Экспортировать <span class="pi pi-file-export"></span
    ></ActionButton>
    <Dialog
      v-model:visible="visible"
      modal
      dismissable-mask
      header="Экспортировать брони"
      :style="{ width: '24rem' }"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700">от:</label>
          <Input v-model="startDate" type="date" class="w-full" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-gray-700">до:</label>
          <Input v-model="endDate" type="date" class="w-full" />
        </div>
      </div>
      <template #footer>
        <div class="flex w-full justify-between">
          <Button severity="secondary" variant="outlined" @click="visible = false">Закрыть</Button>
          <ActionButton
            variant="blue"
            :disabled="isReservationsExporting"
            class="flex items-center gap-2"
            @click="onClick"
            >Экспортировать <span class="pi pi-file-export"></span
          ></ActionButton>
        </div>
      </template>
    </Dialog>
  </div>
</template>
