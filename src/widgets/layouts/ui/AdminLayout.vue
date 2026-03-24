<script setup lang="ts">
import { Container } from '@/shared/ui/container'
import { Logo } from '@/shared/ui/logo'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { Footer, useFooterNavigation } from '@/widgets/footer'
import { Header, useAdminHeaderNavigation } from '@/widgets/header'
import { RouterLink } from 'vue-router'

const items = useAdminHeaderNavigation()
const footerItems = useFooterNavigation()
</script>

<template>
  <div class="mx-auto max-w-360">
    <Header variant="admin" :items="[...items, ...footerItems]">
      <div class="flex items-center gap-2 min-w-fit">
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
