<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogPortal,
  useForwardPropsEmits,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

type IProps = DialogContentProps & {
  class?: HTMLAttributes["class"];
  closeClass?: HTMLAttributes["class"];
  isShowClose?: boolean; // if false, close modal by useDialog controller
  animation?: string;
  id?: string;
};

const props = withDefaults(defineProps<IProps>(), {
  id: "dialog-content",
  isShowClose: true,
  animation:
    "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
});

const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogContent
      v-bind="forwarded"
      :id="id"
      :class="
        cn(
          'fixed z-modal grid w-full max-w-lg grid-rows-[auto_minmax(0,1fr)_auto] gap-4 overflow-hidden rounded-lg border border-none bg-background-popup-body shadow-lg sm:rounded-lg',
          props.animation,
          props.class,
        )
      "
    >
      <slot />

      <DialogClose
        v-if="isShowClose"
        :class="
          cn(
            'ring-offset-background absolute right-6 top-0 h-[60px] rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
            props.closeClass,
          )
        "
      >
        <div class="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 p-1">
          <SvgoClose class="text-sm text-white" />
        </div>
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
