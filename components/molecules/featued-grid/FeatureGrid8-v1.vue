<script setup lang="ts" generic="T extends object">
defineProps<{ items: T[] }>();
</script>

<!-- 8 items in total. 6 columns: 4 big, 2 small (2 top, 2 bottom) -->
<template>
  <div class="grid grid-rows-2 gap-2 lg:gap-4" style="grid-template-columns: repeat(4, 1fr) repeat(2, 13.5%)">
    <div v-for="(item, index) in items.slice(0, 8)" :key="index" :class="['h-full', { 'row-span-2': index < 4 }]">
      <slot :name="`item`" :item="item" :index="index" />
    </div>
  </div>
</template>
