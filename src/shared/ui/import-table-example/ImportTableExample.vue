<script setup lang="ts">
defineProps<{
  variant?: 'books' | 'authors' | 'publishers'
}>()
const booksTable = ['название', 'автор', 'издательство', 'категория', 'описание']
const authorsTable = ['имя_автора', 'описание_автора']
const publishersTable = ['название_издательства', 'описание_издательства']
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border-collapse border border-gray-400">
      <thead>
        <tr class="bg-gray-100">
          <th
            v-if="variant == 'books'"
            class="border border-gray-300 px-4 py-2 text-left whitespace-nowrap"
            v-for="column in booksTable"
            :key="column"
          >
            {{ column }}
          </th>
          <th
            v-if="variant == 'authors'"
            class="border border-gray-300 px-4 py-2 text-left whitespace-nowrap"
            v-for="column in authorsTable"
            :key="column"
          >
            {{ column }}
          </th>
          <th
            v-if="variant == 'publishers'"
            class="border border-gray-300 px-4 py-2 text-left whitespace-nowrap"
            v-for="column in publishersTable"
            :key="column"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>
