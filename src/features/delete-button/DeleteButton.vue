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
    confirmMessage: 'Вы уверены? Это действие необратимо.',
    confirmIcon: 'trash',
    isIcon: false,
  },
)

const confirm = useConfirm()

const emit = defineEmits(['delete'])
const deleteConfirm = () => {
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
      label: 'Удалить',
      severity: 'danger',
    },
    accept: () => {
      emit('delete')
    },
  })
}
</script>

<template>
  <ActionButton
    v-if="!isIcon"
    :title
    class="w-fit border-2 border-red-400 text-red-400 bg-transparent hover:bg-red-400 hover:text-white"
    @click="deleteConfirm"
  >
    <span class="pi pi-trash"></span>
  </ActionButton>
  <button v-if="isIcon" @click="deleteConfirm">
    <span class="pi pi-trash p-3 hover:bg-red-500 cursor-pointer rounded-full transition"></span>
  </button>
</template>
