<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { gameTagVariants } from ".";
import { LazySvgoFlash, LazySvgoGear, LazySvgoHot } from "#components";

type IProps = PrimitiveProps & {
  tag: IGameTag;
  class?: HTMLAttributes["class"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "div",
});

const iconMap = {
  [GameTagEnum.HOT]: { icon: LazySvgoHot, label: "hot" },
  [GameTagEnum.NEW]: { icon: LazySvgoFlash, label: "new" },
  [GameTagEnum.MAINTAIN]: { icon: LazySvgoGear, label: "bảo trì" },
};

const currentTag = props.tag.name && iconMap[props.tag.name];
</script>

<template>
  <Primitive
    v-if="currentTag"
    :as="as"
    :as-child="asChild"
    :class="cn(gameTagVariants({ variant: tag.name }), props.class)"
    class="flex items-center py-0.5 pl-0.5 sm:pl-1 sm:pr-2"
  >
    <component :is="currentTag.icon" class="text-sm sm:text-base" />
    <span class="text-2xs font-semibold uppercase sm:text-sm">{{ currentTag.label }}</span>
  </Primitive>
</template>
