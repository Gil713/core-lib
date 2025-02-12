<script setup lang="ts">
defineProps({
  quantity: {
    type: Number,
    default: 11,
  },
});
</script>
<template>
  <div class="relative h-8 w-8">
    <div class="absolute left-0 top-0 z-20 w-fit">
      <div class="flex h-5 w-5 items-center justify-center rounded-full bg-red-noti text-noti">
        {{ quantity }}
      </div>
    </div>
    <SvgoBell class="absolute left-0 top-0 z-10 text-5xl" />
  </div>
</template>
