<script setup lang="ts">
import type { HTMLAttributes } from "vue";

const props = defineProps<{ class?: HTMLAttributes["class"] }>();
</script>

<template>
  <div :class="cn('flex h-12 flex-row items-center justify-between bg-background-popup-body pl-1 pr-3', props.class)">
    <slot />
  </div>
</template>
