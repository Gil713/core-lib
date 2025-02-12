<script setup lang="ts" generic="T extends object">
defineProps<{ items: T[] }>();
</script>

<!-- 8 items in total. 6 columns: 4 big, 2 small (2 top, 2 bottom) -->
<template>
  <div class="grid grid-cols-3 grid-rows-3 gap-2 overflow-scroll sm:gap-3 lg:gap-4">
    <div v-for="(item, index) in items.slice(0, 8)" :key="index" :class="[index === 0 ? 'col-span-2' : 'aspect-[1/1]']">
      <slot :name="`item`" :item="item" :index="index" />
    </div>
  </div>
</template>
