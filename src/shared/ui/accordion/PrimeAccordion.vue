<script setup lang="ts">
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primevue'
defineProps<{
  header: string
  value: number
}>()
</script>

<template>
  <!-- <Accordion> -->
  <AccordionPanel :value="value">
    <AccordionHeader>{{ header }}</AccordionHeader>
    <AccordionContent>
      <slot></slot>
    </AccordionContent>
  </AccordionPanel>
  <!-- </Accordion> -->
</template>
