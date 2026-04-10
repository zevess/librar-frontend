<script setup lang="ts">
import { ActionButton } from '@/shared/ui/action-button'
import { useConfirm } from 'primevue'
const props = withDefaults(
  defineProps<{
    title?: string
    confirmMessage?: string
    confirmHeader?: string
    confirmIcon?: string
    isIcon?: boolean
  }>(),
  {
    confirmMessage: 'Вы уверены? Пользователь будет восстановлен со всеми данными',
    confirmIcon: 'wrench',
    isIcon: false,
  },
)

const confirm = useConfirm()

const emit = defineEmits(['restore'])
const restoreConfirm = () => {
  confirm.require({
    message: `${props.confirmMessage}`,
    header: `${props.confirmHeader}`,
    icon: `pi pi-${props.confirmIcon}`,
    rejectLabel: 'Отмена',
    rejectProps: {
      label: 'Отмена',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Восстановить',
      severity: 'info',
    },
    accept: () => {
      emit('restore')
    },
  })
}
</script>

<template>
  <ActionButton
    v-if="!isIcon"
    :title
    class="w-fit border-2 border-blue-400 text-blue-400 bg-transparent hover:bg-blue-400 hover:text-white"
    @click="restoreConfirm"
  >
    <span class="pi pi-wrench"></span>
  </ActionButton>
  <button v-if="isIcon" @click="restoreConfirm">
    <span class="pi pi-wrench p-3 hover:bg-blue-400 cursor-pointer rounded-full transition"></span>
  </button>
</template>
