export const getSeverity = (status: string) => {
  switch (status) {
    case 'reserved':
      return 'info'

    case 'issued':
      return 'warn'

    case 'canceled':
      return 'danger'

    case 'completed':
      return 'success'
  }
}
