<script setup lang="ts">
import { Container } from '@/shared/ui/container'
import { Logo } from '@/shared/ui/logo'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { SearchInput } from '@/shared/ui/input'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { useAdminHeaderNavigation } from '@/widgets/header/model/useAdminNavigation'
import { RouterLink } from 'vue-router'
const items = useAdminHeaderNavigation()
</script>

<template>
  <div class="mx-auto max-w-360">
    <Header :items="items">
      <div class="flex items-center gap-2">
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <PageSubtitle title="админ" />
      </div>
    </Header>
    <Container>
      <slot></slot>
    </Container>
    <Footer class="flex md:hidden" />
  </div>
</template>
