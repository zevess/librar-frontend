<script setup lang="ts">
import { useCancelExpired } from '@/entities/reservation'
import { ActionButton } from '../action-button'

const { cancelExpired, isPending } = useCancelExpired()
</script>

<template>
  <ActionButton :disabled="isPending" @click="cancelExpired" title="Отменить просроченные" />
</template>
