<script setup lang="ts">
import { Container } from '@/shared/ui/container'
import { Logo } from '@/shared/ui/logo'
import { Header } from '@/widgets/header'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="max-w-360 mx-auto">
    <Header>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
    </Header>
    <div class="max-w-160 mx-auto">
      <Container>
        <slot></slot>
      </Container>
    </div>
  </div>
</template>
