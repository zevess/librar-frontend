<script setup lang="ts">
import { useCancelReservation } from '@/entities/reservation'
import { ActionButton } from '../action-button'

const props = defineProps<{
  reservationId: number
}>()

const { cancel } = useCancelReservation()

const cancelReservation = () => {
  cancel(String(props.reservationId))
}
</script>

<template>
  <ActionButton @click="cancelReservation" title="Отменить" />
</template>
