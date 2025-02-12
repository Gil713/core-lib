import type { ToastRootProps } from "radix-vue";
import type { HTMLAttributes } from "vue";

import { cva, type VariantProps } from "class-variance-authority";

export { default as Toast } from "./Toast.vue";
export { default as ToastAction } from "./ToastAction.vue";
export { default as ToastClose } from "./ToastClose.vue";
export { default as ToastDescription } from "./ToastDescription.vue";
export { default as Toaster } from "./Toaster.vue";
export { default as ToastProvider } from "./ToastProvider.vue";
export { default as ToastTitle } from "./ToastTitle.vue";
export { default as ToastViewport } from "./ToastViewport.vue";
export { default as ToastDuration } from "./ToastDuration.vue";

export const toastVariants = cva(
  "bg-black/80 group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md px-3 py-2.5 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[--radix-toast-swipe-end-x] data-[swipe=move]:translate-x-[--radix-toast-swipe-move-x] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        success: "test text-white text-[#1CB968] [&_.countdown]:stroke-[#1CB968]",
        warning: "text-warning [&_.countdown]:stroke-secondary-400",
        destructive: "destructive group text-negative-500 [&_.countdown]:stroke-negative-500",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  },
);

export type IToastVariants = VariantProps<typeof toastVariants>;

export type IToastProps = {
  class?: HTMLAttributes["class"];
  variant?: IToastVariants["variant"];
  onOpenChange?: ((value: boolean) => void) | undefined;
} & ToastRootProps;
