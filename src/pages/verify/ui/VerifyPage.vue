<script setup lang="ts">
import { useVerify } from '@/entities/auth'
import { PageTitle } from '@/shared/ui/page-title'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { verify } = useVerify()
onMounted(() => {
  const params = {
    id: String(route.query.id),
    hash: String(route.query.hash),
    signature: String(route.query.signature),
    expires: String(route.query.expires),
  }
  verify(params)
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <PageTitle title="Подтверждение почты"></PageTitle>
  </div>
</template>
