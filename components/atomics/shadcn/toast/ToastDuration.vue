<script setup lang="ts">
import { ToastClose, type ToastCloseProps } from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

const props = defineProps<
  ToastCloseProps & {
    class?: HTMLAttributes["class"];
    duration: number;
    isPaused: boolean;
  }
>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <ToastClose
    v-bind="delegatedProps"
    :class="
      cn(
        'absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2',
        props.class,
      )
    "
  >
    <CountDownCircle :duration="duration" :is-paused="isPaused" />
  </ToastClose>
</template>

<style></style>
