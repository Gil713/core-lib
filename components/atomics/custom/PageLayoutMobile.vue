<script setup lang="ts">
import type { HTMLAttributes } from "vue";

type IPageLayout = {
  class?: HTMLAttributes["class"];
  headerClass?: HTMLAttributes["class"];
  mainClass?: HTMLAttributes["class"];
  bottomClass?: HTMLAttributes["class"];
};

const props = defineProps<IPageLayout>();
</script>

<template>
  <div
    :class="
      cn(
        'relative grid h-full grid-flow-row grid-cols-1 grid-rows-[auto_1fr_auto] gap-0 bg-background-menu-account',
        props.class,
      )
    "
  >
    <div :class="cn('sticky top-0 z-20', props.headerClass)">
      <slot name="header" />
    </div>
    <div :class="cn('relative h-full w-full overflow-y-auto', props.mainClass)">
      <slot name="main" />
    </div>
    <div :class="cn('sticky bottom-0 z-20', props.bottomClass)">
      <slot name="bottom" />
    </div>
  </div>
</template>
