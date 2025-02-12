<script setup lang="ts">
import type { HTMLAttributes, InputTypeHTMLAttribute } from "vue";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  type?: InputTypeHTMLAttribute;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const validateInput = (e: Event) => {
  if (props.type === "tel") {
    const input = e.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9+]/g, "");

    // Update the model value with the sanitized input
    emits("update:modelValue", input.value);
  }
};
</script>

<template>
  <input
    v-model="modelValue"
    :type="type"
    :class="
      cn(
        'file:bg-transparent flex h-10 w-full rounded-lg border border-input-border bg-input-bg px-3 py-2 text-sm font-normal ring-offset-input-focus-border file:border-0 file:text-sm file:font-medium placeholder:text-text-placeholder focus-visible:bg-input-focus-bg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-input-focus-border disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
    @input="validateInput"
  />
</template>
