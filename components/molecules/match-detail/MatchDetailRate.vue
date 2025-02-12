<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import type { IButtonVariants } from "~/components/atomics/shadcn/button";

type IRate = {
  homeOdds: number | string;
  rate: number | string;
  awayOdds: number | string;
};

type IProps = PrimitiveProps & {
  class?: HTMLAttributes["class"];
  buttonClass?: HTMLAttributes["class"];
  buttonVariant?: IButtonVariants["variant"];
  buttonText: string;
  handicap: IRate;
  over: IRate;
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
  buttonVariant: "default",
});
const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click");
};
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('grid grid-cols-[1fr_auto_1fr] gap-1 px-3', props.class)">
    <MatchDetailPoint :home-odds="handicap.homeOdds" :rate="handicap.rate" :away-odds="handicap.awayOdds" />
    <Button
      :class="cn('justify-self-center px-3 py-1.5', props.buttonClass)"
      :variant="buttonVariant"
      :disabled="!handicap.homeOdds && !handicap.rate && !handicap.awayOdds"
      @click="handleClick"
    >
      {{ buttonText }}
    </Button>
    <MatchDetailPoint :home-odds="over.homeOdds" :rate="over.rate" :away-odds="over.awayOdds" />
  </Primitive>
</template>
