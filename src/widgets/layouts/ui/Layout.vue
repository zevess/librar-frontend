<script setup lang="ts">
import { PUBLIC_URL } from '@/shared/config/url.config'
import { CatalogButton } from '@/shared/ui/catalog-button'
import { Container } from '@/shared/ui/container'
import { IconButton } from '@/shared/ui/icon-button'
import { Logo } from '@/shared/ui/logo'
import { Input } from '@/shared/ui/input'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { useHeaderNavigation } from '@/widgets/header/model/useNavigation'
import { RouterLink } from 'vue-router'
const items = useHeaderNavigation()
</script>

<template>
  <div class="mx-auto max-w-360">
    <Header :items="items">
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <RouterLink class="hidden md:block" :to="PUBLIC_URL.catalog()">
        <CatalogButton />
      </RouterLink>
      <div class="hidden md:flex md:w-4/12">
        <Input placeholder="найти..." class="w-full rounded-r-none" />
        <IconButton icon="search" class="rounded-l-none" />
      </div>
    </Header>
    <div class="w-full flex md:hidden p-2 bg-white rounded-xl shadow-lg mt-6">
      <Input placeholder="найти..." class="w-full rounded-r-none" />
      <IconButton icon="search" class="rounded-l-none" />
    </div>
    <Container>
      <slot></slot>
    </Container>
    <Footer class="flex md:hidden" />
  </div>
</template>
