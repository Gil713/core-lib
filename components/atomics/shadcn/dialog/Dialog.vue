<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from "radix-vue";
import { DIALOG_CONTROLLER_INJECTION_KEY } from "./injectionKeys";

type IProps = {
  controller: IUseDialog;
  type: DialogTypeEnum;
};

const props = defineProps<DialogRootProps & IProps>();
const emits = defineEmits<DialogRootEmits>();

provide(DIALOG_CONTROLLER_INJECTION_KEY, props.controller);

const forwarded = useForwardPropsEmits(props, emits);

const handleUpdateOpen = (state: boolean) => {
  if (state) {
    props.controller.openDialog();
  } else props.controller.closeDialog();
};

const handlePopState = () => {
  // Close opening popup when user click back button in browser
  if (props.controller.isOpen.value) {
    props.controller.closeDialog();
  }
};

onUnmounted(() => {
  window.removeEventListener("popstate", handlePopState);
});

onMounted(() => {
  props.controller.openCallback(props.controller, props.type);
  window.addEventListener("popstate", handlePopState);
});
</script>

<template>
  <DialogRoot v-bind="forwarded" :open="controller.isOpen.value" @update:open="handleUpdateOpen">
    <slot />
  </DialogRoot>
</template>
