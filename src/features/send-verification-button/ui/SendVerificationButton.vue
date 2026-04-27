<script setup lang="ts">
import { useSendVerification } from '@/entities/auth'
import { ActionButton } from '@/shared/ui/action-button'

const { sendVerificationLink, isPending } = useSendVerification()
</script>

<template>
  <ActionButton @click="sendVerificationLink" :disabled="isPending" title="Подтвердить" />
</template>
