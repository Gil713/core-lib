<script setup lang="ts">
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn('flex w-full flex-1 flex-col gap-6 p-4 lg:p-6', props.class)">
    <slot />
  </div>
</template>
