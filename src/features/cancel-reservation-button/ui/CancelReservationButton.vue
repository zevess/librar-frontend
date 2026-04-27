<script setup lang="ts">
import { useCancelReservation } from '@/entities/reservation'
import { ActionButton } from '@/shared/ui/action-button'

const props = defineProps<{
  reservationId: number
  variant: 'profile' | 'admin'
}>()

const { cancel, isCanceling } = useCancelReservation(props.variant)

const cancelReservation = () => {
  cancel(String(props.reservationId))
}
</script>

<template>
  <ActionButton :disabled="isCanceling" @click="cancelReservation" title="Отменить" />
</template>
