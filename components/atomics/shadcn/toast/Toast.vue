<script setup lang="ts">
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from "radix-vue";
import { computed } from "vue";
import { type IToastProps, toastVariants } from ".";

const props = defineProps<IToastProps>();

const emits = defineEmits<ToastRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const isPaused = ref(false);

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="onOpenChange"
    @pause="isPaused = true"
    @resume="isPaused = false"
  >
    <slot :is-paused="isPaused" />
  </ToastRoot>
</template>
