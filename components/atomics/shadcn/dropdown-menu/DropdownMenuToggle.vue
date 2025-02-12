<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  isShowArrow?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  isShowArrow: true,
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="
      cn(
        'flex min-h-8 min-w-40 items-center justify-between rounded-lg bg-neutral-700 pl-2 pr-1 font-nunito text-sm font-medium text-white lg:min-h-10',
        props.class,
      )
    "
  >
    <slot />
    <SvgoArrow
      v-if="isShowArrow"
      class="mx-1.5 rotate-90 text-xl text-neutral-400 transition group-data-[state=open]:-rotate-90"
    />
  </Primitive>
</template>
