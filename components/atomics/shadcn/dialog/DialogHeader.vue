<script setup lang="ts">
import type { HTMLAttributes } from "vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="
      cn(
        'flex h-[60px] flex-col items-start justify-center gap-y-1.5 border-b border-border-primary bg-background-popup-header px-6 py-3 text-center sm:text-left lg:items-center',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
