<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogPortal,
  DialogOverlay,
  useForwardPropsEmits,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";
const props = withDefaults(
  defineProps<
    DialogContentProps & {
      class?: HTMLAttributes["class"];
      closeClass?: HTMLAttributes["class"];
      type?: "modal" | "hybrid";
    }
  >(),
  {
    type: "modal",
  },
);

const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const { isMobileOrTablet } = useDevice();
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-modal bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />

    <DialogContent
      v-bind="forwarded"
      :class="
        cn(
          'fixed left-1/2 top-1/2 z-modal flex max-h-[90dvh] w-full max-w-[calc(100vw-32px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden border border-none bg-[#292D30] shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:max-w-[450px]',
          props.type === 'hybrid' && isMobileOrTablet ? 'min-h-dvh min-w-full rounded-none' : 'rounded-xl',
          props.class,
        )
      "
    >
      <slot />

      <DialogClose
        :class="
          cn(
            'ring-offset-background absolute right-6 top-0 h-[60px] rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
            props.closeClass,
          )
        "
      >
        <div class="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-400 p-1">
          <SvgoClose class="text-xs text-neutral-700" />
        </div>
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
