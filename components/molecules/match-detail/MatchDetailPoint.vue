<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  homeOdds: number | string;
  rate: number | string;
  awayOdds: number | string;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('flex items-center px-1 text-center', props.class)">
    <MatchDetailOdds :odds="homeOdds" />
    <span class="w-full px-2 py-1 text-neutral-200">{{ Number(rate) !== 0 ? formatFixNumber(rate, 2) : "--" }}</span>
    <MatchDetailOdds :odds="awayOdds" />
  </Primitive>
</template>
