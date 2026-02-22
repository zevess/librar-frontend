<script setup>
import { ref } from 'vue'

defineProps({
  images: Array,
})

const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
  },
])
</script>
<template>
  <div class="card">
    <Galleria
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="5"
      containerStyle="max-width: 640px"
    >
      <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
      </template>
    </Galleria>
  </div>
</template>
