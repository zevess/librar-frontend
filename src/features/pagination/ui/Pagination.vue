<script setup lang="ts">
import type { IPaginationLinks, IPaginationMeta } from '@/shared/api'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  meta: IPaginationMeta
  links: IPaginationLinks
}>()

const route = useRoute()
const router = useRouter()

const currentPage = computed(() => {
  return props.meta.current_page
})

const lastPage = computed(() => {
  return props.meta.last_page
})

const changePage = (page: number) => {
  router.push({
    query: {
      ...route.query,
      page: page,
    },
  })
}

const toFirstPage = () => changePage(1)
const toLastPage = () => changePage(lastPage.value)
const previousPage = () => changePage(currentPage.value - 1)
const nextPage = () => changePage(currentPage.value + 1)
</script>

<template>
  <div class="w-full flex gap-2 items-center justify-center">
    <button
      @click="toFirstPage"
      :disabled="currentPage === 1"
      class="pagination-button disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-gray-400"
    >
      <span class="pi pi-angle-double-left"></span>
    </button>
    <button
      @click="previousPage"
      :disabled="currentPage === 1"
      class="pagination-button disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-gray-400"
    >
      <span class="pi pi-angle-left"></span>
    </button>
    <button
      v-for="(link, index) in meta.links.slice(1, meta.links.length - 1)"
      :key="index"
      style="font-size: larger"
      :disabled="link.active"
      @click="changePage(link.page)"
      :class="['pagination-button', link.active && 'bg-[#bededc]']"
    >
      {{ link.label }}
    </button>
    <button
      @click="nextPage"
      :disabled="currentPage === lastPage"
      class="pagination-button disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-gray-400"
      ,
    >
      <span class="pi pi-angle-right"></span>
    </button>
    <button
      @click="toLastPage"
      :disabled="currentPage === lastPage"
      class="pagination-button disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-gray-400"
    >
      <span class="pi pi-angle-double-right"></span>
    </button>
  </div>
</template>
