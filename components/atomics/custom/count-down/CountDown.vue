<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { useCountdown } from "./useCountdown";

type IProps = PrimitiveProps & {
  endDate?: Date;
  class?: HTMLAttributes["class"];
  fnOnEnd?: () => void;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});

const emit = defineEmits(["countdown-end"]);

const { remaining, startCountdown, stopCountdown, updateEndTime } = useCountdown(props.endDate || new Date(), {
  onEnd: () => {
    emit("countdown-end");
    props.fnOnEnd?.();
  },
});

watch(
  () => props.endDate,
  (newVal: Date | undefined) => {
    updateEndTime(newVal || new Date());
  },
);
</script>
<template>
  <Primitive :as="as" :class="cn('relative flex items-center gap-3', props.class)">
    <slot v-bind="{ remaining, startCountdown, stopCountdown, updateEndTime }" />
  </Primitive>
</template>
