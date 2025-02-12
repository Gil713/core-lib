<script lang="ts" setup>
import type { HTMLAttributes } from "vue";

type IDividerProps = {
  class?: HTMLAttributes["class"];
};

const props = defineProps<IDividerProps>();
</script>

<template>
  <div :class="cn('my-4 w-full border-t border-dashed border-[#FFFFFF29]', props.class)"></div>
</template>
