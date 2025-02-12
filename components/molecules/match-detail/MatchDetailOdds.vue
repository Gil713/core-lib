<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  odds: number | string;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "span",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(`w-full px-2 py-1 ${Number(odds) <= 0 ? 'text-negative-400' : 'text-positive-500'}`, props.class)"
  >
    {{ Number(odds) !== 0 ? formatFixNumber(odds, 2) : "--" }}
  </Primitive>
</template>
