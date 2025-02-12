<script setup lang="ts">
import { ToastDescription, type ToastDescriptionProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";
import type { IToastVariants } from ".";
import { LazySvgoCircleCheck, LazySvgoCircleExclamation, LazySvgoTriangleExclamation } from "#components";

const props = defineProps<
  ToastDescriptionProps & { class?: HTMLAttributes["class"]; variant?: IToastVariants["variant"] }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
const icon = computed(() => {
  if (!props.variant) return;

  const iconMap: Record<NonNullable<IToastVariants["variant"]>, unknown> = {
    success: LazySvgoCircleCheck,
    warning: LazySvgoCircleExclamation,
    destructive: LazySvgoTriangleExclamation,
  };

  return iconMap[props.variant];
});
</script>

<template>
  <ToastDescription :class="cn('text-sm opacity-90', props.class)" v-bind="delegatedProps">
    <div class="flex items-center gap-2">
      <component :is="icon" v-if="icon" class="flex-shrink-0 text-xl" />
      <slot />
    </div>
  </ToastDescription>
</template>
