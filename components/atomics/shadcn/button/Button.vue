<script setup lang="ts">
import type { ButtonHTMLAttributes, HTMLAttributes } from "vue";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { type IButtonVariants, buttonVariants } from ".";

type IProps = PrimitiveProps & {
  variant?: IButtonVariants["variant"];
  size?: IButtonVariants["size"];
  isLoading?: boolean;
  class?: HTMLAttributes["class"];
  disableHoverEffect?: boolean;
  type?: ButtonHTMLAttributes["type"];
};

const props = withDefaults(defineProps<IProps>(), {
  as: "button",
  isLoading: false,
  disableHoverEffect: false,
  type: "button",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :type="type"
    :class="cn(buttonVariants({ variant, size, hovered: disableHoverEffect ? 'none' : variant }), props.class)"
  >
    <slot />
    <LoadingSpinner v-if="isLoading" class="w-5" />
  </Primitive>
</template>
