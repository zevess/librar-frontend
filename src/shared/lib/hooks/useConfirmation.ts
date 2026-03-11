import { useConfirm } from 'primevue'

interface IConfirmationTypes {
  accept: () => void
}

export const useConfirmation = () => {
  const confirm = useConfirm()

  confirm.require({
    message: 'Вы уверены? Это действие необратимо.',
    header: 'Удалить книгу',
    icon: 'pi pi-trash',
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
    accept() {},
  })
}
