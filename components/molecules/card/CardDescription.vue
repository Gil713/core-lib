<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "p",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('font-nunito text-sm font-normal text-neutral-200 md:text-base', props.class)"
  >
    <slot />
  </Primitive>
</template>
