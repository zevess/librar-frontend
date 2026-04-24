<script setup lang="ts">
import { Container } from '@/shared/ui/container'
import { Logo } from '@/shared/ui/logo'
import { MenuDrawer } from '@/shared/ui/menu-drawer'
import { PageSubtitle } from '@/shared/ui/page-subtitle'
import { Footer, useFooterNavigation } from '@/widgets/footer'
import { Header, useAdminHeaderNavigation } from '@/widgets/header'
import { RouterLink } from 'vue-router'

const headerItems = useAdminHeaderNavigation()
const footerItems = useFooterNavigation()
</script>

<template>
  <div class="mx-auto max-w-360 flex flex-col min-h-screen">
    <Header :items="headerItems" variant="admin">
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
    <Footer :items="footerItems" class="flex md:hidden mt-auto">
      <MenuDrawer :items="headerItems" />
    </Footer>
  </div>
</template>
