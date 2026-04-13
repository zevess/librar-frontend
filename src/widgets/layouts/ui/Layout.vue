<script setup lang="ts">
import { PUBLIC_URL } from '@/shared/config/url.config'
import { CatalogButton } from '@/shared/ui/catalog-button'
import { Container } from '@/shared/ui/container'
import { IconButton } from '@/shared/ui/icon-button'
import { Logo } from '@/shared/ui/logo'
import { Input } from '@/shared/ui/input'
import { Footer, useFooterNavigation } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { useHeaderNavigation } from '@/widgets/header/model/useNavigation'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/entities/user'
import { ref } from 'vue'
import { SearchInput } from '@/features/search-input'
import { NotificationDrawer } from '@/features/notification-drawer'

const { isAuthentificated } = useUserStore()
const headerItems = useHeaderNavigation(isAuthentificated)
const footerItems = useFooterNavigation()
</script>

<template>
  <div class="mx-auto max-w-360 flex flex-col min-h-screen">
    <Header variant="default" :items="headerItems">
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <CatalogButton />
      <!-- <RouterLink class="hidden md:block" :to="PUBLIC_URL.catalog()">
        <CatalogButton />
      </RouterLink> -->
      <div class="hidden md:flex md:w-4/12">
        <SearchInput />
      </div>
    </Header>
    <div class="w-full flex md:hidden p-2 bg-white rounded-xl shadow-lg mt-6">
      <SearchInput />
    </div>
    <Container>
      <slot></slot>
    </Container>
    <Footer :items="footerItems" class="flex md:hidden mt-auto" />
  </div>
</template>
