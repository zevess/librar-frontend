<script setup lang="ts">
import { type IHeaderNavItem } from '@/widgets/header'
import { Drawer } from 'primevue'
import { ref } from 'vue'
import { NavigationItem } from '../navigation-item'

defineProps<{
  items: IHeaderNavItem[]
}>()

const visible = ref(false)
</script>

<template>
  <div class="card flex justify-center">
    <Drawer v-model:visible="visible" header="Меню">
      <div class="grid grid-cols-2 gap-2">
        <RouterLink v-for="item in items" :to="item.url">
          <NavigationItem :icon="item.icon" :title="item.title" />
        </RouterLink>
      </div>
    </Drawer>
    <NavigationItem @click="visible = true" title="меню" icon="bars" />
  </div>
</template>
