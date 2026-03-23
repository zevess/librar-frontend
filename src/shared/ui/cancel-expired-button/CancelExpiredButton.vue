<script setup lang="ts">
import { useCancelExpired } from '@/entities/reservation'
import { ActionButton } from '../action-button'

const { cancelExpired } = useCancelExpired()
</script>

<template>
  <ActionButton @click="cancelExpired" title="Отменить просроченные" />
</template>
