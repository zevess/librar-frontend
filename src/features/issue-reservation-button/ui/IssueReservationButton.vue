<script setup lang="ts">
import { useIssueReservation } from '@/entities/reservation'
import { ActionButton } from '@/shared/ui/action-button'

const props = defineProps<{
  reservationId: number
}>()

const { issue, isIssuing } = useIssueReservation()

const issueReservation = () => {
  issue(String(props.reservationId))
}
</script>

<template>
  <ActionButton :disabled="isIssuing" @click="issueReservation" title="Выдать" />
</template>
