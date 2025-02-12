import { computed, ref } from "vue";
import type { IToastProps } from "~/components/atomics/shadcn/toast";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 10000000; // delay time to remove toasts, not the duration
export const TOAST_DURATION = 5000; // ms

export type IStringOrVNode = string | VNode | (() => VNode);

export type IToasterToast = IToastProps & {
  id: string;
  title?: string;
  description?: IStringOrVNode;
  action?: Component;
};
let count = 0;

const genId = () => {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
};

type IState = {
  toasts: IToasterToast[];
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    if (toastId === undefined) state.value.toasts = [];
    else state.value.toasts = state.value.toasts.filter((t) => t.id !== toastId);
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

const state = ref<IState>({
  toasts: [],
});

type IToast = Omit<IToasterToast, "id">;

export const useToast = () => {
  const createToast = (toast: IToast) => {
    if (!toast.variant) toast.variant = "success";
    const id = genId();
    state.value.toasts = [
      {
        ...toast,
        id,
        open: true,
        onOpenChange: (open: boolean) => {
          if (!open) dismiss(id);
        },
      },
      ...state.value.toasts,
    ].slice(0, TOAST_LIMIT);
  };

  const updateToast = (toast: IToasterToast) => {
    state.value.toasts = state.value.toasts.map((t) => (t.id === toast.id ? { ...t, ...toast } : t));
  };

  const dismiss = (toastId?: string) => {
    const toast = state.value.toasts.find((t) => t.id === toastId);

    if (toast) {
      addToRemoveQueue(toast.id);
    } else {
      state.value.toasts.forEach((toast) => {
        addToRemoveQueue(toast.id);
      });
    }

    state.value.toasts = state.value.toasts.map((t) =>
      t.id === toastId || toastId === undefined
        ? {
            ...t,
            open: false,
          }
        : t,
    );
  };

  return {
    toasts: computed(() => state.value.toasts),
    dismiss,
    createToast,
    updateToast,
  };
};
