<script setup lang="ts">
import { CatalogButton } from '@/shared/ui/catalog-button'
import { Container } from '@/shared/ui/container'
import { Logo } from '@/shared/ui/logo'
import { Footer, useFooterNavigation } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { useHeaderNavigation } from '@/widgets/header/model/useNavigation'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/entities/user'
import { SearchAutocomplete } from '@/features/search-autocomplete'

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
      <CatalogButton class="hidden md:flex" />
      <div class="hidden md:flex md:w-4/12">
        <SearchAutocomplete />
      </div>
    </Header>
    <div class="w-full flex md:hidden p-2 bg-white rounded-xl shadow-lg mt-6">
      <SearchAutocomplete />
    </div>
    <Container>
      <slot></slot>
    </Container>
    <Footer :items="footerItems" class="flex md:hidden mt-auto" />
  </div>
</template>
