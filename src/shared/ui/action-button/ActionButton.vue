<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    disabled?: boolean
    variant?: 'default' | 'outline' | 'red' | 'blue' | 'orange'
  }>(),
  {
    variant: 'default',
  },
)

const styles: Record<'default' | 'outline' | 'red' | 'blue' | 'orange', string> = {
  default:
    'rounded-md transition bg-[#d1ebe9] hover:bg-[#bededc] p-2 text-center text-sm md:text-base font-semibold cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed',
  outline:
    'rounded-md transition border-2 bg-[#eef5f5] border-[#d1ebe9] hover:bg-[#d1ebe9] p-2 text-center text-sm md:text-base font-semibold cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed',
  red: 'rounded-md transition bg-[#fee2e2] hover:bg-[#ffcccc] p-2 text-[#b91c1c] text-center text-sm md:text-base font-semibold cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed',
  blue: 'rounded-md transition bg-[#9eedff] hover:bg-[#52dfff] p-2 text-center text-sm md:text-base font-semibold cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed',
  orange:
    'rounded-md transition bg-[#ffe29e] hover:bg-[#ffd779] p-2 text-center text-sm md:text-base font-semibold cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed',
}
</script>

<template>
  <button :disabled="disabled" :class="styles[variant]">
    <slot></slot>
    {{ title }}
  </button>
</template>
