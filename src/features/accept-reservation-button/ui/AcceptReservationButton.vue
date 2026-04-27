<script setup lang="ts">
import { useAcceptReservation } from '@/entities/reservation'
import { ActionButton } from '@/shared/ui/action-button'

const props = defineProps<{
  reservationId: number
}>()

const { accept, isAccepting } = useAcceptReservation()

const acceptReservation = () => {
  accept(String(props.reservationId))
}
</script>

<template>
  <ActionButton :disabled="isAccepting" @click="acceptReservation" title="Принять" />
</template>
