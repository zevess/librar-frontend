<script setup lang="ts">
import { useCancelReservation } from '@/entities/reservation'
import { ActionButton } from '@/shared/ui/action-button'

const props = defineProps<{
  reservationId: number
}>()

const { cancel, isPending } = useCancelReservation()

const cancelReservation = () => {
  cancel(String(props.reservationId))
}
</script>

<template>
  <ActionButton :disabled="isPending" @click="cancelReservation" title="Отменить" />
</template>
