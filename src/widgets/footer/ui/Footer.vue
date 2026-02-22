<script setup lang="ts">
import { useFooterNavigation } from '../model/useNavigation'
import FooterItem from './FooterItem.vue'

const items = useFooterNavigation()
</script>

<template>
  <footer class="flex justify-between bg-white rounded-xl shadow-lg pt-1 bottom-2 sticky">
    <ul class="w-full flex justify-around items-center gap-4">
      <RouterLink v-for="item in items" :to="item.url">
        <FooterItem :icon="item.icon" :title="item.title"></FooterItem>
      </RouterLink>
    </ul>
  </footer>
</template>
