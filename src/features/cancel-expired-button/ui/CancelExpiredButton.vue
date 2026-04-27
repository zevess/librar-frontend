<script setup lang="ts">
import { useCancelExpired } from '@/entities/reservation'
import { ActionButton } from '@/shared/ui/action-button'

const { cancelExpired, isCancelingExpired } = useCancelExpired()
</script>

<template>
  <ActionButton
    :disabled="isCancelingExpired"
    @click="cancelExpired"
    title="Отменить просроченные"
  />
</template>
