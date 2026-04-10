import type { DataTableRowEditSaveEvent } from 'primevue'
import type { Ref } from 'vue'

export const useRowActions = (rows: Ref) => {
  //   const onRowEditSave = (rowSaveAction: () => void) => {
  //     rowSaveAction()
  //   }

  const onRowEditClose = (rowData: any) => {
    rows.value = rows.value.filter((row: any) => row.id !== rowData.id)
  }

  return { onRowEditClose }
}
