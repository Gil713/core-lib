<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('flex items-center gap-2 text-sm text-neutral-200', props.class)">
    <SvgoClock class="text-neutral-200" />
    <slot />
  </Primitive>
</template>
