<script lang="ts" setup>
import { Slot } from "radix-vue";
import { useFormField } from "./useFormField";

defineProps<{ disableErrorStyles?: boolean }>();
const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
</script>

<template>
  <Slot
    :id="formItemId"
    :aria-describedby="!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`"
    :aria-invalid="!!error"
    :class="!disableErrorStyles && error && 'border-border-error focus-visible:ring-red-noti'"
  >
    <slot />
  </Slot>
</template>
