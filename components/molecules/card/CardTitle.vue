<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "h3",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('text-placeholder font-nunito text-sm font-normal md:text-base md:text-neutral-200', props.class)"
  >
    <slot />
  </Primitive>
</template>
