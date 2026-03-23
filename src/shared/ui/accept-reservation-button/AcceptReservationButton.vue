<script setup lang="ts">
import { useAcceptReservation } from '@/entities/reservation'
import { ActionButton } from '../action-button'

const props = defineProps<{
  reservationId: number
}>()

const { accept } = useAcceptReservation()

const acceptReservation = () => {
  accept(String(props.reservationId))
}
</script>

<template>
  <ActionButton @click="acceptReservation" title="Принять" />
</template>
